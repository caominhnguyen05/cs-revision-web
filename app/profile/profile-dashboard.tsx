"use client";

import { useState } from "react";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import ProfileSidebar from "./profile-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { getPastPaperLists } from "@/lib/actions/paper-actions";
import CompletedPastPapersTab from "./completed-papers-tab";
import TodoPastPapersTab from "./todo-papers-tab";

type Session = typeof auth.$Infer.Session;
type UserData = Session["user"];

type PaperLists = {
  todo: string[];
  completed: string[];
};

export default function DashboardClientPage({
  session,
  initialPaperLists,
}: {
  session: Session;
  initialPaperLists: PaperLists;
}) {
  const [activeTab, setActiveTab] = useState("profile");
  const [paperLists, setPaperLists] = useState(initialPaperLists);
  const user = session.user;

  const refreshLists = async () => {
    const lists = await getPastPaperLists();
    setPaperLists(lists);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab user={user} />;
      case "todo":
        return (
          <TodoPastPapersTab
            papers={paperLists.todo}
            refreshLists={refreshLists}
          />
        );
      case "completed":
        return (
          <CompletedPastPapersTab
            papers={paperLists.completed}
            refreshLists={refreshLists}
          />
        );
      default:
        return <ProfileTab user={user} />;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case "profile":
        return "My Profile";
      case "todo":
        return "Todo Past Papers";
      case "completed":
        return "Completed Papers";
      default:
        return "My Profile";
    }
  };

  return (
    <SidebarProvider>
      <ProfileSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-5"
          />
          <div className="flex items-center gap-2">
            <span className="font-semibold">{getPageTitle()}</span>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
          {renderContent()}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

function ProfileTab({ user }: { user: UserData }) {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information and account settings.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your profile information and email preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.image || undefined} alt={user.name} />
              <AvatarFallback className="text-xl">
                {user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-1.5">
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={user.name || ""} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue={user.email}
                disabled
                className="bg-muted"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button className="cursor-pointer">Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

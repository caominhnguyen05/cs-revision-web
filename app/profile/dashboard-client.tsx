// app/dashboard/page.tsx (or wherever this component lives)
"use client";

import { useState } from "react";
import { signOut } from "@/lib/actions/auth-actions";
import { auth } from "@/lib/auth"; // You'll get session from a server component parent
import { useRouter } from "next/navigation";
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
import {
  User,
  ListTodo,
  CheckSquare,
  LogOut,
  BookOpenCheck,
} from "lucide-react";

// Define the Session type based on your auth library
type Session = typeof auth.$Infer.Session;
type UserData = Session["user"];

// Main Dashboard Component
export default function DashboardClientPage({ session }: { session: Session }) {
  const [activeTab, setActiveTab] = useState("profile");
  const user = session.user;

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab user={user} />;
      case "todo":
        return <TodoPastPapersTab />;
      case "completed":
        return <CompletedPastPapersTab />;
      default:
        return <ProfileTab user={user} />;
    }
  };

  return (
    <div className="flex w-full bg-muted/40">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex flex-col flex-1 ml-64">
        <main className="flex-1 p-4 sm:p-6 md:p-8">{renderContent()}</main>
      </div>
    </div>
  );
}

function Sidebar({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/auth");
  };

  const navItems = [
    { id: "profile", label: "My Profile", icon: User },
    { id: "todo", label: "Todo Past Papers", icon: ListTodo },
    { id: "completed", label: "Completed Papers", icon: CheckSquare },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 flex flex-col border-r bg-background">
      {/* Header */}
      <div className="flex h-16 items-center border-b px-6">
        <BookOpenCheck className="h-6 w-6 mr-2" />
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>

      {/* Main nav fills space */}
      <div className="flex flex-1 flex-col p-4 overflow-y-auto">
        <div className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className="justify-start gap-2"
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </div>

        {/* Sign out button stays docked */}
        <div className="mt-auto">
          <Button
            variant="ghost"
            className="justify-start gap-2 w-full"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </aside>
  );
}

// Content for "My Profile" Tab
function ProfileTab({ user }: { user: UserData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
        <CardDescription>
          Manage your personal information and account settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.image || undefined} alt={user.name} />
            <AvatarFallback>
              {user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-1.5">
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue={user.name || ""} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={user.email} disabled />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}

// Placeholder for "Todo Past Papers" Tab
function TodoPastPapersTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Todo Past Papers</CardTitle>
        <CardDescription>
          Here are the past papers you've scheduled to complete.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">This feature is coming soon!</p>
      </CardContent>
    </Card>
  );
}

// Placeholder for "Completed Past Papers" Tab
function CompletedPastPapersTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Completed Past Papers</CardTitle>
        <CardDescription>
          A history of all the past papers you have finished.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">This feature is coming soon!</p>
      </CardContent>
    </Card>
  );
}

"use client";

import { useState } from "react";
import { signOut } from "@/lib/actions/auth-actions";
import { auth } from "@/lib/auth";
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
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  ListTodo,
  CheckSquare,
  LogOut,
  BookOpenCheck,
  Settings,
  ChevronsUpDown,
} from "lucide-react";

type Session = typeof auth.$Infer.Session;
type UserData = Session["user"];

const navigationData = {
  navMain: [
    {
      title: "     ",
      items: [
        {
          title: "My Profile",
          id: "profile",
          icon: User,
          isActive: false,
        },
        {
          title: "Todo Past Papers",
          id: "todo",
          icon: ListTodo,
          isActive: false,
        },
        {
          title: "Completed Papers",
          id: "completed",
          icon: CheckSquare,
          isActive: false,
        },
      ],
    },
  ],
};

// App Sidebar Component
function AppSidebar({
  activeTab,
  setActiveTab,
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: UserData;
}) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/auth");
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <BookOpenCheck className="h-6 w-6" />
          <span className="font-semibold">Past Papers Hub</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {navigationData.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={activeTab === item.id}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={user.image || undefined}
                      alt={user.name}
                    />
                    <AvatarFallback className="rounded-lg">
                      {user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

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
      <AppSidebar
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

// Content for "My Profile" Tab
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
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function TodoPastPapersTab() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Todo Past Papers</h1>
        <p className="text-muted-foreground">
          Past papers you&apos;ve scheduled to complete.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListTodo className="h-5 w-5" />
              Upcoming Papers
            </CardTitle>
            <CardDescription>
              Your scheduled exam papers and practice sessions.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-32">
            <div className="text-center">
              <ListTodo className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No papers scheduled yet</p>
              <p className="text-sm text-muted-foreground">
                Add your first paper to get started
              </p>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button>Add Paper</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function CompletedPastPapersTab() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Completed Papers</h1>
        <p className="text-muted-foreground">
          Track your progress and review completed papers.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5" />
              Completed Papers
            </CardTitle>
            <CardDescription>
              A history of all the past papers you have finished.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-32">
            <div className="text-center">
              <CheckSquare className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No completed papers yet</p>
              <p className="text-sm text-muted-foreground">
                Complete your first paper to see it here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

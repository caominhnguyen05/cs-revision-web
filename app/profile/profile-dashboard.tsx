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
  CheckCircle2,
} from "lucide-react";
import { completePaper, getPastPaperLists } from "@/lib/actions/paper-actions";
import { toast } from "sonner";

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
        return <CompletedPastPapersTab papers={paperLists.completed} />;
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

function TodoPastPapersTab({
  papers,
  refreshLists,
}: {
  papers: string[];
  refreshLists: () => void;
}) {
  const handleCompletePaper = async (paperId: string) => {
    try {
      await completePaper(paperId);
      await refreshLists();
      toast.success(`Completed paper: ${paperId}`);
    } catch (error) {
      toast.error("Failed to mark paper as complete.");
    }
  };

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Todo Past Papers</h1>
        <p className="text-muted-foreground">
          Past papers you've scheduled to complete.
        </p>
      </div>

      <div className="grid gap-4">
        {papers.length > 0 ? (
          papers.map((paperId) => (
            <Card key={paperId}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ListTodo className="h-5 w-5 text-muted-foreground" />
                  <span className="font-mono font-medium">{paperId}</span>
                </div>
                <Button size="sm" onClick={() => handleCompletePaper(paperId)}>
                  <CheckSquare className="mr-2 h-4 w-4" />
                  Mark as Complete
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="col-span-full">
            <CardContent className="flex items-center justify-center h-40">
              <div className="text-center">
                <ListTodo className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">
                  Your to-do list is empty.
                </p>
                <p className="text-sm text-muted-foreground">
                  Go to the past papers section to add papers.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function CompletedPastPapersTab({ papers }: { papers: string[] }) {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Completed Papers</h1>
        <p className="text-muted-foreground">
          Track your progress and review completed papers.
        </p>
      </div>

      <div className="grid gap-4">
        {papers.length > 0 ? (
          papers.map((paperId) => (
            <Card key={paperId}>
              <CardContent className="p-4 flex items-center gap-2 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-mono font-medium">{paperId}</span>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="col-span-full">
            <CardContent className="flex items-center justify-center h-40">
              <div className="text-center">
                <CheckSquare className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No completed papers yet</p>
                <p className="text-sm text-muted-foreground">
                  Complete your first paper to see it here.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

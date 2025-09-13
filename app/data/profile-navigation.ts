import { User, ListTodo, CheckSquare } from "lucide-react";

export const navigationData = {
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

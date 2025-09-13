"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";

const prisma = new PrismaClient();

export const getPastPaperLists = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  const userWithPapers = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      todoPastPapers: true,
      completedPastPapers: true,
    },
  });
  return {
    todo: userWithPapers?.todoPastPapers ?? [],
    completed: userWithPapers?.completedPastPapers ?? [],
  };
};

export const addTodoPaper = async (paperId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: { id: session.user.id },
      select: { todoPastPapers: true },
    });

    if (user && !user.todoPastPapers.includes(paperId)) {
      await tx.user.update({
        where: { id: session.user.id },
        data: {
          todoPastPapers: {
            push: paperId,
          },
        },
      });
    }

    revalidatePath("/dashboard");
  });
};

export const completePaper = async (paperId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: { id: session.user.id },
      select: { todoPastPapers: true, completedPastPapers: true },
    });

    if (!user) return;

    const newTodoList = user.todoPastPapers.filter((p) => p !== paperId);

    const newCompletedList = user.completedPastPapers.includes(paperId)
      ? user.completedPastPapers
      : [...user.completedPastPapers, paperId];

    await tx.user.update({
      where: { id: session.user.id },
      data: {
        todoPastPapers: newTodoList,
        completedPastPapers: newCompletedList,
      },
    });

    revalidatePath("/dashboard");
  });
};

// Action to remove a paper from the todo list
export const removeTodoPaper = async (paperId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { todoPastPapers: true },
  });

  if (!user) return;

  const newTodoList = user.todoPastPapers.filter((p) => p !== paperId);

  await prisma.user.update({
    where: { id: session.user.id },
    data: { todoPastPapers: newTodoList },
  });

  revalidatePath("/dashboard");
};

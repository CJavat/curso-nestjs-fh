"use server";

import { revalidatePath } from "next/cache";
import { Todo } from "@prisma/client";
import prisma from "@/lib/prisma";
import { getUserSessionServer } from "@/auth/actions/auth-actions";

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const user = await getUserSessionServer();
  if (!user) throw new Error("User not found");

  const todo = await prisma.todo.findFirst({ where: { id, userId: user.id } });
  if (!todo) throw `TODO con id ${id} no encontrado`;

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  revalidatePath("/dsahboard/server-todos");
  return updatedTodo;
};

// : Promise<Todo>
export const addTodo = async (description: string) => {
  try {
    const user = await getUserSessionServer();
    if (!user) throw new Error("User not found");

    const todo = await prisma.todo.create({
      data: { description, userId: user.id },
    });

    revalidatePath("/dsahboard/server-todos");
    return todo;
  } catch (error) {
    console.log(error);
    return { message: "Error creando todo" };
  }
};

export const deleteTodos = async (): Promise<void> => {
  try {
    const user = await getUserSessionServer();
    if (!user) throw new Error("User not found");

    await prisma.todo.deleteMany({
      where: { complete: true, userId: user.id },
    });

    revalidatePath("/dsahboard/server-todos");
  } catch (error) {
    console.log(error);
  }
};

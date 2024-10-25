"use server";

import { revalidatePath } from "next/cache";
import { Todo } from "@prisma/client";
import prisma from "@/lib/prisma";

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const todo = await prisma.todo.findFirst({ where: { id } });
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
    const todo = await prisma.todo.create({ data: { description } });

    revalidatePath("/dsahboard/server-todos");
    return todo;
  } catch (error) {
    console.log(error);
    return { message: "Error creando todo" };
  }
};

export const deleteTodos = async (): Promise<void> => {
  try {
    await prisma.todo.deleteMany({
      where: { complete: true },
    });

    revalidatePath("/dsahboard/server-todos");
  } catch (error) {
    console.log(error);
  }
};

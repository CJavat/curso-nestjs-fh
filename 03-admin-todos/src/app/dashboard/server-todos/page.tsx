export const dynamic = "force-dynamic";
export const revalidate = 0;

import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";

export const metadata = {
  title: "Listado de Todos",
  description: "Se muestran todos los todos",
};

export default async function ServerTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

  return (
    <div>
      <span className="text-3xl mb-10">Server Actions</span>
      <div className="w-full px-5 pb-5">
        <NewTodo />
      </div>

      <TodosGrid todos={todos} />
    </div>
  );
}

import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import * as yup from "yup";
import { getUserSessionServer } from "@/auth/actions/auth-actions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = searchParams.get("take") ?? "10";
  const skip = searchParams.get("skip") ?? "0";
  if (isNaN(+take))
    return NextResponse.json(
      { message: "Take tiene que ser un número" },
      { status: 400 }
    );
  if (isNaN(+skip))
    return NextResponse.json(
      { message: "Skip tiene que ser un número" },
      { status: 400 }
    );

  const todos = await prisma.todo.findMany({
    take: +take,
    skip: +skip,
  });

  return NextResponse.json(todos);
}

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
});
export async function POST(request: Request) {
  try {
    const user = await getUserSessionServer();
    if (!user) return NextResponse.json("No Authorizado", { status: 401 });

    const { complete, description } = await postSchema.validate(
      await request.json()
    );

    const todo = await prisma.todo.create({
      data: { complete, description, userId: user.id },
    });

    return NextResponse.json(todo);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getUserSessionServer();
    if (!user) return NextResponse.json("No Authorizado", { status: 401 });

    await prisma.todo.deleteMany({
      where: { complete: true, userId: user.id },
    });

    return NextResponse.json({
      message: "Las tareas completadas han sido eliminadas",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}

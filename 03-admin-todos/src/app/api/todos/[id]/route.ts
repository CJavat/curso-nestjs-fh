import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import * as yup from "yup";
import { getUserSessionServer } from "@/auth/actions/auth-actions";

interface Segments {
  params: {
    id: string;
  };
}

export async function GET(request: Request, segments: Segments) {
  const user = await getUserSessionServer();
  if (!user) return NextResponse.json("No Authorizado", { status: 401 });

  const { params } = segments;

  const todo = await prisma.todo.findUnique({
    where: { id: params.id, userId: user.id },
  });

  if (!todo)
    return NextResponse.json({ message: "El TODO no existe" }, { status: 404 });

  return NextResponse.json(todo);
}

const putSchema = yup.object({
  complete: yup.boolean().optional(),
  description: yup.string().optional(),
});
export async function PUT(request: Request, segments: Segments) {
  const { params } = segments;
  const user = await getUserSessionServer();
  if (!user) return NextResponse.json("No Authorizado", { status: 401 });

  try {
    const { complete, description } = await putSchema.validate(
      await request.json()
    );

    const todo = await prisma.todo.update({
      where: { id: params.id, userId: user.id },
      data: {
        complete,
        description,
      },
    });

    if (!todo)
      return NextResponse.json(
        { message: "El TODO no existe" },
        { status: 404 }
      );

    return NextResponse.json(todo);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}

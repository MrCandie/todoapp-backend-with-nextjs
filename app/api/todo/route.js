import Todo from "@/model";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { title, description } = body;

    if (!title || !description)
      return NextResponse.json(
        {
          message: "Title and description are required",
          status: "Bad request",
        },
        {
          status: 400,
        }
      );

    const todo = await Todo.create({ title, description });

    return NextResponse.json(
      {
        status: "Success",
        message: "Todo created",
        data: todo,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "something went wrong",
      },
      { status: 500 }
    );
  }
};

export const GET = async (req) => {
  try {
    const todoList = await Todo.findAll({
      attributes: ["id", "title", "description"],
    });

    return NextResponse.json({
      message: "Todo list retrieved",
      data: todoList,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "something went wrong",
        error,
      },
      { status: 500 }
    );
  }
};

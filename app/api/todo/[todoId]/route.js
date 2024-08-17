import Todo from "@/model";
import { NextResponse } from "next/server";

export const GET = async (req, context) => {
  try {
    const { todoId } = context.params;

    const todo = await Todo.findOne({ where: { id: todoId } });
    if (!todo)
      return NextResponse.json(
        {
          status: "error",
          message: "todo not found",
        },
        { status: 404 }
      );

    return NextResponse.json({
      message: "Todo retrieved",
      data: todo,
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

export const PATCH = async (req, context) => {
  try {
    const { todoId } = context.params;

    const todo = await Todo.findOne({ where: { id: todoId } });
    if (!todo)
      return NextResponse.json(
        {
          status: "error",
          message: "todo not found",
        },
        { status: 404 }
      );

    const body = await req.json();
    const { title: title, description: description } = body;

    await Todo.update(
      {
        title,
        description,
      },
      { where: { id: todoId } }
    );

    const updatedTodo = await Todo.findOne({ where: { id: todoId } });

    return NextResponse.json({
      message: "todo updated",
      data: updatedTodo,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "something went wrong",
        error,
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (req, context) => {
  try {
    const { todoId } = context.params;

    const todo = await Todo.findOne({ where: { id: todoId } });

    if (!todo)
      return NextResponse.json(
        {
          status: "error",
          message: "Todo not found",
        },
        { status: 400 }
      );

    await Todo.destroy({ where: { id: todoId } });

    return NextResponse.json({
      message: "todo deleted",
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

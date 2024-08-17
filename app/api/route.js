import { NextResponse } from "next/server";

export const GET = async (req) => {
  return NextResponse.json({ message: "This is my nextjs todo application" });
};

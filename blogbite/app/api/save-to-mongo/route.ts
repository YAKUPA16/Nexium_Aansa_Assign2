export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { url, fullText } = await req.json();
    const client = await clientPromise;
    const db = client.db(); // defaults to blogbite from URI
    const collection = db.collection("blogs");

    const result = await collection.insertOne({
      url,
      fullText,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, insertedId: result.insertedId });
  } catch (error: unknown) {
    console.error("❌ Mongo API Error:", error);
    const message =
      error instanceof Error
        ? error.message
        : typeof error === "string"
        ? error
        : "Unknown server error";

    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
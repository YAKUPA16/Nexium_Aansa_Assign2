import clientPromise from "@/lib/mongodb";

export async function saveToMongo(url: string, fullText: string) {
  try {
    const client = await clientPromise;
    const db = client.db(); // defaults to blogbite from URI
    const collection = db.collection("blogs");

    const result = await collection.insertOne({
      url,
      fullText,
      createdAt: new Date()
    });

    console.log("✅ MongoDB insert success:", result);
    return true;
  } catch (error) {
    console.error("❌ MongoDB insert error:", error);
    return false;
  }
}

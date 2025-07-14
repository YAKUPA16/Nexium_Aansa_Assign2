"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabaseClient";
import { saveToMongo } from "@/lib/saveToMongo";

export default function Home() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [urduSummary, setUrduSummary] = useState("");
  const [hydrated, setHydrated] = useState(false);

  const fakeBlogText = `Cookies are one of the most loved snacks worldwide. 
                        They come in many flavors, but chocolate chip cookies remain the most popular. 
                        People enjoy them with milk, coffee, or as standalone treats.`;

  // Static summary logic
  function simulateSummary(text: string) {
    const firstSentence = text.split(".")[0] + ".";
    return firstSentence;
  }

  // Simple dictionary-based translation
  function translateToUrdu(summary: string): string {
    return summary
      .split(" ")
      .map((word) => {
        const cleaned = word.toLowerCase().replace(/[.,]/g, "");
        return urduDictionary[cleaned] || word;
      })
      .join(" ");
  }

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <main className="bg-[url('/Cookies.jpg')] bg-repeat bg-center min-h-screen flex items-center justify-center px-4">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-xl w-full space-y-6 border border-[#f4e4d6]">
        {/* 🍪 Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#68cef7] flex items-center justify-center gap-2">
            <img src="/BlogBite_logo.jpg" alt="cookie" className="rounded-full object-cover w-15 h-15" />
            BlogBite
          </h1>
          <p className="text-brown-700 text-sm mt-1">Summarize blogs the tasty way 🍪</p>
        </div>

        {/* ✏️ Input Section */}
        <div className="space-y-2">
          <Input
            type="text"
            id="urlInput"
            placeholder="Paste blog URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border-2 border-[#d4a373] focus:ring-[#68cef7] focus:border-[#68cef7]"
          />
          <Button
            id="summarizeBtn"
            className="bg-[#68cef7] text-white hover:bg-[#52b3e6] w-full"
            onClick={() => {
              const summaryResult = simulateSummary(fakeBlogText);
              const urdu = translateToUrdu(summaryResult);
              setSummary(summaryResult);
              setUrduSummary(urdu);
            }}
          >
            Summarize
          </Button>
        </div>

        {/* 📄 Summary Output */}
        {hydrated && summary && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-left text-[#d1882e]">Summary (English)</h2>
              <Textarea
                readOnly
                value={summary}
                className="bg-white border-[#d4a373] focus-visible:ring-0"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-left text-[#d1882e]">Summary (Urdu)</h2>
              <Textarea
                readOnly
                dir="rtl"
                value={urduSummary}
                className="bg-white border-[#d4a373] focus-visible:ring-0 text-right"
              />
            </div>
          </div>
        )}

        {/* 💾 Save Section */}
        {hydrated && summary && (
          <div className="text-center">
            <Button
              className="bg-[#d1882e] hover:bg-[#bd7726] text-white w-full"
              onClick={async () => {
                console.log("🟡 Attempting to insert:", {
                  url,
                  summary,
                  urdu_summary: urduSummary,
                });

                const { data, error } = await supabase
                  .from("summaries")
                  .insert([{ url, summary, urdu_summary: urduSummary }]);

                if (error) {
                  console.error("❌ Supabase insert error:", error);
                  alert("❌ Failed to save summary.");
                } else {
                  console.log("✅ Supabase insert success:", data);

                  // 💾 Save full blog to MongoDB too
                  const mongoSuccess = await saveToMongo(url, fakeBlogText);
                  if (mongoSuccess) {
                    alert("✅ Summary saved to Supabase & blog saved to MongoDB!");
                  } else {
                    alert("✅ Summary saved, but MongoDB failed.");
                  }
                }
              }}
            >
              Save Summary
            </Button>
            <p className="text-green-600 text-sm mt-2">✔️ Saved successfully!</p>
          </div>
        )}
      </div>
    </main>
  );
}

const urduDictionary: Record<string, string> = {
  "cookies": "بسکٹ",
  "are": "ہیں",
  "one": "ایک",
  "of": "کا",
  "the": "یہ",
  "most": "زیادہ",
  "loved": "پسندیدہ",
  "snacks": "سنیکس",
  "worldwide": "دنیا بھر میں",
  "chocolate": "چاکلیٹ",
  "chip": "چپ",
  "popular": "مقبول",
  "remain": "رہتے ہیں",
  "people": "لوگ",
  "enjoy": "لطف اٹھاتے ہیں",
  "them": "انہیں",
  "with": "کے ساتھ",
  "milk": "دودھ",
  "coffee": "کافی",
  "or": "یا",
  "as": "بطور",
  "standalone": "اکیلا",
  "treats": "چیزیں"
};

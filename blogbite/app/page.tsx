"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [urduSummary, setUrduSummary] = useState("");

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
          >
            Summarize
          </Button>
        </div>

        {/* 📄 Summary Output */}
        {summary && (
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
        {summary && (
          <div className="text-center">
            <Button className="bg-[#d1882e] hover:bg-[#bd7726] text-white w-full">
              Save Summary
            </Button>
            <p className="text-green-600 text-sm mt-2">✔️ Saved successfully!</p>
          </div>
        )}
      </div>
    </main>
  );
}

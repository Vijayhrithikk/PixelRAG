"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [backendStatus, setBackendStatus] = useState<string>("Connecting to backend...");

  useEffect(() => {
    fetch("http://localhost:8080/api/health")
      .then((res) => res.json())
      .then((data) => {
        setBackendStatus(data.message);
      })
      .catch((err) => {
        setBackendStatus("Failed to connect to backend.");
        console.error("Backend connection error:", err);
      });
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-zinc-50 font-sans p-8">
      <div className="max-w-md w-full border border-zinc-800 p-8 rounded-xl bg-zinc-900 shadow-2xl">
        <h1 className="text-3xl font-bold mb-2 tracking-tight">PixelRAG</h1>
        <p className="text-zinc-400 mb-6">Visual RAG system for frontend generation.</p>
        
        <div className="p-4 rounded bg-zinc-950 border border-zinc-800 font-mono text-sm">
          <span className="text-zinc-500">Status: </span>
          <span className={backendStatus.includes("Failed") ? "text-red-400" : "text-emerald-400"}>
            {backendStatus}
          </span>
        </div>
      </div>
    </main>
  );
}
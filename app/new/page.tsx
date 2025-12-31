"use client";

import { useState } from "react";
import { db } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function NewResolution() {
  const [title, setTitle] = useState("");
  const [why, setWhy] = useState("");
  const router = useRouter();

  const saveResolution = async () => {
    if (!title) return alert("Enter resolution title");
    await addDoc(collection(db, "resolutions"), {
      title,
      why,
      createdAt: new Date(),
    });
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Resolution</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Resolution title"
        className="w-full p-3 rounded-lg bg-gray-800 mb-3 outline-none"
      />

      <textarea
        value={why}
        onChange={(e) => setWhy(e.target.value)}
        placeholder="Why is this important to you?"
        className="w-full p-3 rounded-lg bg-gray-800 mb-3 outline-none"
      />

      <button
        onClick={saveResolution}
        className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-lg"
      >
        Save Resolution
      </button>
    </main>
  );
}

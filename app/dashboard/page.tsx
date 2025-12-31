"use client";

import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";

export default function Dashboard() {
  const [resolutions, setResolutions] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const rSnap = await getDocs(collection(db, "resolutions"));
      const tSnap = await getDocs(collection(db, "weeklyTasks"));
      setResolutions(rSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setTasks(tSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    load();
  }, []);

  const deleteResolution = async (id: string) => {
  await deleteDoc(doc(db, "resolutions", id));
  setResolutions(resolutions.filter(r => r.id !== id));
};


  const getScore = (rid: string) => {
    const rel = tasks.filter(t => t.resolutionId === rid);
    if (rel.length === 0) return 0;
    const done = rel.filter(t => t.done).length;
    return Math.round((done / rel.length) * 100);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">

      <div className="w-full max-w-sm bg-gray-100 dark:bg-gray-900 p-10 rounded-3xl shadow">


        <h2 className="text-3xl font-bold">Resolution Health</h2>
        <div className="flex gap-3">
          <Link href="/new"><button className="bg-indigo-600 px-3 py-1 rounded">+ Resolution</button></Link>
          <Link href="/weekly"><button className="bg-gray-800 px-3 py-1 rounded">Weekly</button></Link>
          <Link href="/daily"><button className="bg-gray-800 px-3 py-1 rounded">Daily</button></Link>
        </div>
      </div>

      <div className="grid gap-4">
        {resolutions.map(r => {
          const score = getScore(r.id);
          return (
           <div key={r.id} className="bg-gray-100 dark:bg-gray-900 p-5 rounded-2xl shadow">



              <div className="flex justify-between items-center">
                <h3 className="text-xl">{r.title}</h3>
                <span className={`font-bold ${score >= 70 ? "text-green-400" : score >= 40 ? "text-yellow-400" : "text-red-400"}`}>
                  {score}%
                </span>
              </div>
              <p className="text-gray-400 text-sm">{r.why}</p>
              <button
  onClick={() => deleteResolution(r.id)}
  className="mt-2 text-sm text-red-400 hover:text-red-300"
>
  Delete Resolution
</button>

            </div>
          );
        })}
      </div>
    </main>
  );
}

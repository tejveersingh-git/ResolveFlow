"use client";

import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function DailyCheckIn() {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "weeklyTasks"));
      setTasks(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    load();
  }, []);

  const markDone = async (id: string) => {
    await updateDoc(doc(db, "weeklyTasks", id), { done: true });
    setTasks(tasks.map(t => t.id === id ? { ...t, done: true } : t));
  };

  return (
     <main className="min-h-screen p-6 text-black dark:text-gray-200">

      <h2 className="text-2xl font-bold mb-4">Daily Check-In</h2>

      <div className="grid gap-3">
        {tasks.map(t => (
          <div key={t.id} className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg flex justify-between items-center">

            <span className={t.done ? "line-through text-gray-500" : ""}>
              {t.task}
            </span>
            {!t.done && (
              <button onClick={() => markDone(t.id)} className="bg-green-600 px-3 py-1 rounded">
                Done
              </button>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

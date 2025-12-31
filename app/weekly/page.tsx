"use client";

import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function WeeklyPlanner() {
  const [resolutions, setResolutions] = useState<any[]>([]);
  const [task, setTask] = useState("");
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "resolutions"));
      setResolutions(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    load();
  }, []);

  const addTask = async () => {
    if (!task || !selected) return alert("Fill all fields");
    await addDoc(collection(db, "weeklyTasks"), {
      task,
      resolutionId: selected,
      done: false,
      createdAt: new Date()
    });
    setTask("");
    alert("Task added to this week!");
  };

  return (
    <main className="min-h-screen p-6 max-w-xl mx-auto text-black dark:text-gray-200">

      <h2 className="text-2xl font-bold mb-4">Weekly Planner</h2>

      <select
        onChange={e => setSelected(e.target.value)}
        className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-900 mb-3"

      >
        <option value="">Select Resolution</option>
        {resolutions.map(r => (
          <option key={r.id} value={r.id}>{r.title}</option>
        ))}
      </select>

      <input
        value={task}
        onChange={e => setTask(e.target.value)}
        placeholder="Weekly task (e.g. Walk 30 min daily)"
        className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-900 mb-3"

      />

      <button onClick={addTask} className="w-full bg-indigo-600 py-3 rounded-lg">
        Add Task
      </button>
    </main>
  );
}

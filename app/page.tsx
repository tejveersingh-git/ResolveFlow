export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-gray-100 dark:bg-gray-900 p-10 rounded-3xl shadow text-center">
        <h1 className="text-4xl font-bold mb-4">ResolveFlow</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Build your future through disciplined daily action.
        </p>
        <a href="/dashboard">
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl w-full">
            Enter Your Life OS
          </button>
        </a>
      </div>
    </main>
  );
}

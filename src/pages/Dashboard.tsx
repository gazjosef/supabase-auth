import { useAuth } from "../context/useAuth";

export default function Dashboard() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md text-center">
        <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
        <p className="mb-6">
          Welcome, <span className="font-medium">{user?.email}</span>
        </p>
        <button
          onClick={signOut}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

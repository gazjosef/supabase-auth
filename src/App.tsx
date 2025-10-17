import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

// export default function App() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-100">
//       <h1 className="text-3xl font-bold text-blue-700">
//         Tailwind is working 🎉
//       </h1>
//     </div>
//   );
// }

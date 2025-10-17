import type { ReactNode } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth"; // assuming you have an AuthContext
import { supabase } from "../lib/supabaseClient";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error);
        navigate("/login");
        return;
      }

      const currentUser = data?.user;
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
      }
    };

    if (!loading && !user) {
      getUser();
    }
  }, [loading, user, navigate, setUser]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null; // prevents flashing before navigation
  }

  return <>{children}</>;
}

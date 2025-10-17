// import type { ReactNode } from "react";
// import { createContext, useContext, useEffect, useState } from "react";
// import { supabase } from "../lib/supabaseClient";
// import type { Session, User } from "@supabase/supabase-js";

// interface AuthContextType {
//   user: User | null;
//   session: Session | null;
//   loading: boolean;
//   setUser: (user: User | null) => void;
//   signOut: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [session, setSession] = useState<Session | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Get current session
//     const initAuth = async () => {
//       const { data, error } = await supabase.auth.getSession();

//       if (error) {
//         console.error("Error fetching session:", error);
//       }

//       setSession(data.session);
//       setUser(data.session?.user ?? null);
//       setLoading(false);
//     };

//     initAuth();

//     // Listen for changes in authentication state
//     const { data: listener } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         setSession(session);
//         setUser(session?.user ?? null);
//         setLoading(false);
//       }
//     );

//     return () => {
//       listener.subscription.unsubscribe();
//     };
//   }, []);

//   const signOut = async () => {
//     await supabase.auth.signOut();
//     setUser(null);
//     setSession(null);
//   };

//   const value: AuthContextType = {
//     user,
//     session,
//     loading,
//     setUser,
//     signOut,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within an AuthProvider");
//   return context;
// }

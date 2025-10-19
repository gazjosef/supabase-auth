import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [team, setTeam] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // List of NRL teams (example)
  const nrlTeams = [
    "Brisbane Broncos",
    "Canberra Raiders",
    "Canterbury-Bankstown Bulldogs",
    "Cronulla-Sutherland Sharks",
    "Dolphins",
    "Gold Coast Titans",
    "Manly Warringah Sea Eagles",
    "Melbourne Storm",
    "Newcastle Knights",
    "New Zealand Warriors",
    "North Queensland Cowboys",
    "Parramatta Eels",
    "Penrith Panthers",
    "South Sydney Rabbitohs",
    "St. George Illawarra Dragons",
    "Sydney Roosters",
    "Wests Tigers",
  ];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Step 1: Sign up user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw new Error(signUpError.message || "Sign-up failed");

      const userId = data.user?.id;
      if (!userId) throw new Error("User ID not found.");

      // Optional: small delay to let Supabase finalise the auth insert
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Step 2: Update profile info (trigger should already have created a row)
      const { error: profileError } = await supabase.from("profiles").upsert({
        id: userId,
        email,
        first_name: firstName,
        last_name: lastName,
        team,
        updated_at: new Date().toISOString(),
      });

      if (profileError)
        throw new Error(profileError.message || "Profile update failed");

      navigate("/dashboard");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create account
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-3 text-sm">
            {error}
          </div>
        )}
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full mb-3 p-2 border rounded-md"
          required
          autoComplete="given-name"
        />

        <input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full mb-3 p-2 border rounded-md"
          required
          autoComplete="family-name"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded-md"
          required
          autoComplete="email"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded-md"
          required
          autoComplete="new-password"
        />

        <select
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          className="w-full mb-4 p-2 border rounded-md"
          required
        >
          <option value="">Select your NRL team</option>
          {nrlTeams.map((teamName) => (
            <option key={teamName} value={teamName}>
              {teamName}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition disabled:opacity-70"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}

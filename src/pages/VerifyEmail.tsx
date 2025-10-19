import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";

export default function VerifyEmail() {
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleResend = async () => {
    setResending(true);
    setMessage(null);
    setError(null);

    try {
      const { data: user } = await supabase.auth.getUser();
      const email = user?.user?.email;

      if (!email) throw new Error("No user email found.");

      // Send a new magic link / verification email
      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email,
      });

      if (resendError) throw resendError;

      setMessage(`Verification email sent again to ${email}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend email.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">
          Verify your email
        </h1>

        <p className="text-gray-600 mb-6">
          We’ve sent a verification link to your email. Please check your inbox
          (and spam folder) to activate your account.
        </p>

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-sm">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleResend}
          disabled={resending}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-70"
        >
          {resending ? "Resending..." : "Resend verification email"}
        </button>

        <p className="text-sm mt-6 text-gray-500">
          Already verified?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

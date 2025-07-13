import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/utils/constants";

export const ResendVerification = ({ emailId }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [coolDown, setCoolDown] = useState(0);

  useEffect(() => {
    if (coolDown > 0) {
      const timer = setTimeout(() => setCoolDown(coolDown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [coolDown]);

  const handleResend = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/resend-verification`,
        {
          emailId,
        },
        { withCredentials: true }
      );
      setMessage("Verification email resent successfully!");
      setCoolDown(60);
    } catch (err) {
      setMessage("Failed to resend email. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 text-center">
      <button
        onClick={handleResend}
        disabled={loading || coolDown > 0}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
      >
        {loading
          ? "Sending..."
          : coolDown > 0
          ? `Resend in ${coolDown}s`
          : "Resend Verification Email"}
      </button>
      {message && <div className="mt-2 text-sm text-gray-700">{message}</div>}
    </div>
  );
};

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BASE_URL } from "@/utils/constants";
import axios from "axios";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying…");

  // Extract primitives
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  useEffect(() => {
    if (!token || !id) {
      setStatus("Invalid verification link.");
      return;
    }

    axios
      .get(`${BASE_URL}/verify-email`, { params: { token, id } })
      .then(() => {
        setStatus("Email verified successfully! Redirecting to login…");
        setTimeout(() => navigate("/login?verified=true"), 2000);
      })
      .catch(() => {
        setStatus("Verification failed or link expired.");
      });
    // depend on token/id (primitives) or just []
  }, [token, id, navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center space-y-4">
        <h2 className="text-2xl font-semibold text-blue-600">
          Email Verification
        </h2>
        <p className="text-gray-700 text-base">{status}</p>
      </div>
    </div>
  );
}

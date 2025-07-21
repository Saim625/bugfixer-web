import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/AuthLayout";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { storeloginInfo } from "../utils/userSlice";
import { ResendVerification } from "../components/ResendVerification";

export const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [unverifiedEmail, setUnverifiedEmail] = useState("");
  const [showResend, setShowResend] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      const user = res?.data.User;
      dispatch(storeloginInfo(user));
      if (!user.isProfileCompleted) {
        navigate("/complete-profile");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      if (
        err.response?.status === 403 &&
        err.response?.data?.code === "EMAIL_NOT_VERIFIED"
      ) {
        setError("Your email is not verified. Please check your inbox.");
        setUnverifiedEmail(err.response?.data?.email);
        setShowResend(true);
      }
      setError(err.response?.data?.message);
    }
  };

  return (
    <AuthLayout title="Log In to BugFixer Pro">
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {showResend && <ResendVerification emailId={unverifiedEmail} />}
        <button
          type="button"
          className="w-full cursor-pointer px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700  transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
          onClick={handleLogin}
        >
          Log In
        </button>
      </form>
      <p className="text-sm text-center mt-4 text-slate-600">
        Don’t have an account?{" "}
        <Link to="/signup" replace className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
};

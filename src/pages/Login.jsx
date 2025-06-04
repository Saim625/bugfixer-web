import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/AuthLayout";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { storeloginInfo } from "../utils/userSlice";

export const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(storeloginInfo(res.data.User));
      console.log(res.data);
      navigate("/complete-profile");
    } catch (err) {
      console.log(err.message);
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
        <button
          type="button"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
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

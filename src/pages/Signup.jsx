import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/AuthLayout";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { storeSignUpInfo } from "@/utils/userSlice";
import { useDispatch } from "react-redux";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      navigate("/email-sent", { state: { email: emailId } });
      dispatch(storeSignUpInfo(res.data.user));
      console.log(res.data);
    } catch (errr) {
      console.log(errr.message);
    }
  };

  return (
    <AuthLayout title="Create your BugFixer Account">
      <form className="space-y-4">
        <input
          type="text"
          value={firstName}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          value={emailId}
          placeholder="Email"
          onChange={(e) => setEmailId(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={handleSignUp}
          className="w-full  bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>
      <p className="text-sm text-center mt-4 text-slate-600">
        Already have an account?{" "}
        <Link to="/login" replace className="text-blue-600 hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
};

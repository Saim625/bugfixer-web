// src/pages/CompleteProfile.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";

export const CompleteProfile = () => {
  const [isDeveloper, setIsDeveloper] = useState(false);
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");
  const dispatch = useDispatch();

  const handleProfileUpdate = async () => {
    const res = await axios.patch(
      BASE_URL + "/complete-profile",
      { bio, skills, isDeveloper },
      { withCredentials: true }
    );
    dispatch(updateProfile(res.data.user));

    console.log("Profile Data:", payload);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <form className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-slate-800">
          Complete Your Profile
        </h2>

        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isDeveloper}
              onChange={(e) => setIsDeveloper(e.target.checked)}
              className="accent-blue-600"
            />
            <span className="text-slate-700">I’m a developer</span>
          </label>
        </div>

        {isDeveloper && (
          <div className="space-y-2">
            <label className="block text-slate-700 font-medium">Skills</label>
            <input
              type="text"
              placeholder="e.g. JavaScript, React, Node.js"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-slate-700 font-medium">Bio</label>
          <textarea
            placeholder="Tell us something about yourself"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-4 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></textarea>
        </div>

        <button
          type="button"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          onClick={handleProfileUpdate}
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
};

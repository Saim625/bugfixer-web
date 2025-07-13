import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { useNavigate } from "react-router-dom";

export const CompleteProfile = () => {
  const [userIntent, setUserIntent] = useState("both");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    bio: false,
    skills: false,
  });

  const navigate = useNavigate();

  const handleProfileUpdate = async () => {
    if (!bio.trim() || skills.length === 0) {
      setErrors({
        bio: !bio.trim(),
        skills: skills.length === 0,
      });
      return;
    }
    try {
      const res = await axios.patch(
        BASE_URL + "/complete-profile",
        { bio, skills, userIntent },
        { withCredentials: true }
      );
      dispatch(updateProfile(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <form className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-slate-800">
          Complete Your Profile
        </h2>
        <div className="mb-8">
          <p className="text-base font-medium text-gray-800 mb-3">
            What brings you to BugFixer Pro?
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {[
              { label: "Report Bugs", value: "reporter", emoji: "🐞" },
              { label: "Fix Bugs", value: "fixer", emoji: "🛠️" },
              { label: "Both", value: "both", emoji: "🔁" },
            ].map((option) => (
              <label
                key={option.value}
                className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer transition-all duration-200 
          ${
            userIntent === option.value
              ? "border-blue-600 bg-blue-50 ring-1 ring-blue-200"
              : "border-gray-300 hover:border-blue-400"
          }`}
              >
                <input
                  type="radio"
                  name="userIntent"
                  value={option.value}
                  checked={userIntent === option.value}
                  onChange={(e) => setUserIntent(e.target.value)}
                  className="hidden"
                />
                <span className="text-lg">{option.emoji}</span>
                <span className="text-sm font-medium text-gray-800">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-slate-700 font-medium">Skills</label>
          <input
            type="text"
            placeholder="e.g. JavaScript, React, Node.js"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              errors.skills ? "border-red-500" : "border-slate-300"
            }`}
          />
          {errors.skills && (
            <p className="text-sm text-red-500 mt-1">
              Please add at least one skill.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-slate-700 font-medium">Bio</label>
          <textarea
            placeholder="Tell us something about yourself"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className={`w-full border rounded-lg px-4 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              errors.bio ? "border-red-500" : "border-slate-300"
            }`}
          ></textarea>
          {errors.bio && (
            <p className="text-red-500 text-sm">Bio is required</p>
          )}
        </div>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <button
          type="button"
          className="w-full cursor-pointer px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
          onClick={handleProfileUpdate}
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
};

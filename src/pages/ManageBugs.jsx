import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";

export const ManageBugs = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserBugs = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/bugs/my-bugs`, {
          withCredentials: true,
        });
        setBugs(res.data);
      } catch (err) {
        console.error("Error fetching user's bugs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserBugs();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg font-medium">
        Loading your bugs...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center text-blue-600">
        Manage Your Bugs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
        {bugs.map((bug) => (
          <div
            key={bug._id}
            className="p-5 bg-white rounded-xl shadow-sm border border-gray-200"
          >
            <h2 className="text-lg font-semibold text-gray-800">{bug.title}</h2>
            <p className="text-sm text-gray-600 line-clamp-3">
              {bug.description}
            </p>
            <div className="mt-3 flex justify-between items-center">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  bug.status === "open"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {bug.status.toUpperCase()}
              </span>
              <button className="text-sm text-blue-600 hover:underline">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

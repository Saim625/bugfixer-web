import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { Link } from "react-router-dom";
import {
  Plus,
  Bug,
  CheckCircle,
  Clock,
  Send,
  Award,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from "lucide-react";

export const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/dashboard", {
          withCredentials: true,
        });
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-indigo-100 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-700 mt-6 text-lg font-medium">
            Loading your dashboard...
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Fetching your latest stats
          </p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: "Total Bugs Reported",
      value: stats?.totalBugs || 0,
      icon: Bug,
      gradient: "from-blue-600 to-cyan-600",
      bgGradient: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-200",
      change: "+12%",
      changeType: "positive",
    },
    {
      label: "Open Bugs",
      value: stats?.openBugs || 0,
      icon: Clock,
      gradient: "from-amber-600 to-orange-600",
      bgGradient: "from-amber-50 to-orange-50",
      borderColor: "border-amber-200",
      change: "-5%",
      changeType: "negative",
    },
    {
      label: "Closed Bugs",
      value: stats?.closedBugs || 0,
      icon: CheckCircle,
      gradient: "from-emerald-600 to-green-600",
      bgGradient: "from-emerald-50 to-green-50",
      borderColor: "border-emerald-200",
      change: "+18%",
      changeType: "positive",
    },
    {
      label: "Fix Requests Sent",
      value: stats?.fixRequestsSent || 0,
      icon: Send,
      gradient: "from-purple-600 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50",
      borderColor: "border-purple-200",
      change: "+8%",
      changeType: "positive",
    },
    {
      label: "Accepted Fix Requests",
      value: stats?.acceptedFixRequests || 0,
      icon: Award,
      gradient: "from-indigo-600 to-purple-600",
      bgGradient: "from-indigo-50 to-purple-50",
      borderColor: "border-indigo-200",
      change: "+25%",
      changeType: "positive",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Your Dashboard
                </h1>
                <p className="text-gray-600 text-lg">
                  Track your bug reports and contributions
                </p>
              </div>
            </div>

            <Link
              to="/report-bug"
              className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold text-white shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Report a Bug
              </div>
            </Link>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`group relative bg-white backdrop-blur-sm border ${stat.borderColor} rounded-2xl p-6 hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 shadow-sm`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-2xl`}
                ></div>

                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${stat.bgGradient} border ${stat.borderColor}`}
                    >
                      <Icon
                        className={`w-6 h-6 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                      />
                    </div>
                    <div
                      className={`flex items-center gap-1 text-sm ${
                        stat.changeType === "positive"
                          ? "text-emerald-600"
                          : "text-red-500"
                      }`}
                    >
                      <TrendingUp className="w-4 h-4" />
                      {stat.change}
                    </div>
                  </div>

                  <div className="mb-2">
                    <div
                      className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                    >
                      {stat.value}
                    </div>
                  </div>

                  <div className="text-gray-600 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Link
            to="/explore-bugs"
            className="group relative bg-white border border-indigo-200 rounded-3xl p-8 hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 shadow-sm overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>

            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl border border-indigo-200">
                  <Bug className="w-8 h-8 text-indigo-600" />
                </div>
                <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all duration-300" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                Explore Bugs
              </h3>

              <p className="text-gray-600 text-lg leading-relaxed">
                Find bugs you can fix and contribute to the community. Make a
                difference today.
              </p>
            </div>
          </Link>

          <Link
            to="/your-bugs"
            className="group relative bg-white border border-purple-200 rounded-3xl p-8 hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 shadow-sm overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>

            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl border border-purple-200">
                  <CheckCircle className="w-8 h-8 text-purple-600" />
                </div>
                <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-300" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                Your Bugs
              </h3>

              <p className="text-gray-600 text-lg leading-relaxed">
                Manage and track the bugs you've reported. Stay updated on their
                progress.
              </p>
            </div>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

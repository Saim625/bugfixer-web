import { useState } from "react";
import {
  Bug,
  Code,
  Users,
  MessageCircle,
  ArrowRight,
  Check,
  Star,
  Zap,
  Shield,
  Sparkles,
} from "lucide-react";
import bugfixingillustration from "@/assets/landingpage/Bug_fixing_illustration.svg";
import learning from "@/assets/landingpage/learning.svg";
import brainstorming from "@/assets/landingpage/brainstorming.svg";
import collaborating from "@/assets/landingpage/collaborating.svg";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  const [isHovered, setIsHovered] = useState(null);

  const features = [
    {
      title: "Learn from Others' Bugs",
      desc: "Browse real issues and discover how developers solve them in real time.",
      icon: Code,
      color: "from-blue-500 to-indigo-600",
      image: `${learning}`, // Replace with your learning.svg
    },
    {
      title: "Improve Brainstorming",
      desc: "Join discussions around bugs, suggest fixes, and sharpen your debugging mindset.",
      icon: Sparkles,
      color: "from-purple-500 to-pink-600",
      image: `${brainstorming}`, // Replace with your brainstorming.svg
    },
    {
      title: "Collaborative Fix Requests",
      desc: "Send requests, get accepted, and work seamlessly with reporters via built‑in chat.",
      icon: Users,
      color: "from-indigo-500 to-purple-600",
      image: `${collaborating}`, // Replace with your collaborating.svg
    },
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-slate-800 min-h-screen w-full overflow-x-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-indigo-200/10 to-purple-200/10 rounded-full blur-2xl animate-ping"
          style={{ animationDuration: "4s" }}
        ></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-lg">
            <Bug className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-800">
            BugFixer<span className="text-indigo-600"> Pro</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login">
            <button className="cursor-pointer px-4 py-2 text-gray-700 hover:text-indigo-600 transition-colors">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="cursor-pointer px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 w-full flex flex-col-reverse lg:flex-row items-center gap-10 px-6 pt-12 lg:pt-20 pb-24 max-w-6xl mx-auto">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-800">
              New: Real-time collaboration
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Report. Collaborate. Fix.
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              All in one place.
            </span>
          </h1>

          <p className="text-lg md:text-xl mb-8 text-slate-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Empower developers to fix bugs faster through real‑time chats and
            collaborative fix requests.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium">
              <span className="flex items-center gap-2">
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button className="group flex items-center gap-2 text-indigo-600 hover:text-purple-600 transition-colors font-medium">
              Explore Bugs
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-6 mt-8 text-sm text-slate-500">
            <div className="flex items-center gap-1">
              <Check className="w-4 h-4 text-green-500" />
              <span>Free to use</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-blue-500" />
              <span>Secure platform</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>500+ developers</span>
            </div>
          </div>
        </div>

        {/* Hero Illustration - Your Original */}
        <div className="flex-1 relative">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-300/20 to-purple-300/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <img
              src={bugfixingillustration}
              alt="Bug fixing illustration"
              className="relative w-full max-w-md mx-auto transform group-hover:scale-105 transition-transform duration-300"
              style={{
                filter: "drop-shadow(0 20px 40px rgba(99, 102, 241, 0.1))",
              }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why BugFixer?</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Join thousands of developers who are already collaborating and
              learning together
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}
              >
                {/* Your Original Illustration */}
                <div className="relative mb-6 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-200/30 to-purple-200/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="relative h-32 w-auto transform group-hover:scale-105 transition-transform duration-300"
                      style={{
                        filter:
                          "drop-shadow(0 10px 25px rgba(99, 102, 241, 0.1))",
                      }}
                    />
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-center">
                  {feature.desc}
                </p>

                {isHovered === index && (
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-2xl transition-opacity duration-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid sm:grid-cols-3 gap-10">
            {[
              { num: "1", text: "Sign up / Log in", icon: "👋" },
              { num: "2", text: "Report or Fix Bugs", icon: "🐛" },
              { num: "3", text: "Chat & Resolve Together", icon: "💬" },
            ].map((step, index) => (
              <div key={step.num} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-2xl font-bold rounded-full shadow-lg group-hover:shadow-xl transition-shadow">
                    {step.num}
                  </div>
                  <div className="absolute -top-2 -right-2 text-2xl">
                    {step.icon}
                  </div>
                </div>
                <p className="font-semibold text-lg text-slate-700">
                  {step.text}
                </p>
                {index < 2 && (
                  <div className="hidden sm:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-indigo-300 to-purple-300 transform translate-x-5"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to squash your next bug?
            </h2>
            <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
              Join our community of developers and start collaborating on bug
              fixes today
            </p>
            <Link>
              <button className="cursor-pointer bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105">
                Join BugFixer Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-800 text-slate-200 py-10 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-lg">
              <Bug className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">BugFixer Pro</span>
          </div>
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} BugFixer Pro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

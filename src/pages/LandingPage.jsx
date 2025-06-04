import { motion } from "framer-motion";
import { Button } from "@/utils/Button";
import bugfixingillustration from "@/assets/landingpage/Bug_fixing_illustration.svg";
import learning from "@/assets/landingpage/learning.svg";
import brainstorming from "@/assets/landingpage/brainstorming.svg";
import collaborating from "@/assets/landingpage/collaborating.svg";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const LandingPage = () => {
  return (
    <div className="bg-white text-slate-800 min-h-screen w-full overflow-x-hidden">
      {/* Navbar */}
      <Navbar />
      {/* Hero */}
      <section className="w-full flex flex-col-reverse lg:flex-row items-center gap-10 px-6 pt-20 lg:pt-32 pb-24 max-w-6xl mx-auto">
        <div className="flex-1 text-center lg:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold leading-tight mb-4"
          >
            Report. Collaborate. Fix.
            <br /> All in&nbsp;<span className="text-blue-600">one place.</span>
          </motion.h2>
          <p className="text-lg md:text-xl mb-8 text-slate-600 max-w-lg mx-auto lg:mx-0">
            Empower developers to fix bugs faster through real‑time chats and
            collaborative fix requests.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link to="/signup">
              {" "}
              <Button className="px-6 py-3 text-lg cursor-pointer">
                Get Started
              </Button>
            </Link>
            <Link
              to="/bugs"
              className="text-blue-600 underline-offset-4 hover:underline text-lg"
            >
              Explore Bugs →
            </Link>
          </div>
        </div>

        {/* Replace src w/ actual illustration */}
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          src={bugfixingillustration}
          alt="Bug fixing illustration"
          className="flex-1 w-full max-w-md"
        />
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-12">Why BugFixer?</h3>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Learn from Others’ Bugs",
                desc: "Browse real issues and discover how developers solve them in real time.",
                img: `${learning}`,
              },
              {
                title: "Improve Brainstorming",
                desc: "Join discussions around bugs, suggest fixes, and sharpen your debugging mindset.",
                img: `${brainstorming}`,
              },
              {
                title: "Collaborative Fix Requests",
                desc: "Send requests, get accepted, and work seamlessly with reporters via built‑in chat.",
                img: `${collaborating}`,
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center"
              >
                <img src={card.img} alt="Feature" className="h-32 mb-6" />
                <h4 className="font-semibold text-xl mb-2">{card.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-16">How It Works</h3>
        <div className="grid sm:grid-cols-3 gap-10">
          {[
            { num: "1", text: "Sign up / Log in" },
            { num: "2", text: "Report or Fix Bugs" },
            { num: "3", text: "Chat & Resolve Together" },
          ].map((step) => (
            <div key={step.num} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-600 text-white text-2xl font-bold rounded-full shadow">
                {step.num}
              </div>
              <p className="font-medium text-lg text-slate-700">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-200 py-10 px-6 text-center">
        <h4 className="text-2xl font-semibold mb-4">
          Ready to squash your next bug?
        </h4>
        <Button className="bg-green-600 hover:bg-green-700 px-6 py-3 text-lg mb-6">
          <Link to="/signup">Join BugFixer Now</Link>
        </Button>
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} BugFixer Pro. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

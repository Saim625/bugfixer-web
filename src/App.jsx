import { LandingPage } from "@/pages/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "@/pages/Login";
import { Signup } from "@/pages/Signup";
import { CompleteProfile } from "./pages/CompleteProfile";
import VerifyEmailPage from "@/pages/VerifyEmailPage";
import { Provider } from "react-redux";
import appStore from "@/utils/appStore";
import { EmailSentPage } from "@/pages/EmailSentPage";
import { AuthLoader } from "@/components/AuthLoader";
import { Dashboard } from "./pages/Dashboard";
import { Header } from "./pages/Header";
import { ExploreBugs } from "./pages/ExploreBugs";
import { ManageBugs } from "./pages/ManageBugs";
import { ReportBug } from "./pages/ReportBug";
import { Toaster } from "sonner";

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <AuthLoader />
        <Header />
        <Toaster position="top-center" theme="system" />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/email-sent" element={<EmailSentPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explore-bugs" element={<ExploreBugs />} />
          <Route path="/manage-bugs" element={<ManageBugs />} />
          <Route path="/report-bug" element={<ReportBug />} />
          <Route path="/your-bugs" element={<ManageBugs />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

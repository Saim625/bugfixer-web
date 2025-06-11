import { LandingPage } from "@/pages/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "@/pages/Login";
import { Signup } from "@/pages/Signup";
import { CompleteProfile } from "./pages/CompleteProfile";
import VerifyEmailPage from "@/pages/VerifyEmailPage";
import { Provider, useDispatch } from "react-redux";
import appStore from "@/utils/appStore";
import { EmailSentPage } from "@/pages/EmailSentPage";
import { AuthLoader } from "@/components/AuthLoader";

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <AuthLoader />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/email-sent" element={<EmailSentPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

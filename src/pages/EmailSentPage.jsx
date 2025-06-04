// import { useLocation } from "react-router-dom";

export const EmailSentPage = () => {
  //   const location = useLocation();
  //   const email = location.state?.email || "your email";

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md p-6 bg-white shadow-lg rounded-2xl">
        <h1 className="text-2xl font-bold mb-4 text-green-600">
          Almost there!
        </h1>
        <p className="text-gray-700 mb-2">
          We've sent a verification link to{" "}
          <strong>saimsaaed526@gmail.com</strong>.
        </p>
        <p className="text-gray-600 mb-4">
          Please check your inbox and click the link to verify your account.
        </p>
        <p className="text-sm text-gray-500">
          Didn't receive the email? Check your spam folder or try signing up
          again.
        </p>
      </div>
    </div>
  );
};

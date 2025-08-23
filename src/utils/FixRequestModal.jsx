import React, { useState } from "react";
import { X, Wrench, Send, AlertCircle } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "./constants";
import { toast } from "sonner";

const FixRequestModal = ({ isOpen, onClose, bug, onSubmit }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!message.trim()) {
      setError("Please provide a fix description");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${BASE_URL}/fix-request/send`,
        { bugId: bug._id, message },
        { withCredentials: true }
      );

      toast.success("Fix Request sent successfully");
      setMessage("");
      onClose();
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Failed to submit fix request. Please try again."
      );
      console.error("Error submitting fix request:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setMessage("");
    setError("");
    onClose();
  };

  if (!isOpen || !bug) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl transform animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-6 py-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
                <Wrench className="w-6 h-6 text-white drop-shadow-lg" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white drop-shadow-lg">
                  Submit Fix Request
                </h2>
                <p className="text-white/80 text-sm mt-0.5">
                  Propose a solution for this bug
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 group border border-white/20"
            >
              <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-200" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Bug Reference */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Bug Reference
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">
              {bug.title}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-gray-500">ID:</span>
              <code className="bg-white px-2 py-1 rounded text-xs font-mono text-gray-700 border">
                {bug._id?.slice(-8) || "N/A"}
              </code>
            </div>
          </div>

          {/* Fix Message */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Fix Description
              <span className="text-red-500">*</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (error) setError("");
              }}
              rows={6}
              className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 resize-none bg-white shadow-sm text-gray-900 placeholder-gray-400 ${
                error
                  ? "border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-red-500/20"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              placeholder="Describe your proposed fix:&#10;&#10;• What changes did you make?&#10;• How does this solve the issue?&#10;• Any testing performed?&#10;• Special considerations or risks?"
            />
            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm animate-in slide-in-from-left duration-200">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>Be specific and detailed about your solution</span>
              <span
                className={`${
                  message.length > 50 ? "text-green-600" : "text-gray-400"
                }`}
              >
                {message.length} characters
              </span>
            </div>
          </div>

          {/* Helper Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="p-1 bg-blue-100 rounded-lg flex-shrink-0">
                <AlertCircle className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-blue-900 mb-1">
                  💡 Quick Tips
                </h4>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• Include the root cause you identified</li>
                  <li>• Mention files or components modified</li>
                  <li>• Note any side effects or dependencies</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="cursor-pointer px-5 py-2.5 text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || !message.trim()}
            className="cursor-pointer flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Fix Request
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FixRequestModal;

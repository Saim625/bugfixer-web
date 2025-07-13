import { useState } from "react";
import {
  Bug,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Tag,
  FileText,
  Camera,
} from "lucide-react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { Navigate } from "react-router-dom";

export const ReportBug = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    if (!title.trim() || !description.trim()) {
      setError("Title and Description are required.");
      setIsSubmitting(false);
      return;
    }

    if (files.length > 5) {
      setError("Maximum 5 files allowed.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title),
      formData.append("description", description),
      formData.append("tags", tags);
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    // Simulate API call
    try {
      const res = await axios.post(`${BASE_URL}/create_bug`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Bug reported successfully!");
      setTimeout(() => Navigate("/dashboard"), 1500);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter((file) => {
      const validTypes = [
        "jpg",
        "png",
        "jpeg",
        "pdf",
        "docx",
        "txt",
        "log",
        "zip",
      ];
      return validTypes.some((type) => file.name.toLowerCase().endsWith(type));
    });

    setFiles((prev) => [...prev, ...validFiles].slice(0, 5));
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (fileName) => {
    const ext = fileName.split(".").pop().toLowerCase();
    if (["png", "jpg", "jpeg"].includes(ext))
      return <Camera className="w-4 h-4" />;
    if (["pdf"].includes(ext)) return <FileText className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex justify-center items-start p-4 md:p-6">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <Bug className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Report a Bug
          </h1>
          <p className="text-gray-600">
            Help us improve by reporting any issues you encounter
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 space-y-8 border border-white/20">
          {/* Title Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 font-semibold text-gray-700">
              <FileText className="w-4 h-4" />
              Bug Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none"
              placeholder="Brief description of the bug..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 font-semibold text-gray-700">
              <FileText className="w-4 h-4" />
              Detailed Description <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 h-32 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none resize-none"
              placeholder="Please provide detailed steps to reproduce the bug, expected behavior, and actual behavior..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Tags Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 font-semibold text-gray-700">
              <Tag className="w-4 h-4" />
              Tags (Optional)
            </label>
            <input
              type="text"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none"
              placeholder="e.g., ui, performance, mobile, chrome"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <p className="text-sm text-gray-500">Separate tags with commas</p>
          </div>

          {/* File Upload */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 font-semibold text-gray-700">
              <Upload className="w-4 h-4" />
              Attach Files (Max 5)
            </label>

            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                dragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-sm text-gray-500">
                PNG, JPG, PDF, TXT, DOC up to 10MB each
              </p>
              <input
                type="file"
                multiple
                onChange={(e) => setFiles(Array.from(e.target.files))}
                accept=".png,.jpg,.jpeg,.pdf,.txt,.doc,.docx"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            {/* File Preview */}
            {files.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  Selected Files:
                </p>
                <div className="space-y-2">
                  {Array.from(files).map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      {getFileIcon(file.name)}
                      <span className="text-sm text-gray-700 flex-1">
                        {file.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(1)} MB
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Status Messages */}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-2xl text-green-700">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{success}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-200 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </div>
            ) : (
              "Submit Bug Report"
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Your report helps us improve the platform. Thank you for your
            contribution!
          </p>
        </div>
      </div>
    </div>
  );
};

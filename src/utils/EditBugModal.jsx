import React, { useState, useEffect } from "react";
import { X, Bug, Save, Trash2, Upload, FileText } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const EditBugModal = ({ isOpen, onClose, bug, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "open",
    tags: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (bug) {
      setFormData({
        title: bug.title || "",
        description: bug.description || "",
        status: bug.status || "open",
        tags: bug.tags ? bug.tags.join(", ") : "",
      });
    }
  }, [bug]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const bugData = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      };
      const res = await axios.patch(
        `${BASE_URL}/update_bug/${bug._id}`,
        bugData,
        { withCredentials: true }
      );
      onClose();
    } catch (error) {
      console.error("Error updating bug:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-8 py-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/20">
                <Bug className="w-6 h-6 text-white drop-shadow-lg" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                  Edit Bug Report
                </h2>
                <p className="text-white/80 text-sm mt-1">
                  Update bug details and attachments
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="cursor-pointer p-2 hover:bg-white/20 rounded-xl transition-all duration-200 group border border-white/20"
            >
              <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-200" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)] space-y-8 bg-gradient-to-b from-gray-50/50 to-white">
          {/* Title */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              Bug Title
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 bg-white shadow-sm text-gray-900 placeholder-gray-400 ${
                errors.title
                  ? "border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-red-500/20"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              placeholder="Enter a clear, descriptive bug title..."
            />
            {errors.title && (
              <div className="flex items-center gap-2 text-red-600 text-sm mt-2 animate-in slide-in-from-left duration-200">
                <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                {errors.title}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              Description
              <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 resize-none bg-white shadow-sm text-gray-900 placeholder-gray-400 ${
                errors.description
                  ? "border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-red-500/20"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              placeholder="Describe the bug in detail: steps to reproduce, expected vs actual behavior, environment details..."
            />
            {errors.description && (
              <div className="flex items-center gap-2 text-red-600 text-sm mt-2 animate-in slide-in-from-left duration-200">
                <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                {errors.description}
              </div>
            )}
          </div>

          {/* Status */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 bg-white shadow-sm text-gray-900 hover:border-gray-300"
            >
              <option value="open">🔴 Open</option>
              <option value="in-progress">🟡 In Progress</option>
              <option value="resolved">🟢 Resolved</option>
              <option value="closed">⚫ Closed</option>
            </select>
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 bg-white shadow-sm text-gray-900 placeholder-gray-400 hover:border-gray-300"
              placeholder="ui, frontend, critical, mobile..."
            />
            <p className="text-xs text-gray-500 mt-2">
              Separate tags with commas
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-gray-100 px-8 py-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer px-6 py-3 text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="cursor-pointer flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBugModal;

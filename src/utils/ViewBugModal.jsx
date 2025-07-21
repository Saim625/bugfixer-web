import React from "react";
import {
  X,
  Bug,
  Calendar,
  User,
  Tag,
  FileText,
  Clock,
  AlertCircle,
  CheckCircle,
  Circle,
} from "lucide-react";

const ViewBugModal = ({ isOpen, onClose, bug, onEdit }) => {
  if (!isOpen || !bug) return null;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "open":
        return "bg-red-100 text-red-800 border-red-200";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200";
      case "closed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "open":
        return <AlertCircle className="w-4 h-4" />;
      case "in-progress":
        return <Clock className="w-4 h-4" />;
      case "resolved":
        return <CheckCircle className="w-4 h-4" />;
      case "closed":
        return <Circle className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-8 py-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>

          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-start gap-4 flex-1">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/20 flex-shrink-0">
                <Bug className="w-7 h-7 text-white drop-shadow-lg" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-white drop-shadow-lg truncate">
                    {bug.title}
                  </h1>
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                      bug.status
                    )}`}
                  >
                    {getStatusIcon(bug.status)}
                    {bug.status || "Open"}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-white/80 text-sm">
                  <span className="flex items-center gap-1">
                    <span className="font-medium">ID:</span>
                    <code className="bg-white/20 px-2 py-1 rounded text-xs">
                      {bug._id?.slice(-8) || "N/A"}
                    </code>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={onClose}
                className="cursor-pointer p-2 hover:bg-white/20 rounded-xl transition-all duration-200 group border border-white/20"
              >
                <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex max-h-[calc(90vh-140px)]">
          {/* Main Content */}
          <div className="flex-1 p-8 overflow-y-auto space-y-8 bg-gradient-to-b from-gray-50/50 to-white">
            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
                Description
              </h2>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {bug.description || "No description provided."}
                </p>
              </div>
            </div>

            {/* Tags */}
            {bug.tags && bug.tags.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {bug.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-xl text-sm font-medium border border-indigo-200 hover:shadow-md transition-all duration-200"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Attachments */}
            {bug.files && bug.files.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <div className="w-1 h-6 bg-green-500 rounded-full"></div>
                  Attachments
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    {bug.files.length}
                  </span>
                </h2>
                <div className="grid gap-3">
                  {bug.files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 truncate max-w-xs">
                            {file.originalName || file.name}
                          </h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-80 bg-gray-50 border-l border-gray-200 p-6 overflow-y-auto space-y-6">
            <h3 className="font-semibold text-gray-900 text-lg border-b border-gray-200 pb-3">
              Bug Details
            </h3>

            {/* Metadata */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Created
                  </span>
                </div>
                <p className="text-sm text-gray-900">
                  {formatDate(bug.createdAt)}
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Last Updated
                  </span>
                </div>
                <p className="text-sm text-gray-900">
                  {formatDate(bug.updatedAt)}
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
              <h4 className="font-semibold mb-4">Quick Stats</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-indigo-100">Attachments</span>
                  <span className="font-semibold">
                    {bug.files?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-indigo-100">Tags</span>
                  <span className="font-semibold">{bug.tags?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-indigo-100">Days Open</span>
                  <span className="font-semibold">
                    {bug.createdAt
                      ? Math.ceil(
                          (new Date() - new Date(bug.createdAt)) /
                            (1000 * 60 * 60 * 24)
                        )
                      : 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBugModal;

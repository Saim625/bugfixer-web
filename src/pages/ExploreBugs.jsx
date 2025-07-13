import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import {
  Search,
  Filter,
  Clock,
  User,
  Tag,
  Download,
  Image,
  FileText,
  Eye,
  X,
} from "lucide-react";

export const ExploreBugs = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [openBug, setOpenBug] = useState(null);

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/get_bugs`, {
          withCredentials: true,
        });
        setBugs(res.data.bugs);
        console.log(res.data);
      } catch (err) {
        console.error("Failed to fetch bugs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBugs();
  }, []);

  const filteredBugs = bugs.filter(
    (bug) =>
      bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bug.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (bug.tags &&
        bug.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ))
  );

  const getStatusColor = (status) => {
    if (!status) return "bg-gray-100 text-gray-800 border-gray-200";
    switch (status.toLowerCase()) {
      case "open":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "in-progress":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200";
      case "closed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension)) {
      return <Image className="w-4 h-4" />;
    }
    return <FileText className="w-4 h-4" />;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-xl font-medium text-gray-700">Loading bugs...</p>
          <p className="text-sm text-gray-500 mt-2">
            Fetching the latest reports
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Top Section - Not a header, just content area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg">
              <Search className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Explore Bugs
              </h1>
              <p className="text-gray-600 text-lg mt-1">
                Discover and track reported issues
              </p>
            </div>
          </div>

          <div className="mt-6 lg:mt-0 flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search bugs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-64 shadow-sm"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bug Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredBugs.map((bug) => (
            <div
              key={bug._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col"
            >
              {/* Card Header */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {bug.status && (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          bug.status
                        )}`}
                      >
                        {bug.status}
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {bug.title}
                </h3>
                <div className="mb-4 flex-1">
                  <p className="text-gray-600 text-sm">
                    {`${bug.description.substring(0, 150)}${
                      bug.description.length > 150 ? "..." : ""
                    }`}
                  </p>
                  {bug.description.length > 150 && (
                    <button
                      onClick={() => setOpenBug(bug)}
                      className="cursor-pointer mt-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"
                    >
                      Read More
                    </button>
                  )}
                </div>
                {/* Model */}
                {openBug && (
                  <div className="fixed inset-0 bg-white bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[80vh] overflow-hidden">
                      <div className="flex items-center justify-between p-4 border-b">
                        <h2 className="text-lg font-semibold text-gray-900">
                          {openBug.title}
                        </h2>
                        <button
                          onClick={() => setOpenBug(null)}
                          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <X className="w-5 h-5 text-gray-500" />
                        </button>
                      </div>

                      <div className="p-4 overflow-y-auto">
                        <p className="text-gray-700 whitespace-pre-wrap">
                          {openBug.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tags */}
                {bug.tags && bug.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {bug.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-md flex items-center space-x-1"
                      >
                        <Tag className="w-3 h-3" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                )}
                {/* Files */}
                {bug.files && bug.files.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Attachments ({bug.files.length})
                    </h4>
                    <div className="space-y-2">
                      {bug.files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex-shrink-0">
                            {getFileIcon(file.originalName)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {file.originalName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatDate(file.uploadedAt)}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() =>
                                window.open(file.fileUrl, "_blank")
                              }
                              className="cursor-pointer text-indigo-600 hover:text-indigo-800 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                const link = document.createElement("a");
                                link.href = file.fileUrl;
                                link.download = file.originalName;
                                link.click();
                              }}
                              className="text-gray-600 hover:text-gray-800 transition-colors"
                            >
                              <Download className="cursor-pointer w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {bug.postedBy.firstName} {bug.postedBy.lastName}
                      </p>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(bug.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <button className="cursor-pointers px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
                    Request Fix
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBugs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No bugs found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

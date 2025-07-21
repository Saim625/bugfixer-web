import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { Edit3, Trash2, Eye, Plus, Filter, Search } from "lucide-react";
import ConfirmationPopup from "../utils/ConfirmationPopup";
import EditBugModal from "../utils/EditBugModal";
import ViewBugModal from "../utils/ViewBugModal";

export const ManageBugs = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [bugToDelete, setBugToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [bugToEdit, setBugToEdit] = useState(null);
  const [viewBugModal, setViewBugModal] = useState(false);

  useEffect(() => {
    const fetchUserBugs = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/bugs/my-bugs`, {
          withCredentials: true,
        });
        setBugs(res?.data?.bugs);
        console.log(res);
      } catch (err) {
        console.error("Error fetching user's bugs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserBugs();
  }, []);

  const confirmDelete = (bugId) => {
    setBugToDelete(bugId);
    setShowConfirmPopup(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!bugToDelete) return;

    setDeleteLoading(bugToDelete);
    setShowConfirmPopup(false);

    try {
      await axios.delete(`${BASE_URL}/delete_bug/${bugToDelete}`, {
        withCredentials: true,
      });
      setBugs((prev) => prev.filter((bug) => bug._id !== bugToDelete));
    } catch (err) {
      console.error("Error deleting bug:", err);
      alert("Failed to delete bug. Please try again.");
    } finally {
      setDeleteLoading(null);
      setBugToDelete(null);
    }
  };

  const handleViewDetails = (bugId) => {
    // Navigate to bug details or open modal
    setViewBugModal(true);
    console.log("View bug details:", bugId);
  };

  const filteredBugs = bugs.filter((bug) => {
    const matchesSearch =
      bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bug.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || bug.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-700 border-red-200";
      case "in-progress":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "resolved":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">
            Loading your bugs...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Manage Your Bugs
          </h1>
          <p className="text-gray-600">
            Track, edit, and resolve your reported issues
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search bugs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            {/* Add New Bug Button */}
            <button className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-700 to-purple-700 text-white  rounded-lg">
              <Plus className="w-4 h-4" />
              Report New Bug
            </button>
          </div>
        </div>

        {/* Bug Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bugs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {bugs.length}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open</p>
                <p className="text-2xl font-bold text-red-600">
                  {bugs.filter((bug) => bug.status === "open").length}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <div className="w-6 h-6 bg-red-600 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-green-600">
                  {bugs.filter((bug) => bug.status === "resolved").length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <div className="w-6 h-6 bg-green-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bug Cards */}
        {filteredBugs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🐛</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {searchTerm || statusFilter !== "all"
                ? "No bugs match your filters"
                : "No bugs reported yet"}
            </h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Start by reporting your first bug"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBugs.map((bug) => (
              <div
                key={bug._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 group"
              >
                {/* Bug Header */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1 mr-2">
                    {bug.title}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full border font-medium ${getStatusColor(
                      bug.status
                    )}`}
                  >
                    {bug.status.toUpperCase()}
                  </span>
                </div>
                {/* Bug Description */}
                <p className="text-gray-600 line-clamp-3 mb-4 text-sm leading-relaxed">
                  {bug.description}
                </p>
                {/* Bug Meta Info */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>ID: {bug._id.slice(-6)}</span>
                  <span>{new Date(bug.createdAt).toLocaleDateString()}</span>
                </div>
                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      handleViewDetails(bug._id);
                      setBugToEdit(bug);
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => {
                      setShowEditModal(true);
                      setBugToEdit(bug);
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(bug._id)}
                    disabled={deleteLoading === bug._id}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {deleteLoading === bug._id ? (
                      <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ConfirmationPopup
        isOpen={showConfirmPopup}
        onClose={() => setShowConfirmPopup(false)}
        onConfirm={handleDeleteConfirmed}
        title="Delete Bug"
        message="Are you sure you want to delete this bug? This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="Cancel"
        type="danger"
      />
      <EditBugModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        bug={bugToEdit}
      />
      <ViewBugModal
        isOpen={viewBugModal}
        bug={bugToEdit}
        onClose={() => setViewBugModal(false)}
      />
      ;
    </div>
  );
};

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash, FaChevronDown, FaChevronUp, FaSync } from 'react-icons/fa';

const LeadList = ({ leads, onEdit, onDelete, onRefresh }) => {
  const [expandedLead, setExpandedLead] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const toggleExpand = (leadId) => {
    setExpandedLead(expandedLead === leadId ? null : leadId);
  };

  const handleEdit = (lead) => {
    onEdit(lead);
    toast.info("Edit lead opened");
  };

  const handleDelete = (leadId) => {
    onDelete(leadId);
    toast.success("Lead deleted");
  };

  const handleRefresh = () => {
    onRefresh();
    toast("Lead list refreshed");
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone?.includes(searchTerm) ||
      lead.city?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = ['All', 'New', 'Contacted', 'Qualified', 'Converted'];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Header with Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">All Leads</h2>
          <p className="text-gray-600 text-sm mt-1">
            Showing {filteredLeads.length} of {leads.length} leads
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {statusOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition duration-200"
          >
            <FaSync /> Refresh
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left border-b">Name</th>
              <th className="p-3 text-left border-b">Email</th>
              <th className="p-3 text-left border-b">Phone</th>
              <th className="p-3 text-left border-b">City</th>
              <th className="p-3 text-left border-b">Status</th>
              <th className="p-3 text-left border-b">Source</th>
              <th className="p-3 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-600">
                  No leads found
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <React.Fragment key={lead._id}>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3 border-b">{lead.name}</td>
                    <td className="p-3 border-b">{lead.email || 'N/A'}</td>
                    <td className="p-3 border-b">{lead.phone}</td>
                    <td className="p-3 border-b">{lead.city || 'N/A'}</td>
                    <td className="p-3 border-b">{lead.status}</td>
                    <td className="p-3 border-b">{lead.source}</td>
                    <td className="p-3 border-b flex items-center gap-3">
                      <button
                        onClick={() => handleEdit(lead)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(lead._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                      <button
                        onClick={() => toggleExpand(lead._id)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        {expandedLead === lead._id ? <FaChevronUp /> : <FaChevronDown />}
                      </button>
                    </td>
                  </tr>

                  {/* Expanded Row */}
                  {expandedLead === lead._id && (
                    <tr>
                      <td colSpan="7" className="p-4 bg-gray-50 text-gray-700">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                          <p><strong>Qualification:</strong> {lead.qualification || 'N/A'}</p>
                          <p><strong>Passout:</strong> {lead.passout || 'N/A'}</p>
                          <p><strong>Interests:</strong> {lead.interests || 'N/A'}</p>
                          <p className="md:col-span-2"><strong>Message:</strong> {lead.message || 'N/A'}</p>
                          <p className="text-xs text-gray-500">Lead ID: {lead._id}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadList;

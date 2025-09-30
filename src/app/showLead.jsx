import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import LeadForm from "./leadForm";

const LeadsTable = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    passout: "",
    status: "New",
    source: "Website",
    qualification: "",
    interests: "",
    message: "",
  });

  const [filters, setFilters] = useState({
    name: "",
    status: "",
    source: "",
    city: "",
  });

  const fetchLeads = async () => {
    try {
      const res = await axios.get("https://taskbackend-production-6cae.up.railway.app/api/leads/getLeads");
      setLeads(res.data.leads);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editingLead) {
        response = await fetch(
          `https://taskbackend-production-6cae.up.railway.app/api/leads/updateLead/${editingLead._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );
      } else {
        response = await fetch("https://taskbackend-production-6cae.up.railway.app/api/leads/createLead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          if (data.errors.name) toast.error(data.errors.name);
          if (data.errors.email) toast.error(data.errors.email);
          if (data.errors.phone) toast.error(data.errors.phone);
        } else {
          toast.error(data.message || "Something went wrong");
        }
        return;
      }

      toast.success(editingLead ? "Lead updated successfully!" : "Lead added successfully!");
      fetchLeads();
      setShowForm(false);
      setEditingLead(null);
      setFormData({
        name: "",
        phone: "",
        email: "",
        city: "",
        state: "",
        passout: "",
        status: "New",
        source: "Website",
        qualification: "",
        interests: "",
        message: "",
      });
    } catch (err) {
      toast.error("Server error. Please try again.");
    }
  };

  const handleEdit = (lead) => {
    setEditingLead(lead);
    setFormData(lead);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        await axios.delete(`https://taskbackend-production-6cae.up.railway.app/api/leads/deleteLead/${id}`);
        setLeads(leads.filter((lead) => lead._id !== id));
        toast.success("Lead deleted successfully!");
      } catch (error) {
        console.error("Error deleting lead:", error);
        toast.error("Failed to delete lead");
      }
    }
  };

  // for filter 
  const filteredLeads = leads.filter((lead) => {
    return (
      lead.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      (filters.status === "" || lead.status === filters.status) &&
      (filters.source === "" || lead.source === filters.source) &&
      (filters.city === "" || lead.city.toLowerCase().includes(filters.city.toLowerCase()))
    );
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-600">Lead Management Module</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add Lead
        </button>
      </div>

      {/* filters code */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          name="name"
          placeholder="Search by Name"
          value={filters.name}
          onChange={handleFilterChange}
          className="border rounded-lg px-3 py-2 w-full sm:w-1/4"
        />

        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="border rounded-lg px-3 py-2 w-full sm:w-1/4"
        >
          <option value="">All Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Interested">Interested</option>
          <option value="Not Interested">Not Interested</option>
          <option value="Enrolled">Enrolled</option>
        </select>

        <select
          name="source"
          value={filters.source}
          onChange={handleFilterChange}
          className="border rounded-lg px-3 py-2 w-full sm:w-1/4"
        >
          <option value="">All Sources</option>
          <option value="Website">Website</option>
          <option value="Referral">Referral</option>
          <option value="Walk-in">Walk-in</option>
          <option value="Social Media">Social Media</option>
        </select>

        <input
          type="text"
          name="city"
          placeholder="Filter by City"
          value={filters.city}
          onChange={handleFilterChange}
          className="border rounded-lg px-3 py-2 w-full sm:w-1/4"
        />
      </div>

      {/* table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Contact</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Qualification</th>
              <th className="px-4 py-3 text-left">Interest</th>
              <th className="px-4 py-3 text-left">Source</th>
              <th className="px-4 py-3 text-left">City</th>
              <th className="px-4 py-3 text-center">Message</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm divide-y">
            {loading ? (
              <tr>
                <td colSpan="10" className="text-center py-4 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
                <tr key={lead._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-blue-600">{lead.name}</td>
                  <td className="px-4 py-3">{lead.phone}</td>
                  <td className="px-4 py-3">{lead.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        lead.status === "Qualified"
                          ? "bg-green-100 text-green-700"
                          : lead.status === "Not Interested"
                          ? "bg-orange-100 text-orange-700"
                          : lead.status === "Contacted"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{lead.qualification || "—"}</td>
                  <td className="px-4 py-3">{lead.interests || "—"}</td>
                  <td className="px-4 py-3">{lead.source}</td>
                  <td className="px-4 py-3">{lead.city || "—"} {lead.state || "—"}</td>
                  <td className="px-4 py-3" title={lead.message}>
                    {lead.message || "—"}
                  </td>
                  <td className="px-4 py-3 flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(lead)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(lead._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-6 text-gray-400">
                  No leads found 
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
            
     {/* form */}
      {showForm && (
        <LeadForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setShowForm={setShowForm}
          setEditingLead={setEditingLead}
          editingLead={editingLead}
          
        />
      )}
    </div>
  );
};

export default LeadsTable;



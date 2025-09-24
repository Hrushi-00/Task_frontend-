// App.js
import React, { useState, useEffect } from 'react';
import LeadForm from './app/lead';
import LeadList from './app/showLead';

const App = () => {
  const [leads, setLeads] = useState([]);
  const [editingLead, setEditingLead] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch all leads
  const fetchLeads = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/leads/getLeads');
      const data = await response.json();
      setLeads(data.leads);
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Create new lead
  const createLead = async (leadData) => {
    try {
      const response = await fetch('http://localhost:5000/api/leads/createLead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });
      
      if (response.ok) {
        fetchLeads();
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error creating lead:', error);
    }
  };

  // Update lead
  const updateLead = async (id, leadData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/leads/updateLead/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });
      
      if (response.ok) {
        fetchLeads();
        setEditingLead(null);
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  // Delete lead
  const deleteLead = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/leads/deleteLead/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          fetchLeads();
        }
      } catch (error) {
        console.error('Error deleting lead:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Lead Management</h1>
              <p className="text-gray-600 mt-2">Manage your leads effectively</p>
            </div>
            <button
              onClick={() => {
                setEditingLead(null);
                setShowForm(true);
              }}
              className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200"
            >
              + Add New Lead
            </button>
          </div>
        </div>

        {/* Lead Form */}
        {showForm && (
          <div className="mb-6">
            <LeadForm
              lead={editingLead}
              onSubmit={editingLead ? updateLead : createLead}
              onCancel={() => {
                setShowForm(false);
                setEditingLead(null);
              }}
            />
          </div>
        )}

        {/* Lead List */}
        <LeadList
          leads={leads}
          onEdit={(lead) => {
            setEditingLead(lead);
            setShowForm(true);
          }}
          onDelete={deleteLead}
          onRefresh={fetchLeads}
        />
      </div>
    </div>
  );
};

export default App;
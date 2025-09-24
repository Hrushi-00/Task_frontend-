
import React from "react";
const LeadForm = ({
  formData,
  handleChange,
  handleSubmit,
  setShowForm,
  setEditingLead,
  editingLead,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center px-4 py-6 overflow-auto">
  <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg sm:max-w-2xl md:max-w-3xl overflow-y-auto">
    <h2 className="text-xl font-semibold mb-4">
      {editingLead ? "Edit Lead" : "Add Lead"}
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border rounded-lg px-3 py-2"
          required
        />

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full border rounded-lg px-3 py-2"
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full border rounded-lg px-3 py-2 sm:col-span-2"
          required
        />

        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="State"
          className="w-full border rounded-lg px-3 py-2"
        />

        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full border rounded-lg px-3 py-2"
          required
        />

        <input
          type="text"
          name="passout"
          value={formData.passout}
          onChange={handleChange}
          placeholder="Passout Year"
          className="w-full border rounded-lg px-3 py-2"
          required
        />

        {/* <input
          type="text"
          name="qualification"
          value={formData.qualification}
          onChange={handleChange}
          placeholder="Qualification"
          className="w-full border rounded-lg px-3 py-2"
          required
        /> */}
        <select name="qualification" id="" value={formData.qualification} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" required>
          <option value="">Select Qualification</option>
          <option value="Bachelors">Bachelors</option>
          <option value="Masters">Masters</option>
          <option value="PhD">PhD</option>
        </select>
        <input
          type="text"
          name="interests"
          value={formData.interests}
          onChange={handleChange}
          placeholder="Interests"
          className="w-full border rounded-lg px-3 py-2"
          required
        />
        <label htmlFor="status">Status:
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
          required
        >
          <option value="New">New</option>
          <option value="Qualified">Qualified</option>
          <option value="Contacted">Contacted</option>
          <option value="Interested">Interested</option>
          <option value="Not Interested">Not Interested</option>
          <option value="Enrolled">Enrolled</option>
        </select>
        </label>
      <label htmlFor="source">Source:
        <select
          name="source"
          value={formData.source}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
          required
        >
          <option value="Website">Website</option>
          <option value="Referral">Referral</option>
          <option value="Walk-in">Walk-in</option>
          <option value="Social Media">Social Media</option>
        </select>
        </label>
      </div>

      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
        className="w-full border rounded-lg px-3 py-2"
        rows={3}
      ></textarea>

      <div className="flex justify-end gap-2 mt-4">
        <button
          type="button"
          onClick={() => {
            setShowForm(false);
            setEditingLead(null);
          }}
          className="px-4 py-2 border rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {editingLead ? "Update" : "Save"  }
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default LeadForm;

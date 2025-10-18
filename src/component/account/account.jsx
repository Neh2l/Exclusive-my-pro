import React, { useState } from "react";
import "./account.css";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    alert("Changes canceled");
  };

  const handleSaveChanges = () => {
    if (formData.newPassword !== formData.confirmNewPassword) {
      alert("New passwords do not match!");
      return;
    }
    alert("Changes saved!");
  };

  return (
    <div className="account-container">
      <aside className="sidebar">
        <h4 className="sidebar-title">Manage My Account</h4>
        <ul>
          <li>
            <a href="#">My Profile</a>
          </li>
          <li>
            <a href="#">Address Book</a>
          </li>
          <li>
            <a href="#">My Payment Options</a>
          </li>
        </ul>

        <h4 className="sidebar-title">My Orders</h4>
        <ul>
          <li>
            <a href="#">My Returns</a>
          </li>
          <li>
            <a href="#">My Cancellations</a>
          </li>
        </ul>

        <h4 className="sidebar-title">My Wishlist</h4>
      </aside>

      <div className="edit-profile-container">
        <h3>Edit Your Profile</h3>
        <form>
          <div className="input-row">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
          <h4>Password Changes</h4>
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={formData.currentPassword}
            onChange={handleChange}
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmNewPassword"
            placeholder="Confirm New Password"
            value={formData.confirmNewPassword}
            onChange={handleChange}
          />
          <div className="btn-group">
            <button type="button" onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveChanges}
              className="save-btn"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;

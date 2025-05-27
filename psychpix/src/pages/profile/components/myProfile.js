import React, { useState, useEffect } from "react";
import userPlaceholder from "../assets/userPlaceholder.jpg"; // Placeholder image for user profile

const MyProfile = () => {
  // State for user info
  const [user, setUser] = useState({
    username: "",
    email: "",
    profilePic: "",
  });
  // State for edit mode
  const [editMode, setEditMode] = useState(false);
  // State for form fields
  const [form, setForm] = useState({
    username: "",
    profilePic: null,
  });
  // State for previewing new profile pic
  const [previewPic, setPreviewPic] = useState("");
  // State for loading and error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user info on mount (replace with your auth/user context or API)
  useEffect(() => {
    // Example: fetch user info from backend
    const fetchUser = async () => {
      setLoading(true);
      try {
        // Replace with your actual API endpoint and auth
        const res = await fetch("http://localhost:5000/api/users/me", {
          credentials: "include", // or send token in headers
        });
        if (!res.ok) throw new Error("Failed to fetch user info");
        const data = await res.json();
        setUser(data);
        setForm({ username: data.username, profilePic: null });
        setPreviewPic(data.profilePic || "");
      } catch (err) {
        setError("Could not load profile.");
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle profile pic change
  const handlePicChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, profilePic: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewPic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle save profile
  const handleSave = async () => {
    setError("");
    const formData = new FormData();
    formData.append("username", form.username);
    if (form.profilePic) {
      formData.append("profilePic", form.profilePic);
    }
    try {
      // Replace with your actual API endpoint and auth
      const res = await fetch("http://localhost:5000/api/users/me", {
        method: "PUT",
        body: formData,
        credentials: "include", // or send token in headers
      });
      if (!res.ok) throw new Error("Failed to update profile");
      const data = await res.json();
      setUser(data);
      setEditMode(false);
      setPreviewPic(data.profilePic || "");
    } catch (err) {
      setError("Could not save changes.");
    }
  };

  if (loading) return <div>Loading profile...</div>;

  return (
    <div className="profile-container" style={{ maxWidth: 500, margin: "40px auto", padding: 24, background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px #0001" }}>
      <h2 style={{ textAlign: "center" }}>My Profile</h2>
      {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
      <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 24 }}>
        <img
          src={previewPic || user.profilePic || userPlaceholder}
          alt="Profile"
          style={{ width: 100, height: 100, borderRadius: "50%", objectFit: "cover", border: "2px solid #1976d2" }}
        />
        <div>
          {editMode ? (
            <>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                style={{ fontSize: 20, marginBottom: 8, padding: 4 }}
              />
              <br />
              <input
                type="file"
                accept="image/*"
                onChange={handlePicChange}
                style={{ marginTop: 8 }}
              />
              <br />
              <button className="auth-button" onClick={handleSave} style={{ marginTop: 10 }}>Save</button>
              <button className="auth-button" onClick={() => setEditMode(false)} style={{ marginLeft: 8, marginTop: 10, background: "#aaa" }}>Cancel</button>
            </>
          ) : (
            <>
              <div style={{ fontSize: 22, fontWeight: "bold" }}>{user.username}</div>
              <div style={{ color: "#555" }}>{user.email}</div>
              <button className="auth-button" onClick={() => setEditMode(true)} style={{ marginTop: 10 }}>Edit Profile</button>
            </>
          )}
        </div>
      </div>

      {/* Placeholder for comment history */}
      <div style={{ marginTop: 32 }}>
        <h3>Comment History</h3>
        <div style={{ color: "#888", fontStyle: "italic" }}>
          {/* Replace this with actual comment data when available */}
          No comments yet.
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
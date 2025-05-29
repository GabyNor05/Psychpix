import React, { useState, useEffect } from "react";
import Profile1 from "../assets/userprofile/profile1.jpg";
import Profile2 from "../assets/userprofile/profile2.png";
import Profile3 from "../assets/userprofile/profile3.png";
import Profile4 from "../assets/userprofile/profile4.webp";
import Profile5 from "../assets/userprofile/profile5.jpg";
import Profile6 from "../assets/userprofile/profile6.jpg";
import Profile7 from "../assets/userprofile/profile7.webp";
import Profile8 from "../assets/userprofile/profile8.jpg";
import "../css/Profile.css";

const profileImages = [
  Profile1,
  Profile2,
  Profile3,
  Profile4,
  Profile5,
  Profile6,
  Profile7,
  Profile8,
];

const MyProfile = () => {
  // State for user info
  const [user, setUser] = useState({
    username: "",
    email: "",
    profilePic: "",
    role: "", // Add role to state
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

  // Fetch user info on mount
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const username = localStorage.getItem("username");
        if (!username) throw new Error("No username found in localStorage");
        const res = await fetch(`http://localhost:5000/api/users/me?username=${encodeURIComponent(username)}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch user info");
        const data = await res.json();
        setUser(data); // Make sure data includes role
        setForm({ username: data.username, profilePic: null });
        setPreviewPic(data.profilePic || "");
      } catch (err) {
        setError("Could not load profile.");
        console.error(err);
      }
      setLoading(false);
    };
    fetchUser();
    // eslint-disable-next-line
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
    try {
      const res = await fetch(`http://localhost:5000/api/users/me?username=${encodeURIComponent(user.username)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newUsername: form.username,
          profilePic: form.profilePic, // <-- send the selected image
        }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update profile");
      const data = await res.json();
      setUser(data);
      setEditMode(false);
      setPreviewPic(data.profilePic || "");
    } catch (err) {
      setError("Could not save changes.");
      console.error(err);
    }
  };

  // Add this function inside your MyProfile component:
  const handleCancel = () => {
    setEditMode(false);
    setForm({ username: user.username, profilePic: user.profilePic });
    setPreviewPic(user.profilePic || "");
  };

  if (loading) return <div className="profile-loading">Loading profile...</div>;

  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>
      {error && <div className="profile-error">{error}</div>}
      <div className="profile-header">
        <img
          className="profile-avatar"
          src={previewPic || user.profilePic || Profile1}
          alt="Profile"
        />
        <div className="profile-details">
          {editMode ? (
            <>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="profile-input"
                placeholder="Username"
              />
              <br />
              <div className="profile-pic-select">
                <div>Select a profile image:</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "8px 0" }}>
                  {profileImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Profile option ${idx + 1}`}
                      className={`profile-avatar${form.profilePic === img ? " selected" : ""}`}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        border: form.profilePic === img ? "2px solid #1976d2" : "2px solid #ccc",
                        cursor: "pointer",
                        objectFit: "cover",
                      }}
                      onClick={() => {
                        setForm({ ...form, profilePic: img });
                        setPreviewPic(img);
                      }}
                    />
                  ))}
                </div>
              </div>
              <button className="auth-button" onClick={handleSave}>Save</button>
              <button className="auth-button cancel" onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <>
              <div className="profile-username">{user.username}</div>
              <div className="profile-email">{user.email}</div>
              <div className="profile-userid">User ID: {user._id}</div>
              <div className="profile-role">Role: {user.role || "customer"}</div>
              <button className="auth-button" onClick={() => setEditMode(true)}>Edit Profile</button>
              <button
                className="auth-button cancel"
                style={{ marginTop: 12 }}
                onClick={() => {
                  localStorage.removeItem("userRole");
                  localStorage.removeItem("token");
                  localStorage.removeItem("username");
                  window.location.href = "/login";
                }}
              >
                Log out
              </button>
            </>
          )}
        </div>
      </div>

      <div className="profile-comments">
        <h3>Comment History</h3>
        <div className="profile-comments-history">
          {/* Replace this with actual comment data when available */}
          No comments yet.
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
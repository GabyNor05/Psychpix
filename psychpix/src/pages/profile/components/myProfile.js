import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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

const MyProfile = ({ user, ...props }) => {
  const navigate = useNavigate();
  const [userState, setUser] = useState(user);
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
  const [userComments, setUserComments] = useState([]);

  const handleSelect = (item) => {
      navigate('/singleItem', { state: { selectedItem: item } });
  };

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
        toast.error("Could not load profile.");
        console.error(err);
      }
      setLoading(false);
    };
    fetchUser();
    // eslint-disable-next-line
  }, []);

  // Only use sessionStorage for user data
  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Fetch user comments when user is loaded
  useEffect(() => {
    if (!userState || !(userState.id || userState._id)) return;
    const fetchComments = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/comments");
        if (!res.ok) throw new Error("Failed to fetch comments");
        const allComments = await res.json();
        // Filter comments by userId (either id or _id)
        const filtered = allComments.filter(
          (c) => c.userId === (userState.id || userState._id)
        );
        setUserComments(filtered);
      } catch (err) {
        setUserComments([]);
        toast.error("Could not load comments.");
      }
    };
    fetchComments();
  }, [userState]);

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
      const res = await fetch(`http://localhost:5000/api/users/me?username=${encodeURIComponent(userState.username)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newUsername: form.username,
          profilePic: form.profilePic,
        }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update profile");
      const data = await res.json();
      setUser(data);
      setEditMode(false);
      setPreviewPic(data.profilePic || "");
      // Update sessionStorage and localStorage with new user data
      sessionStorage.setItem("user", JSON.stringify({
        username: data.username,
        role: data.role,
        email: data.email,
        id: data._id || data.id,
        profilePic: data.profilePic || ""
      }));
      localStorage.setItem("username", data.username);
      // Notify other components (like Navbar) that user data changed
      window.dispatchEvent(new Event("user-profile-updated"));
      toast.success("Profile updated successfully.");
    } catch (err) {
      toast.error("Could not save changes.");
      console.error(err);
    }
  };

  // Add this function inside your MyProfile component:
  const handleCancel = () => {
    setEditMode(false);
    setForm({ username: userState.username, profilePic: userState.profilePic });
    setPreviewPic(userState.profilePic || "");
  };

  // If no user is logged in
  if (!userState || !userState.username) {
    return (
      <div className="profile-container" style={{ textAlign: "center", padding: "60px 0" }}>
        <h2>You are not logged in</h2>
        <p>Please log in to view your profile.</p>
        <button
          className="auth-button"
          style={{ marginTop: 20, padding: "10px 30px", fontSize: "18px" }}
          onClick={() => navigate("/login")}
        >
          Log In
        </button>
      </div>
    );
  }

  if (!userState) return <div className="profile-loading">Loading profile...</div>;

  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>
      {/* {error && <div className="profile-error">{error}</div>} */}
      <div className="profile-header">
        <img
          className="profile-avatar"
          src={previewPic || userState.profilePic || Profile1}
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
              <div className="profile-username">{userState.username}</div>
              <div className="profile-email">{userState.email}</div>
              <div className="profile-userid">User ID: {userState.id || userState._id}</div>
              <div className="profile-role">{userState.role || "customer"}</div>
              <button className="auth-button" onClick={() => userState.username === "Guest"? '' : setEditMode(true)}>Edit Profile</button>
              {/* Removed Log out and Admin Form buttons */}
            </>
          )}
        </div>
      </div>

      <div className="profile-comments">
        <h3>Comment History</h3>
        <div className="profile-comments-history">
          {userComments.length === 0 ? (
            <>No comments yet.</>
          ) : (
            userComments.map((comment) => (
              <div key={comment._id} className="profile-comment-item">
                <img
                  className="CommentProfilePic"
                  src={comment.profilePic || Profile1}
                  alt="Profile"
                />
                <div className="profile-comment-item-details">
                  <div className="comment-username">{comment.username || "Unknown"}</div>
                  <div>{comment.comment}</div>
                  <div className="comment-timestamp">
                    {comment.timestamp || ""}
                  </div>
                  <div className="comment-rating">
                    Rating: {comment.rating}
                  </div>
                  {(comment.itemTitle || comment.itemImageUrl) && (
                    <div className="comment-item-wrapper" onClick={() => handleSelect(comment.itemId)} style={{ position: 'relative'}}>
                      <div className="comment-product-container">
                      {comment.itemImageUrl && (
                        <div className="comment-item-image">
                          <img
                            src={comment.itemImageUrl}
                            alt={comment.itemTitle || "Product"}
                          />
                        </div>
                      )}
                      {comment.itemTitle && (
                        <div className="comment-item-title">
                          Product: {comment.itemTitle}
                        </div>
                      )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
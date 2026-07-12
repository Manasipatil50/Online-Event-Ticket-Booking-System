import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/users/profile"); // GET profile
      setUser(res.data);
      setFormData({
        name: res.data.name || "",
        email: res.data.email || "",
        phone: res.data.phone || ""
      });
    } catch {
      alert("Unauthorized");
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpdate = async () => {
    try {
      const data = new FormData();
data.append("name", formData.name);
data.append("phone", formData.phone);
if (image) data.append("profilePic", image);

await API.put("/users/profile", data, {
  headers: { "Content-Type": "multipart/form-data" }
});

      alert("Profile Updated");
      setEditMode(false);
      fetchProfile();
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">

        {user && (
          <>
            {/* HEADER */}
            <div className="profile-header">
              <div className="avatar">
                {user.profilePic ? (
<img src={`http://localhost:8080/${encodeURIComponent(user.profilePic)}`} alt="avatar" />                ) : (
                  user.name?.charAt(0).toUpperCase()
                )}
              </div>

              {editMode && (
                <input type="file" onChange={handleImageChange} />
              )}

              <h2>{user.name}</h2>
              <p className="role">{user.role || "User"}</p>
              
            </div>

            {/* BODY */}
            <div className="profile-body">
              {["name", "email", "phone"].map((field) => (
                <div className="field" key={field}>
                  <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  {editMode ? (
                    <input
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{user[field] || "Not Available"}</p>
                  )}
                </div>
              ))}
            </div>

            {/* BUTTONS */}
            <div className="profile-actions">
              {editMode ? (
                <>
                  <button className="save" onClick={handleUpdate}>
                    Save
                  </button>
                  <button className="cancel" onClick={() => setEditMode(false)}>
                    Cancel
                  </button>
                </>
              ) : (
                <button className="edit" onClick={() => setEditMode(true)}>
                  Edit Profile
                </button>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default Profile; 
import React, { useState } from "react";
import "./css/Profile.css";
import MyProfile from "./components/myProfile"; 

function Profile() {
    return (
        <div className="profile-page-viewport">
            <MyProfile />
        </div>
    );

}

export default Profile;
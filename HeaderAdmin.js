import React, { useState, useEffect } from "react";
import api from "../api";
import BACKEND_URL from "../backendURL";

const HeaderAdmin = () => {
  const [searchText, setSearchText] = useState("");
  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    if (searchText.toLowerCase() === "bootcamp") {
      window.location.href = "/BootcampList";
    } else if (searchText.toLowerCase() === "internship") {
      window.location.href = "/InternshipList";
    } else if (searchText.toLowerCase() === "dashboard") {
      window.location.href = "/PublisherDashboard";
    } else if (searchText.toLowerCase() === "publish") {
      window.location.href = "/Publish";
    } else if (searchText.toLowerCase() === "upload") {
      window.location.href = "/PublisherUpload";
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // admin data
  const [adminData, setAdminData] = useState({
    name: "",
    firstName: "",
    lastName: "",
    profileImage: "",
    role: "",
  });

  const token = localStorage.getItem("token");

  // get data admin
  const getAdminData = async () => {
    await api
      .get("/v1/ser/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);

        setAdminData(res.data.data);
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  useEffect(() => {
    getAdminData();
  }, []);

  return (
    <header>
      <div className="logo">
        <img
          src={process.env.PUBLIC_URL + "/assets/logo.png"}
          alt="logo-sertifica"
        />
      </div>
      <div className="search">
        <input
          type="search"
          placeholder="Search"
          value={searchText}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
      </div>

      <div className="Alogo">
        <p>{adminData.firstName}</p>
        <img
          src={`${BACKEND_URL}${adminData.profileImage}`}
          alt={adminData.firstName}
        />
      </div>
    </header>
  );
};

export default HeaderAdmin;

import React, { useState, useEffect } from "react";
import api from "../api";
import BACKEND_URL from "../backendURL";

const Header = () => {
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

  // user data
  const [userData, setUserData] = useState({
    name: "",
    firstName: "",
    lastName: "",
    profileImage: "",
    role: "",
  });

  const token = localStorage.getItem("token");

  // get data user
  const getDataUser = async () => {
    await api
      .get("/v1/ser/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);

        const { data } = res.data;

        setUserData({
          name: data.firstName,
          firstName: data.firstName,
          lastName: data.lastName,
          profileImage: data.profileImage,
          role: data.role,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDataUser();
  }, []);

  return userData.role === "Publisher" ? (
    <header>
      <div className="logo">
        <img
          src={`${process.env.PUBLIC_URL}/assets/logo.png`}
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

      <div className="Plogo">
        {userData.lastName === "" ? (
          <p>{userData.firstName}</p>
        ) : (
          <p>
            {userData.firstName} {userData.lastName}
          </p>
        )}

        <img
          src={`${BACKEND_URL}${userData.profileImage}`}
          alt={userData.firstName}
        />
      </div>
    </header>
  ) : (
    <header>
      <div className="logo">
        <img
          src={`${process.env.PUBLIC_URL}/assets/logo.png`}
          alt="logo-sertifica"
        />
      </div>
      <div className="search">
        <input type="search" id="search" placeholder="Search" name="search" />
        {/* <img
        src={process.env.PUBLIC_URL + "/assets/search.png"}
        alt="search"
      /> */}
      </div>

      <div className="Clogo">
        <h7>{userData.firstName}</h7>
        <img
          src={`${BACKEND_URL}${userData.profileImage}`}
          alt={userData.firstName}
        />
      </div>
    </header>
  );
};

export default Header;

import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

import api from "../api";
import BACKEND_URL from "../backendURL";

const Sidebar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [isOpen, setIsOpen] = useState(false);

  // user data
  const [userData, setUserData] = useState({
    name: "",
    firstName: "",
    lastName: "",
    profileImage: "",
    role: "",
  });

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    await api.get("/v1/ser/users/signOut").then((res) => {
      console.log(res.data);
      const { token } = res.data;
      localStorage.removeItem("token", token);
      navigate("/LandingPage");
    });
  };

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

  return (
    <div>
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <button className="hamburger" onClick={toggleSidebar}>
          {isOpen ? <MdClose /> : <FaBars />}
        </button>
        <nav className={`menu ${isOpen ? "show-menu" : ""}`}>
          {isOpen && (
            <section className="Role">
              <img
                src={`${BACKEND_URL}${userData.profileImage}`}
                alt={userData.firstName}
              />
              <p>{userData.firstName}</p>
              <h8>{userData.role}</h8>
            </section>
          )}
          {userData.role === "Publisher" ? (
            <>
              <section className="Sidedashboard">
                <p>
                  <Link
                    to="/PublisherDashboard"
                    style={{
                      textDecoration: "none",
                      fontWeight: "bold",
                      color: "white",
                      fontFamily: "Arial, Helvetica, sans-serif",
                      fontSize: "20px",
                    }}
                  >
                    Dashboard
                  </Link>
                </p>
              </section>
              <section className="Sidepublish">
                <p>
                  <Link
                    to="/Publish"
                    style={{
                      textDecoration: "none",
                      fontWeight: "bold",
                      color: "white",
                      fontFamily: "Arial, Helvetica, sans-serif",
                      fontSize: "20px",
                    }}
                  >
                    Publish
                  </Link>
                </p>
              </section>
            </>
          ) : (
            <section className="Sidedashboard">
              <p>
                <Link
                  to="/PublisherDashboard"
                  style={{
                    textDecoration: "none",
                    fontWeight: "bold",
                    color: "white",
                    fontFamily: "Arial, Helvetica, sans-serif",
                    fontSize: "20px",
                  }}
                >
                  Dashboard
                </Link>
              </p>
            </section>
          )}

          <section className="SideLogout">
            <p>
              <Link
                onClick={() => handleSignOut()}
                style={{
                  textDecoration: "none",
                  fontWeight: "thin",
                  color: "white",
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontSize: "20px",
                }}
              >
                Logout
              </Link>
            </p>
          </section>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

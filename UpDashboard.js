import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../Component/CategoryPopup.css";

import api from "../api";

const UpDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [msg, setMsg] = useState("");
  const [msgPopup, setMsgPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showEditDeleteOptions, setShowEditDeleteOptions] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  // const handleEditCategory = (category) => {
  //   setSelectedCategory(category);
  //   setShowPopup(true);
  // };
  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setShowEditDeleteOptions(true);
  };

  const handleDeleteCategory = (categoryId) => {
    // Implement logic to delete the category with the given categoryId
    // You can use the `categories` state to find and update the categories after deletion
  };
  const handleChangeCategory = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();

    await api
      .post(
        "/v1/ser/certCategory/",
        { categoryName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res.data);

        getDataCertCategory();
        setShowPopup(false);

        setMsgPopup(true);
        setTimeout(() => {
          setMsgPopup(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  // get data certificate category
  const getDataCertCategory = () => {
    if (token) {
      api
        .get("/v1/ser/certCategory", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setCategories(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getDataCertCategory();
  }, [navigate]);

  return (
    <div className="UPDashboard">
      <p>Category</p>
      <div className="scroll-container">
        <div className="UPCategory">
          {categories.map((category, index) => (
            <div key={category._id} className="PCategory1">
              <button
                className="COptions"
                onClick={() => handleEditCategory(category)}
              >
                x
              </button>
              {/* {showEditDeleteOptions &&
                selectedCategory._id === category._id && (
                  <div className="edit-delete-options">
                    <button onClick={() => handleDeleteCategory(category._id)}>
                      Delete
                    </button>
                  </div>
                )} */}
              {/* <button
                className="COptions"
                onClick={() => handleEditCategory(category)}
              >
                ^
              </button> */}
              <Link
                to={`/CertificateList/${category.cerCategorySlug}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <p>{category.categoryName}</p>
              </Link>
            </div>
          ))}

          {/* {categories.map((category, index) => (
            <Link
              key={category._id}
              to={`/CertificateList/${category.cerCategorySlug}`}
              style={{
                textDecoration: "none",
                color: "black",
              }}
              <button
              className="COptions"
              onClick={() => handleEditCategory(category)}
            >
              ^
            </button>
            >
             
              <div className={`PCategory1`}>
                <p>{category.categoryName}</p>
              </div>
            </Link>
          ))} */}

          <div className="PCategoryAdd" onClick={() => setShowPopup(true)}>
            <p>+</p>
          </div>
        </div>

        {/* category popup */}
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <button className="close" onClick={() => setShowPopup(false)}>
                X
              </button>
              <p>Category</p>
              <form onSubmit={handleSubmitCategory}>
                <input
                  type="category"
                  value={categoryName}
                  onChange={handleChangeCategory}
                />
                <button type="Submit">Add</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpDashboard;

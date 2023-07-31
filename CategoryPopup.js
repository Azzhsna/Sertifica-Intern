import React, { useState } from "react";
import "./CategoryPopup.css";

import api from "../api";

const CategoryPopup = (props) => {
  const token = localStorage.getItem("token");

  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [msgPopup, setMsgPopup] = useState(false);

  const handleChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = async (e) => {
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
        props.handleAddCategory(categoryName);

        setMsgPopup(true);
        setTimeout(() => {
          setMsgPopup(false);
        }, 1000);
        console.log("claimSuccess:", msgPopup);

        setTimeout(() => {
          window.location.href = "/PublisherDashboard";
        }, 1500);
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  const handleClose = () => {
    props.setShowPopup(false);
  };

  console.log(categoryName);

  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close" onClick={handleClose}>
          X
        </button>
        {/* <button className="close" onClick={() => props.setShowPopup(false)}>
          X
        </button> */}
        <p>Category</p>
        <form onSubmit={handleSubmit}>
          <input type="category" value={categoryName} onChange={handleChange} />
          <button type="Submit">Add</button>
        </form>
        <div>
          {/* {categories.map((category, index) => (
            <div key={category._id}>{category}</div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default CategoryPopup;

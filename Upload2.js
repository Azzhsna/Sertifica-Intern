import React, { useState, useEffect, errorMessage } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../api";

// import Header from "./Header";
import Sidebar from "./Sidebar";
import FormInput from "./FormInput";

const Upload2 = ({ values, handleFormData, nextStep, prevStep }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [categories, setCategories] = useState([]);

  const Continue = (e) => {
    e.preventDefault();

    nextStep();
  };

  const Previous = (e) => {
    e.preventDefault();

    prevStep();
  };

  const getCategorySelector = async () => {
    await api
      .get("/v1/ser/certCategory/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setCategories(res.data.data);
      });
  };

  useEffect(() => {
    getCategorySelector();
  }, [navigate]);

  return (
    <>
      {/* <body> */}
      <div className="PublisherBody">
        <div className="FontUp">
          <p>
            <Link
              to="/PublisherDashboard"
              style={{
                textDecoration: "none",
                fontWeight: "thin",
                color: "black",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            >
              Dashboard {">"}
            </Link>

            <Link
              to="/Publish"
              style={{
                textDecoration: "none",
                fontWeight: "bold",
                color: "black",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            >
              Publish
            </Link>
            <div className="PublishCertificate">
              <p>Publish certificate</p>
            </div>
          </p>
        </div>

        {/*STEP*/}
        <div>
          <ul className="Step">
            <li id="Step 1" className="active">
              Input Certificate
            </li>
            <li id="Step 2" className="active">
              Category
            </li>
            <li id="Step 3">Add Recepient</li>
            <li id="Step 3">Confirm</li>
          </ul>
        </div>

        {/*UPLOAD */}
        <div id="FileUpload">
          <div class="wrapper">
            <div className="InputFile2">
              <p>Input File</p>
              <FormInput
                name="fileName"
                type="InputFile"
                placeholder="Input your File Name"
                value={values.fileName}
                onChange={handleFormData("fileName")}
                required={true}
              />
            </div>
            <div className="CategoryFile">
              <p>Category</p>
              <form>
                <label htmlFor="CategoryFile">
                  <select
                    id="CategoryFile"
                    name="categoryName"
                    value={values.categoryName}
                    onChange={handleFormData("categoryName")}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category.categoryName}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                </label>
              </form>
            </div>

            <div className="ButtonStep">
              <div className="NextStep">
                <button type="NextStep" onClick={Continue}>
                  Next
                </button>
                <div className="PrevStep">
                  <Link onClick={Previous}>Previous</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* </body> */}
    </>
  );
};
export default Upload2;

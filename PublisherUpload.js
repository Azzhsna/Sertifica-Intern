import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaBars } from "react-icons/fa";
import { MdClose } from "react-icons/md";

import api from "../api";

import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";

const PublisherUpload = ({ progress, values, handleFileData, nextStep }) => {
  const navigate = useNavigate();

  const [uploadComplete, setUploadComplete] = useState(false);

  const handleFileDelete = () => {
    values.file = null;
    progress = 0;
    setUploadComplete(false);
  };

  const Continue = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <>
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
            <li id="Step 2">Category</li>
            <li id="Step 3">Add Recepient</li>
            <li id="Step 3">Confirm</li>
          </ul>
        </div>

        {/*UPLOAD */}

        <div id="FileUpload">
          <div class="wrapper">
            <div class="upload">
              <p>Drag files here or</p>
              <label htmlFor="file-upload">
                Browser
                <input
                  id="file-upload"
                  name="file"
                  type="file"
                  onChange={handleFileData}
                  style={{
                    display: "none",
                  }}
                />
              </label>
            </div>

            <div className="FileUpload">
              <img
                src={process.env.PUBLIC_URL + "/assets/file.png"}
                alt="file"
              />
              <p>
                {values.file === null ? "no file selected" : values.file.name}

                {values.file && progress === 100 && (
                  <div className="progress">
                    <progress
                      value={progress}
                      max="100"
                      style={{ width: "200%" }}
                    ></progress>

                    <p>{progress}% </p>
                    <div className="DeleteIcon">
                      <img
                        src={process.env.PUBLIC_URL + "/assets/trash.png"}
                        alt="bin"
                        onClick={() => handleFileDelete()}
                      />
                    </div>
                  </div>
                )}
              </p>

              {values.file && progress < 100 && (
                <div>
                  <div className="progress">
                    <progress
                      value={progress}
                      max="100"
                      style={{ width: "250%" }}
                    ></progress>

                    <p>{progress}% </p>
                    <div className="DeleteIcon">
                      <img
                        src={process.env.PUBLIC_URL + "/assets/trash.png"}
                        alt="bin"
                        onClick={handleFileDelete}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="NextStep">
              <Link onClick={Continue}>Next</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublisherUpload;

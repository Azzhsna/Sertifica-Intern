import React from "react";
import { Link } from "react-router-dom";

const Upload4 = ({ values, handleSubmit, prevStep, msg, msgPopup }) => {
  const Previous = (e) => {
    e.preventDefault();

    prevStep();
  };

  return (
    <>
      {/*PUBLISH */}
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
            <li id="Step 3" className="active">
              Add Recepient
            </li>
            <li id="Step 3">Confirm</li>
          </ul>
        </div>

        {/*FORM */}
        <div id="FileUpload">
          <div class="wrapper">
            <div className="Content-Certif">
              <div className="BoxUpload-name">
                {/* <p>{values.fileName}</p> */}
                <p>File Name</p>
              </div>
              <div className="BoxUpload-content">
                {/* <p>{values.recepientName}</p> */}
                {/* <p>{values.recepientEmailAddress}</p> */}
                <p>Recepient Name</p>
                <p>Recepient Email</p>
              </div>
            </div>
            <div className="BoxCertif">
              <img src={values.file} />
            </div>

            <div className="ButtonUpload">
              <div className="NextStepUpload">
                <Link onClick={handleSubmit}>Confirm</Link>
                <div className="PrevStepUpload">
                  <Link onClick={Previous}>Previous</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {msgPopup && (
        <div className="Upload-Alert-Popup">
          <h9>{msg}</h9>
        </div>
      )}
    </>
  );
};
export default Upload4;

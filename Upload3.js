import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./CategoryPopup.css";
import "./PopUpCreateAcc.css";

import api from "../api";

import Header from "./Header";
import Sidebar from "./Sidebar";
import FormInput from "./FormInput";

const Upload3 = ({ values, handleFormData, nextStep, prevStep }) => {
  const token = localStorage.getItem("token");
  const [isEmailRegistered, setIsEmailRegistered] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const PopUpCreateAcc = ({ nextStep }) => {
    const emailRef = useRef();

    const [inputData, setInputData] = useState({
      firstName: "",
      lastName: "",
      nomorHP: "",
      emailAddress: "",
    });

    const [errors, setErrors] = useState({
      firstName: "",
      lastName: "",
      nomorHP: "",
      emailAddress: "",
    });

    const [validity, setValidity] = useState({
      emailPopUp: true,
      emailAddress: true,
    });

    const onChange = (e) => {
      // const { name, value } = event.target;
      // SetValues({ ...values, [name]: value });
      const { name, value, validity } = e.target;
      setInputData({ ...inputData, [name]: value });

      setValidity({ ...validity, [name]: validity.valid });

      setInputData({ ...inputData, [e.target.name]: e.target.value });
    };

    const handleChange2 = (e) => {
      const regex = /^[0-9\b]+$/;
      if (e.target.value === "" || regex.test(e.target.value)) {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
      }
      if (isNaN(e.target.value)) {
        return;
      }
      const onlyNums = e.target.value.replace(/[^0-9]/g, "");
      setInputData({ ...inputData, [e.target.name]: onlyNums });
    };

    const inputs = [
      {
        id: 1,
        name: "firstName",
        type: "First Name",
        placeholder: "First Name",
        required: true,
      },
      {
        id: 2,
        name: "nomorHP",
        type: "PhoneNumber",
        placeholder: "08xxxxxxxxxx",
        onChange: handleChange2,
        required: true,
      },
      {
        id: 3,
        name: "lastName",
        type: "Last Name",
        placeholder: "Last Name",
        required: true,
      },
      {
        id: 4,
        name: "emailAddress",
        type: "EmailPopUp",
        placeholder: "Name@gmail.com",
        required: true,
      },
    ];

    const handleSubmitInputData = async (e) => {
      e.preventDefault();

      await api
        .post(
          "/v1/ser/users/",
          {
            firstName: inputData.firstName,
            lastName: inputData.lastName,
            nomorHP: inputData.nomorHP,
            emailAddress: inputData.emailAddress,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          console.log(res.data);
          console.log(res.data.msg);

          nextStep();
        })
        .catch((err) => {
          console.log(err, err.message);
        });
    };

    const leftInputs = inputs.slice(0, 2);
    const rightInputs = inputs.slice(2, 4);

    return (
      <>
        <div className="AlertCreateAcc">
          <p>Please Create Account</p>

          <div className="Alert">
            <form onSubmit={handleSubmitInputData} className="PopUpform-grid">
              <div className="PopUpform-grid__left">
                {leftInputs.map((input) => (
                  <FormInput
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                  />
                ))}
              </div>
              <div className="PopUpform-grid__right">
                {rightInputs.map((input) => (
                  <FormInput
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                    inputRef={input.name === "email" ? emailRef : undefined}
                  />
                ))}
              </div>

              <div className="CreateAcc">
                <button type="CreateAcc">Create</button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  };

  const PopUpEmail = () => {
    return (
      <>
        <div className="AlertEmail">
          <p>This Email has not been registered</p>
          <div className="AlertEmail2">
            <p>Please create account first</p>
          </div>
        </div>
        <div className="NextAlert">
          <div className="CreateAlert">
            <Link onClick={handlePopUpCreateAcc}>Create</Link>
          </div>
          <div className="BackAlert">
            <Link onClick={Previous}>Back</Link>
          </div>
        </div>
      </>
    );
  };

  const handlePopUpCreateAcc = () => {
    setIsModalOpen(true);
    setIsEmailRegistered(true);
  };

  const Continue = async (e) => {
    e.preventDefault();

    await api
      .post(
        "/v1/ser/users/check-email",
        { recepientEmailAddress: values.recepientEmailAddress },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 0) {
          setIsEmailRegistered(true);
          nextStep();
        }
      })
      .catch((err) => {
        console.log(err, err.message);
        setIsEmailRegistered(false);
      });
  };

  const Previous = (e) => {
    e.preventDefault();

    prevStep();
  };

  return (
    <>
      <body>
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
              <div className="InputName">
                <p>Name</p>
                <FormInput
                  name="recepientName"
                  type="Name"
                  value={values.recepientName}
                  onChange={handleFormData("recepientName")}
                  placeholder="Full Name"
                  required={true}
                />
              </div>
              <div className="InputEmail">
                <p>Email</p>
                <FormInput
                  name="recepientEmailAddress"
                  type="Name"
                  value={values.recepientEmailAddress}
                  onChange={handleFormData("recepientEmailAddress")}
                  placeholder="Email Address"
                  required={true}
                />
              </div>

              {/*Pop up muncul jika email sudah terdaftar sebelumnya */}
              {/* POPUP ALERT */}
              {!isEmailRegistered && isEmailRegistered !== null && (
                <PopUpEmail />
              )}

              {isModalOpen && <PopUpCreateAcc nextStep={nextStep} />}

              <div className="ButtonStep">
                <div className="NextStep3">
                  <button type="NextStep3" onClick={Continue}>
                    Next
                  </button>
                  <div className="PrevStep3">
                    <Link onClick={Previous}>Previous</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};
export default Upload3;

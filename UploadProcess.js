import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";

import PublisherUpload from "./PublisherUpload"; // step 1
import Upload2 from "./Upload2"; // step 2
import Upload3 from "./Upload3"; // step 3
import Upload4 from "./Upload4"; // step 4

import api from "../api";

const UploadProcess = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [msg, setMsg] = useState("");
  const [msgPopup, setMsgPopup] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [step, setStep] = useState(1);

  const [progress, setProgress] = useState(0);

  const [formData, setFormData] = useState({
    file: null,
    fileName: "",
    categoryName: "",
    recepientName: "",
    recepientEmailAddress: "",
  });

  const handleInputData = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const handleFileData = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });

    setProgress(100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("file", formData.file);
    formDataToSend.append("fileName", formData.fileName);
    formDataToSend.append("categoryName", formData.categoryName);
    formDataToSend.append("recepientName", formData.recepientName);
    formDataToSend.append(
      "recepientEmailAddress",
      formData.recepientEmailAddress
    );

    console.log("Data formulir:", formDataToSend);

    await api
      .post("/v1/ser/certificates/", formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);

        setMsg(res.data.msg);
        setMsgPopup(true);

        setTimeout(() => {
          setMsgPopup(false);
          navigate(`/CertificateRelease/${res.data.data.categorySlug}`);
        }, 1000);
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  // handle get logged in
  const getLoggedIn = () => {
    // memeriksa jika user sudah login
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/Login");
    }
  };

  useEffect(() => {
    getLoggedIn();
  }, []);

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <PublisherUpload
            values={formData}
            handleFileData={handleFileData}
            nextStep={nextStep}
            progress={progress}
          />
        );
      case 2:
        return (
          <Upload2
            values={formData}
            handleFormData={handleInputData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <Upload3
            values={formData}
            handleFormData={handleInputData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 2:
        return (
          <Upload4
            values={formData}
            handleSubmit={handleSubmit}
            prevStep={prevStep}
            msg={msg}
            msgPopup={msgPopup}
          />
        );
      default:
      // nothing
    }
  };

  return isLoggedIn ? (
    <>
      <Header />

      <Sidebar />
      {renderFormStep()}
    </>
  ) : (
    navigate("/Login")
  );
};

export default UploadProcess;

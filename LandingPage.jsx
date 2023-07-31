import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";

const LandingPage = () => {
  return (
    <>
      <header>
        <div className="logo">
          <img src="assets/logo.png" alt="Logo" />
          <div className="Login">
            <Link to="/Login">Login</Link>
          </div>
        </div>
      </header>

      <body>
        <div className="container">
          <div className="verify">
            <form>
              <label for="verification">
                <input
                  type="verification"
                  id="verification"
                  placeholder="Input certificate number here"
                  name="verification"
                />
                <div className="Verification">
                  <Link>Verification</Link>
                </div>
              </label>
            </form>
            <div className="main">
              <div className="left">
                <div className="content">
                  <h1>Sertifica</h1>
                  <div className="arial">
                    <p>
                      Sertifica adalah layanan digitalisasi sertifikat dari
                      Andalworks untuk karyawan atau peserta Boot Camp yang
                      diberikan tidak hanya diberikan dalam bentuk fisik, tapi
                      diberikan juga dalam bentuk digital (file).
                    </p>
                  </div>
                </div>
              </div>

              <div className="right">
                <div className="certificate">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/certificate.png"}
                    alt="certificate"
                  />
                </div>
              </div>
              <div className="above">
                <div className="SignUp">
                  <Link to="/SignUp">Sign Up as Publisher</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default LandingPage;

import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="Logincontainer">
        <div className="Kiri">
          <img src="assets/Logo-putih.png" alt="Logo-Sertifica" />
        </div>
        <div className="Kanan">
          <div className="Atas">
            <h1>Welcome to Sertifica</h1>
            <h2>Login</h2>
          </div>
          <form>
            <div className="e-mail">
              <label for="e-mail">Email</label>
              <input
                type="e-mail"
                id="e-mail"
                placeholder="Name@gmail.com"
                name="e-mail"
              />
            </div>
            {/* <span className="error-message">Email belum terdaftar</span> */}
            <div className="Llogin">
              <Link to="/OTP">Login</Link>
            </div>
          </form>
          <div className="Ppublisher">
            <Link to="/SignUp">Sign Up as publisher</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

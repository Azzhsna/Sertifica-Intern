import React from "react";
import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import "./SignUp.css";

const SignUp = () => {
  return (
    <>
      <div className="container">
        <div className="sans">
          <h1>Welcome to Sertifica</h1>
          <h2>Create an account</h2>
        </div>
      </div>

      <div className="Sign">
        <form>
          <div className="Signleft">
            <label for="Name">Name</label>
            <input type="Name" id="Namel" placeholder="Full Name" name="Name" />

            <label for="Company name">Company name</label>
            <input
              type="Company name"
              id="Company name"
              placeholder="Andalworks"
              name="Company name"
            />

            <label for="Address">Address</label>
            <input
              type="Address"
              id="Address"
              placeholder="Address"
              name="Address"
            />

            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Name@gmail.com"
              required
              pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}"
              name="email"
            />
          </div>

          <div className="Signright">
            <label for="Phone">Phone number</label>
            <input
              type="Phone number"
              id="Phone number"
              placeholder="62+xxxxxxxxxx"
              name="Phone number"
            />

            <label for="Job position">Job position</label>
            <input
              type="Job position"
              id="Job position"
              placeholder="Job position"
              name="Job position"
            />

            <label for="Post code">Post code</label>
            <input
              type="Post code"
              id="Post code"
              placeholder="Post code"
              name="Post code"
            />

            <label for="Profile">Profile</label>
            <input
              type="file"
              id="Profile"
              placeholder="Drop your images"
              name="Profile"
            />
          </div>
        </form>
      </div>
      <div class="btn">
        <button>Sign Up</button>
      </div>
      {/* <button onclick="showDialogWithPassingParams()">Sign Up</button> */}
      {/* <script>
function showDialogWithPassingParams() {
  Swal.fire({
    title: "Email sudah sudah terdaftar",
    text: "lanjut masuk dengan email name@gmail?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#0f133a",
    cancelButtonColor: "#017ca3",
    cancelButtonText: "masuk",
    confirmButtonText: "ubah",
    showConfirmButton: true,
  }).then((result) => {
    if (result.value) {
      Swal.fire(
        "Attention!",
        "Silahkan melakukan sign up dengan email baru",
        "warning"
      );
      document.addEventListener("click", function (t) {
        if (t.masuk.tagName == "B" && !t.target.hasAttribute("masuk")) {
          t.masuk.setAttribute("masuk", "_blank");
        }
      });
    }
  });
}
</script> */}

      <div className="Resend">
        <p>
          Already have account? <span>Sign in</span>
        </p>
      </div>
    </>
  );
};

export default SignUp;

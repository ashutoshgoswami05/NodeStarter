import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    Cpassword: ""
  });

  let name, value;
  const handleinput = e => {
    name = e.target.name;

    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const sendData = async e => {
    e.preventDefault();
    const { name, email, phone, password, cpassword } = user;
    console.log(name, email, phone, password, cpassword);
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        cpassword
      })
    });

    const data = await res.json();
    console.log(data);
    if (data.status === 422 || !data) {
      window.alert("Invalid");
    } else {
      window.alert("successful");
      navigate("/login");
    }
  };

  return (
    <>
      <section className="signup">
        <div className="container mt-5">
          <div className="singup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              <form method="POST" id="register-form" className="register-forn">
                <div className="form-group mb-3">
                  <i class="fa-thin fa-envelope"></i>
                  <label htmlFor="name">Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="off"
                    placeholder="Enter your Name"
                    value={user.name}
                    onChange={handleinput}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    placeholder="Enter your email"
                    type="text"
                    name="email"
                    id="email"
                    className="form-control"
                    autoComplete="off"
                    value={user.email}
                    onChange={handleinput}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="Phone">Phone</label>
                  <input
                    placeholder="Your phone number"
                    type="number"
                    name="phone"
                    id="Phone"
                    autoComplete="off"
                    className="form-control"
                    value={user.phone}
                    onChange={handleinput}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="Password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="Password"
                    placeholder="Enter your password"
                    autoComplete="off"
                    className="form-control"
                    value={user.password}
                    onChange={handleinput}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="cpassword">Confirm password</label>
                  <input
                    type="text"
                    name="cpassword"
                    id="CPassword"
                    placeholder="Confirm your password"
                    autoComplete="off"
                    className="form-control"
                    value={user.cpassword}
                    onChange={handleinput}
                  />
                </div>
                <div className="form-group">
                  <button
                    onClick={sendData}
                    type="submit"
                    class="btn btn-primary"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Signup;

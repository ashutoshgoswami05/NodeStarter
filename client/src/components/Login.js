import React from "react";

const Login = () => {
  return (
    <div>
      <div className="container mt-5">
        <form id="login-form" className="login-form">
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              placeholder="Enter your email"
              type="text"
              name="email"
              id="email"
              className="form-control"
              autoComplete="off"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              name="Password"
              id="Password"
              placeholder="Enter your password"
              autoComplete="off"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <button type="submit" class="btn btn-success">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

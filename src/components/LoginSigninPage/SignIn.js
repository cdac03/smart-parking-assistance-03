import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/logo.png";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { FaSpinner } from "react-icons/fa"; // Importing a spinner icon

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // State to store messages
  const [messageType, setMessageType] = useState(""); // State to store message type (error/success)
  const [loading, setLoading] = useState(false); // State to handle loading

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please enter both email and password");
      setMessageType("error");
      return;
    }

    setLoading(true); // Set loading to true when submission starts

    try {
      const response = await axios.post(
        "http://192.168.5.119:8080/api/users/login",
        {
          email,
          password,
        }
      );

      if (response.data) {
        const userId = response.data.id;
        localStorage.setItem("userId", userId);
        setMessage("Login successful!");
        setMessageType("success");

        setTimeout(() => {
          setLoading(false); // Stop loading before redirect
          navigate("/"); // Redirect after 2 seconds
        }, 2000);
      } else {
        setMessage("Invalid email or password.");
        setMessageType("error");
        setLoading(false); // Stop loading in case of error
      }
    } catch (error) {
      setMessage("Invalid email or password.");
      setMessageType("error");
      setLoading(false); // Stop loading in case of error
      console.error("There was an error!", error);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    setLoading(true); // Set loading to true when submission starts

    try {
      const response = await axios.post(
        "http://192.168.5.119:8080/api/users/google-login",
        {
          token: credentialResponse.credential,
        }
      );

      if (response.data) {
        const userId = response.data.id;
        localStorage.setItem("userId", userId);
        setMessage("Login successful!");
        setMessageType("success");

        setTimeout(() => {
          setLoading(false); // Stop loading before redirect
          navigate("/"); // Redirect after 2 seconds
        }, 2000);
      } else {
        setMessage("Google login failed.");
        setMessageType("error");
        setLoading(false); // Stop loading in case of error
      }
    } catch (error) {
      setMessage("Google login failed.");
      setMessageType("error");
      setLoading(false); // Stop loading in case of error
      console.error("There was an error!", error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="869242955652-Odobag1542qnhd9jgInjiac9loo9i3hk.apps.googleusercontent.com">
      <section className="h-screen flex flex-col md:flex-row justify-center items-center my-2 mx-5 md:mx-0 md:my-0">
        <div className="md:w-1/3 max-w-sm">
          <img src={logo} alt="Smart Parking" className="w-full" />
        </div>
        <div className="md:w-1/3 max-w-sm flex flex-col items-center">
          {message && (
            <div
              className={`w-full p-2 text-center ${
                messageType === "error"
                  ? "text-red-500 bg-red-100"
                  : "text-green-500 bg-green-100"
              } rounded`}
            >
              {message}
            </div>
          )}
          <div className="text-center mt-4">
            <label className="text-lg font-bold">Sign in with</label>
            <div className="flex justify-center space-x-2 mt-2">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => console.log("Login Failed")}
              />
            </div>
          </div>
          <div className="my-2 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
              Or
            </p>
          </div>
          <form onSubmit={handleLogin} className="w-full">
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="mt-4 flex justify-between font-semibold text-sm w-full">
              <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                <input className="mr-1" type="checkbox" />
                <span>Remember Me</span>
              </label>
              <Link
                to="#"
                className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="text-center mt-8 flex justify-center">
              <button
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider flex items-center justify-center"
                type="submit"
                disabled={loading} // Disable button when loading
              >
                {loading ? (
                  <FaSpinner className="animate-spin mr-2" /> // Loading spinner icon
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
          <div className="mt-4 font-semibold text-sm text-slate-500 text-center">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-700 hover:underline hover:underline-offset-4"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </section>
    </GoogleOAuthProvider>
  );
};

export default SignIn;

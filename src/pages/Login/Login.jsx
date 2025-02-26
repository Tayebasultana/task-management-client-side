import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { authContext } from "../../AuthProvider/AuthProvider";

const Login = () => {
  const { user, handleGoogleLogin, handleLogin } = useContext(authContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;
    
    handleLogin(email, password)
      .then((res) => {
        if (user) {
          navigate("/tasks"); 
          toast.success("Login successful!");
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const googleLoginHandler = () => {
    handleGoogleLogin()
    .then((result) => {
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
      axiosPublic.post('/users', userInfo)
        .then((res) => {
          console.log(res.data);
          if (user) {
            navigate(`/tasks/${user.email}`); 
            toast.success("Successfully logged in!");
          }
        })
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white/90 p-8 md:p-12 rounded-lg shadow-lg max-w-4xl flex flex-col lg:flex-row gap-8 items-center">
        <div className="w-full">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-center text-3xl font-bold text-gray-700">
              Welcome Back!
            </h2>

            <div className="space-y-2">
              <label className="block">
                <span className="text-gray-600">Email</span>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring focus:ring-black focus:outline-none"
                  placeholder="Enter your email"
                  required
                />
              </label>

              <label className="block">
                <span className="text-gray-600">Password</span>
                <input
                  type="password"
                  name="password"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring focus:ring-black focus:outline-none"
                  placeholder="Enter your password"
                  required
                />
              </label>

              <div className="text-right">
                <NavLink
                  to="/forgetPassword"
                  className="text-black hover:underline text-sm"
                >
                  Forgot Password?
                </NavLink>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md shadow hover:bg-black focus:ring focus:ring-black transition-all"
            >
              Login
            </button>
          </form>

          <div className="my-4 flex items-center justify-center">
            <span className="w-full h-px bg-gray-300"></span>
            <span className="px-2 text-sm text-gray-500">OR</span>
            <span className="w-full h-px bg-gray-300"></span>
          </div>

          <button
            onClick={googleLoginHandler}
            className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-md shadow hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 48 48"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.7 0 6.6 1.5 8.5 2.8l6.3-6.3C34.8 2.5 29.8 0 24 0 14.6 0 6.7 4.8 2.6 12l7.6 5.9C12.3 12 17.7 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M46.5 24c0-1.7-.2-3.5-.6-5H24v9.5h12.5c-1.1 5.7-6.4 9.5-12.5 9.5-4.7 0-8.8-2.2-11.4-5.5l-7.5 5.8C9.8 42.5 16.5 48 24 48c12.9 0 22.5-10.6 22.5-24z"
              />
              <path
                fill="#FBBC04"
                d="M12.6 28.5c-.8-2.5-.8-5.2 0-7.6l-7.5-5.8C2.5 18.7 0 21.8 0 24s2.5 5.3 5 7.4l7.6-5.9z"
              />
              <path
                fill="#4285F4"
                d="M24 9.5c3.7 0 6.6 1.5 8.5 2.8l6.3-6.3C34.8 2.5 29.8 0 24 0 14.6 0 6.7 4.8 2.6 12l7.6 5.9C12.3 12 17.7 9.5 24 9.5z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="text-center mt-4">
            <span className="text-gray-500">New to the website? </span>
            <NavLink to="/" className="text-black hover:underline font-bold">
              Register
            </NavLink>
          </div>

          {error && (
            <p className="text-red-500 text-center mt-4">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

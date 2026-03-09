import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";
import { toast } from "react-toastify";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* Redirect if already logged in */

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      navigate("/sweets");
    }

  }, [navigate]);


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (loading) return;

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {

      toast.warning("Please enter username and password");
      return;

    }

    try {

      setLoading(true);

      const response = await API.post("/auth/login", {
        username: trimmedUsername,
        password: trimmedPassword
      });

      const { token, role = "USER" } = response.data || {};

      if (!token) {
        throw new Error("Token not received");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      toast.success("🎉 Login successful!");

      navigate("/sweets");

    } catch (error) {

      console.error("Login failed:", error);

      const message =
        error?.response?.data?.message ||
        "Invalid username or password";

      toast.error(message);

    } finally {

      setLoading(false);

    }

  };


  return (

    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "80vh" }}
    >

      <div className="card shadow p-4" style={{ width: "420px" }}>

        <h3 className="text-center mb-4">🔐 Login</h3>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              required
            />

          </div>

          <div className="mb-3">

            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />

          </div>

          <button
            className="btn btn-primary w-100"
            disabled={loading}
          >

            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}

          </button>

        </form>

        <p className="text-center mt-3">

          Don't have an account?{" "}

          <Link to="/register">
            Register
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;
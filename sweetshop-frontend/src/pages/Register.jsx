import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";
import { toast } from "react-toastify";

function Register() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* Redirect if already logged in */

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      navigate("/sweets");
    }

  }, [navigate]);


  const handleRegister = async (e) => {

    e.preventDefault();

    if (loading) return;

    setError("");

    const trimmedUsername = username.trim();

    if (!trimmedUsername || !password.trim() || !confirmPassword.trim()) {
      setError("Please fill all fields");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {

      setLoading(true);

      await API.post("/auth/register", {
        username: trimmedUsername,
        password
      });

      toast.success("🎉 Registration successful! Please login.");

      navigate("/login");

    } catch (error) {

      console.error("Registration failed:", error);

      const message =
        error?.response?.data?.message ||
        "Registration failed. Username may already exist.";

      setError(message);

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

        <h3 className="text-center mb-4">📝 Register</h3>

        {error && (

          <div className="alert alert-danger">
            {error}
          </div>

        )}

        <form onSubmit={handleRegister}>

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

          <div className="mb-3">

            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
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
                Registering...
              </>
            ) : (
              "Register"
            )}

          </button>

        </form>

        <p className="text-center mt-3">

          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Register;
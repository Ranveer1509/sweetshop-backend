import { useEffect, useState } from "react";
import API from "../api/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function AdminDashboard() {

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {

    try {

      setLoading(true);
      const res = await API.get("/admin/stats");

      setStats(res.data);
      setError(false);

    } catch (err) {

      console.error("Failed to load admin stats", err);
      setError(true);

    } finally {

      setLoading(false);

    }

  };

  /* Loading */

  if (loading) {

    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-warning"></div>
      </div>
    );

  }

  /* Error */

  if (error) {

    return (
      <div className="text-center mt-5">
        <h4>Failed to load dashboard data</h4>
        <button className="btn btn-warning mt-3" onClick={loadStats}>
          Retry
        </button>
      </div>
    );

  }

  const chartData = [
    { name: "Sweets", value: stats?.totalSweets || 0 },
    { name: "Orders", value: stats?.totalOrders || 0 },
    { name: "Revenue", value: stats?.totalRevenue || 0 }
  ];

  return (

    <div className="container mt-4">

      <h2 className="mb-4">📊 Admin Dashboard</h2>

      {/* Stats Cards */}

      <div className="row mb-4">

        <div className="col-md-3">

          <div className="card p-3 shadow-sm text-center">

            <h6>Total Sweets</h6>
            <h3>{stats.totalSweets}</h3>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card p-3 shadow-sm text-center">

            <h6>Total Orders</h6>
            <h3>{stats.totalOrders}</h3>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card p-3 shadow-sm text-center">

            <h6>Total Revenue</h6>
            <h3>
              ₹{stats.totalRevenue.toLocaleString()}
            </h3>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card p-3 shadow-sm text-center">

            <h6>Low Stock</h6>
            <h3>{stats.lowStockItems}</h3>

          </div>

        </div>

      </div>


      {/* Chart */}

      <div className="card p-4 shadow-sm">

        <h5 className="mb-3">Sales Overview</h5>

        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="value" fill="#ffc107" />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default AdminDashboard;
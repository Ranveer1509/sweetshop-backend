import { useEffect, useState } from "react";
import {
  getAllSweets,
  addSweet,
  deleteSweet,
  updateSweet
} from "../api/sweetService";

function AdminManageSweets() {

  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    imageUrl: ""
  });

  useEffect(() => {
    loadSweets();
  }, []);

  const loadSweets = async () => {

    try {

      setLoading(true);

      const res = await getAllSweets();

      const data = res?.data?.content || res?.data || [];

      setSweets(data);
      setError(false);

    } catch (err) {

      console.error("Failed to load sweets", err);
      setError(true);

    } finally {

      setLoading(false);

    }

  };


  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });

  };


  const resetForm = () => {

    setForm({
      name: "",
      category: "",
      price: "",
      quantity: "",
      imageUrl: ""
    });

    setEditingId(null);

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const payload = {
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity)
      };

      if (editingId) {

        await updateSweet(editingId, payload);

        alert("Sweet updated successfully");

      } else {

        await addSweet(payload);

        alert("Sweet added successfully");

      }

      resetForm();
      loadSweets();

    } catch (err) {

      console.error("Save sweet failed", err);

      alert("Operation failed");

    }

  };


  const handleEdit = (sweet) => {

    setEditingId(sweet.id);

    setForm({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity,
      imageUrl: sweet.imageUrl || ""
    });

  };


  const handleDelete = async (id) => {

    if (!window.confirm("Delete this sweet?")) return;

    try {

      await deleteSweet(id);

      setSweets(prev => prev.filter(s => s.id !== id));

    } catch (err) {

      console.error("Delete failed", err);

    }

  };


  if (loading) {

    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-warning"></div>
      </div>
    );

  }

  if (error) {

    return (
      <div className="text-center mt-5">
        <h4>Failed to load sweets</h4>
        <button className="btn btn-warning mt-3" onClick={loadSweets}>
          Retry
        </button>
      </div>
    );

  }

  return (

    <div className="container mt-4">

      <h2 className="mb-4">🍬 Manage Sweets</h2>

      {/* Add / Edit Sweet */}

      <div className="card p-4 mb-4 shadow-sm">

        <h5 className="mb-3">
          {editingId ? "Edit Sweet" : "Add New Sweet"}
        </h5>

        <form onSubmit={handleSubmit} className="row g-3">

          <div className="col-md-3">

            <input
              name="name"
              className="form-control"
              placeholder="Sweet Name"
              value={form.name}
              onChange={handleChange}
              required
            />

          </div>

          <div className="col-md-3">

            <input
              name="category"
              className="form-control"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              required
            />

          </div>

          <div className="col-md-2">

            <input
              name="price"
              type="number"
              className="form-control"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              required
            />

          </div>

          <div className="col-md-2">

            <input
              name="quantity"
              type="number"
              className="form-control"
              placeholder="Stock"
              value={form.quantity}
              onChange={handleChange}
              required
            />

          </div>

          <div className="col-md-2">

            <input
              name="imageUrl"
              className="form-control"
              placeholder="Image URL"
              value={form.imageUrl}
              onChange={handleChange}
            />

          </div>

          <div className="col-md-2 d-flex gap-2">

            <button className="btn btn-primary w-100">
              {editingId ? "Update" : "Add"}
            </button>

            {editingId && (

              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetForm}
              >
                Cancel
              </button>

            )}

          </div>

        </form>


        {/* Image Preview */}

        {form.imageUrl && (

          <div className="mt-3">

            <p className="small text-muted">Image Preview</p>

            <img
              src={form.imageUrl}
              alt="preview"
              style={{ width: "120px", borderRadius: "6px" }}
              onError={(e) => e.target.style.display = "none"}
            />

          </div>

        )}

      </div>


      {/* Sweet Table */}

      <div className="card shadow-sm">

        <div className="card-body table-responsive">

          <table className="table table-hover align-middle">

            <thead>

              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {sweets.length === 0 && (

                <tr>
                  <td colSpan="6" className="text-center">
                    No sweets available
                  </td>
                </tr>

              )}

              {sweets.map((sweet) => (

                <tr key={sweet.id}>

                  <td>{sweet.id}</td>
                  <td>{sweet.name}</td>
                  <td>{sweet.category}</td>

                  <td>
                    ₹{Number(sweet.price).toLocaleString()}
                  </td>

                  <td>

                    {sweet.quantity > 10 ? (

                      <span className="badge bg-success">
                        {sweet.quantity}
                      </span>

                    ) : (

                      <span className="badge bg-danger">
                        Low Stock ({sweet.quantity})
                      </span>

                    )}

                  </td>

                  <td className="d-flex gap-2">

                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEdit(sweet)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(sweet.id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default AdminManageSweets;
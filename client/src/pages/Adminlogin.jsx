import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/admin/login", form);
    localStorage.setItem("token", res.data.token);
    navigate("/admin/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 shadow rounded">
      <h1 className="text-2xl mb-4">Admin Login</h1>
      <input name="username" placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} className="w-full mb-3 p-2 border rounded" />
      <input type="password" name="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} className="w-full mb-3 p-2 border rounded" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
}
export default AdminLogin;

import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const token = localStorage.getItem("token");

  const fetchFeedbacks = async () => {
    const res = await axios.get("http://localhost:5000/admin/feedbacks", {
      headers: { Authorization: token }
    });
    setFeedbacks(res.data);
  };

  const handleDelete = async id => {
    await axios.delete(`http://localhost:5000/admin/feedback/${id}`, {
      headers: { Authorization: token }
    });
    fetchFeedbacks(); // refresh
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">All Feedbacks</h1>
      <table className="w-full border">
        <thead><tr><th>Name</th><th>Email</th><th>Course</th><th>Rating</th><th>Comments</th><th>Action</th></tr></thead>
        <tbody>
          {feedbacks.map(f => (
            <tr key={f._id} className="text-center">
              <td>{f.name}</td><td>{f.email}</td><td>{f.course}</td><td>{f.rating}</td><td>{f.comments}</td>
              <td><button onClick={() => handleDelete(f._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default AdminDashboard;


import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FeedbackForm() {
  const [form, setForm] = useState({ name: "", email: "", course: "", rating: "", comments: "" });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:5000/feedback", form);
    alert("Submitted successfully!");
    navigate("/thankyou");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Submit Feedback</h1>

      {["name", "email", "course", "rating", "comments"].map((field, idx) => (
        <div key={idx} className="mb-4">
          <label htmlFor={field} className="block text-sm font-semibold mb-1 capitalize text-gray-700">
            {field}
          </label>
          <input
            type={field === "email" ? "email" : "text"}
            id={field}
            name={field}
            placeholder={`Enter your ${field}`}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
      >
        Submit
      </button>
    </form>
  );
}

export default FeedbackForm;

import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:5000/api/messages";

function App() {
  const [messages, setMessages] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
    consent: true
  });

  const fetchMessages = async () => {
    const res = await axios.get(API_URL);
    setMessages(res.data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post(API_URL, form);
    }

    setForm({
      name: "",
      email: "",
      topic: "",
      message: "",
      consent: true
    });

    fetchMessages();
  };

  const handleEdit = (msg) => {
    setEditingId(msg._id);
    setForm({
      name: msg.name,
      email: msg.email,
      topic: msg.topic,
      message: msg.message,
      consent: msg.consent
    });
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchMessages();
  };

  return (
    <main className="container">
      <h1>Contact Messages CRUD</h1>

      <form onSubmit={handleSubmit} className="card">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <select
          name="topic"
          value={form.topic}
          onChange={handleChange}
          required
        >
          <option value="">Select topic</option>
          <option value="internship">Internship / job opportunity</option>
          <option value="project">Project / collaboration</option>
          <option value="question">Question</option>
        </select>

        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          required
        />

        <label>
          <input
            type="checkbox"
            name="consent"
            checked={form.consent}
            onChange={handleChange}
          />
          I agree that my data can be used for contact purposes.
        </label>

        <button type="submit">
          {editingId ? "Update message" : "Create message"}
        </button>
      </form>

      <section>
        <h2>All messages</h2>

        {messages.map((msg) => (
          <div className="card" key={msg._id}>
            <h3>{msg.name}</h3>
            <p><strong>Email:</strong> {msg.email}</p>
            <p><strong>Topic:</strong> {msg.topic}</p>
            <p>{msg.message}</p>

            <button onClick={() => handleEdit(msg)}>Edit</button>
            <button onClick={() => handleDelete(msg._id)}>Delete</button>
          </div>
        ))}
      </section>
    </main>
  );
}

export default App;
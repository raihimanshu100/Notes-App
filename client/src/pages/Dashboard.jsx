import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/main.css';
import LogoHeader from '../components/LogoHeader';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/user', {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (err) {
      window.location.href = '/';
    }
  };

  const fetchNotes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/notes', {
        withCredentials: true,
      });
      setNotes(res.data);
      setLoading(false);
    } catch (err) {
      alert('Failed to fetch notes');
    }
  };

  const addNote = async () => {
    if (!newNote.trim()) return;
    try {
      const res = await axios.post(
        'http://localhost:5000/api/notes',
        { content: newNote },
        { withCredentials: true }
      );
      setNotes([res.data, ...notes]);
      setNewNote('');
    } catch (err) {
      alert('Failed to add note');
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        withCredentials: true,
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      alert('Failed to delete note');
    }
  };

  const logout = async () => {
    await axios.post(
      'http://localhost:5000/api/auth/logout',
      {},
      { withCredentials: true }
    );
    window.location.href = '/';
  };

  useEffect(() => {
    fetchUser();
    fetchNotes();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <LogoHeader align="left" />
        <h1>Dashboard</h1>
        <button className="logout-btn" onClick={logout}>
          Sign Out
        </button>
      </div>

      {user && (
        <div className="user-card">
          <h2>Welcome, {user.name} 👋</h2>
          <p>Email: {user.email}</p>
        </div>
      )}

      <div className="new-note-box">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write your note here..."
        ></textarea>
        <button className="create-note-btn" onClick={addNote}>
          Add Note
        </button>
      </div>

      <div className="notes-section">
        <h3>Your Notes</h3>
        {loading ? (
          <p>Loading...</p>
        ) : notes.length === 0 ? (
          <p>No notes yet. Start adding some!</p>
        ) : (
          notes.map((note) => (
            <div key={note._id} className="note-card">
              <p>{note.content}</p>
              <button className="delete-btn" onClick={() => deleteNote(note._id)}>
                🗑
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;

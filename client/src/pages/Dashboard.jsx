import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { socket } from "../services/socket";

const Dashboard = () => {
  const { user, logout, loading } = useAuth();
  const [posts, setPosts] = useState([]);
  const [currentPage] = useState(1);

  // Socket.io connection
  useEffect(() => {
    /* ✅ Connect manually */
    socket.connect();

    /* ✅ Event listeners */
    socket.on('connect', () => {
      console.log('🟢 Connected:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('🔴 Disconnected');
    });

    socket.on('connect_error', (err) => {
      console.error('❌ Connection Error:', err.message);
    });

    /* ✅ Cleanup */
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');

      socket.disconnect();
    };
  }, []);

  const handleDelete = async (postId) => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to delete this post? This action cannot be undone.",
    );
    if (!confirmed) {
      return; // User cancelled
    }

    try {
      const response = await api.delete(`/posts/${postId}`);

      if (response.data.success) {
        // Remove post from UI immediately (optimistic update)
        setPosts(posts.filter((post) => post._id !== postId));

        // Optional: Show success message
        alert("Post deleted successfully");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.response?.data?.message || "Failed to delete post");
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get(`/posts?page=${currentPage}`);
        const data = response.data;
        setPosts(data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (user) {
      fetchPosts();
    }
  }, [user, currentPage]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>Loading...</div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1>Welcome, {user.name}!</h1>
        <button onClick={logout} style={logoutButtonStyle}>
          Logout
        </button>
      </div>

      <div style={contentStyle}>
        <div style={cardStyle}>
          <h2>Your Account</h2>
          <div style={infoStyle}>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Member Since:</strong>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div style={cardStyle}>
          <h2>Dashboard Features</h2>
          <p>
            This is your personalized dashboard. Future features will include:
          </p>
          <ul>
            <li>Create and manage your content</li>
            <li>View your statistics</li>
            <li>Edit your profile</li>
            <li>See your activity</li>
          </ul>
        </div>

        <div style={cardStyle}>
          <h2>Your Posts</h2>
          <div style={postsContainerStyle}>
            {posts.map((post) => (
              <div key={post._id} style={postCardStyle}>
                <h3>{post.title}</h3>
                <p>{post.content.substring(0, 150)}...</p>

                {/* Action Buttons */}
                <div style={actionsStyle}>
                  <Link to={`/edit/${post._id}`}>
                    <button style={editButtonStyle}>
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(post._id)}
                    style={deleteButtonStyle}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  minHeight: "80vh",
  padding: "2rem",
  maxWidth: "1200px",
  margin: "0 auto",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "2rem",
  padding: "1rem",
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const logoutButtonStyle = {
  padding: "0.5rem 1.5rem",
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "500",
};

const contentStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "2rem",
};

const cardStyle = {
  padding: "2rem",
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const infoStyle = {
  marginTop: "1rem",
  lineHeight: "2",
};

const postsContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

const postCardStyle = {
  padding: '1rem',
  border: '1px solid #ddd',
  borderRadius: '8px',
  backgroundColor: '#f8f9fa',
};

const actionsStyle = {
  display: 'flex',
  gap: '1rem',
  marginTop: '1rem',
};

const deleteButtonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const editButtonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  textDecoration: 'none',
};

export default Dashboard;

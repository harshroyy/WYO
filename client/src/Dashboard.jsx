import { useEffect, useState } from 'react';

const BACKEND_URL = "https://wyo-api.onrender.com"; // Your Render URL

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    // Note: We need 'credentials: include' to send cookies
    fetch(`${BACKEND_URL}/auth/user`, { credentials: 'include' }) 
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          setUser(data.user);
        }
      });
  }, []);

  if (!user) return <div className="text-white">Loading user data...</div>;

  return (
    <div className="text-white text-center">
      <h1 className="text-3xl">Welcome, {user.username}!</h1>
      <img src={user.avatar} alt="Avatar" className="w-20 h-20 rounded-full mx-auto my-4 border-2 border-cyan-400" />
      <p className="text-gray-400">You are logged in.</p>
    </div>
  );
}
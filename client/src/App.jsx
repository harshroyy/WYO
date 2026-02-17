import { useState, useEffect } from 'react'

const BACKEND_URL = "https://wyo-api.onrender.com";

function App() {
  const [status, setStatus] = useState("Connecting to backend...");

  useEffect(() => {
    fetch(`${BACKEND_URL}/`)
      .then(res => res.json())
      .then(data => {
        console.log("Data received:", data);
        setStatus(data.message);
      })
      .catch(err => {
        console.error("Connection failed:", err);
        setStatus("Error: Could not connect to backend.");
      })
  }, [])

  const handleLogin = () => {
    // Redirect browser to backend auth route
    window.location.href = `${BACKEND_URL}/auth/discord`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-cyan-400 flex flex-col items-center justify-center font-mono">
      <h1 className="text-6xl font-bold mb-2 tracking-tighter">WYO</h1>
      <p className="text-white text-lg mb-8 opacity-80">Matchmaking Engine v0.1</p>

      {/* Login Button */}
      <button
        onClick={handleLogin}
        className="mt-8 px-8 py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-lg transition-all shadow-lg flex items-center gap-2 mb-8"
      >
        <img src="https://assets-global.website-files.com/6257adef93867e56f84d3092/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png" className="w-6 h-6" alt="Discord" />
        Login with Discord
      </button>

      <div className="p-6 border-2 border-cyan-400 rounded-lg shadow-[0_0_15px_rgba(0,243,255,0.3)] bg-gray-800">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${status.includes("ONLINE") ? "bg-green-500 animate-pulse" : "bg-red-500"}`}></div>
          <span className="text-xl">{status}</span>
        </div>
      </div>
    </div>
  )
}

export default App
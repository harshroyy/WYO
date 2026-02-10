import { useState, useEffect } from 'react'

const BACKEND_URL = "https://wyo.onrender.com"; 

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

  return (
    <div className="min-h-screen bg-gray-900 text-cyan-400 flex flex-col items-center justify-center font-mono">
      <h1 className="text-6xl font-bold mb-2 tracking-tighter">WYO</h1>
      <p className="text-white text-lg mb-8 opacity-80">Matchmaking Engine v0.1</p>
      
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
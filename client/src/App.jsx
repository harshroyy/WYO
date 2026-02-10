// client/src/App.jsx
import { useState, useEffect } from 'react'

function App() {
  const [status, setStatus] = useState("Loading backend status...");

  // We will uncomment this once we have the URL
  /* useEffect(() => {
    fetch('YOUR_BACKEND_URL')
      .then(res => res.json())
      .then(data => setStatus(data.message))
      .catch(err => setStatus("Backend not connected yet"))
  }, []) 
  */

  return (
    <div style={{ 
      backgroundColor: '#1a1a2e', 
      color: '#00f3ff', 
      height: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      flexDirection: 'column',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', margin: 0 }}>WYO</h1>
      <p style={{ color: '#fff' }}>Matchmaking Engine v0.1</p>
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #00f3ff' }}>
        Backend Status: {status}
      </div>
    </div>
  )
}

export default App
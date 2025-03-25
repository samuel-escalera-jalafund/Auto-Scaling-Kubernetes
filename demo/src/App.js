import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [hostname, setHostname] = useState('');

  const fetchHostname = async () => {
    const response = await fetch('/api/hostname');
    const data = await response.json();
    setHostname(data.hostname);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Auto Scaling Demo</h1>
        <p>Contador: {count}</p>
        <button onClick={() => setCount(count + 1)}>Incrementar</button>
        
        <div style={{ marginTop: '20px' }}>
          <button onClick={fetchHostname}>Obtener Hostname</button>
          {hostname && <p>Servido por: {hostname}</p>}
        </div>
      </header>
    </div>
  );
}

export default App;
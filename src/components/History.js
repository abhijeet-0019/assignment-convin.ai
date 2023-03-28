import React, { useEffect, useState } from 'react';
import '../antd.css';

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/history')
      .then((response) => response.json())
      .then((data) => setHistory(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="history-container">
      <h1>Video History</h1>
      <table>
        <thead>
          <tr>
            <th>Video Name</th>
            <th>Time Played</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;

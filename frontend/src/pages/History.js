import React, { useEffect, useState } from "react";

function History() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTransactions = async () => {
    try {
      const response = await fetch("http://localhost:5001/transactions");
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Failed to load history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <div className="section-spacing">
      <h1 className="history-title">Transaction History</h1>

      {loading ? (
        <p>Loading history...</p>
      ) : transactions.length === 0 ? (
        <p>No transaction history found.</p>
      ) : (
        <div className="history-grid">
          {transactions.map((item) => (
            <div className="card history-card" key={item.id}>
              <h3>{item.equipment_name}</h3>
              <p><strong>Action:</strong> {item.action_type}</p>
              <p><strong>Equipment ID:</strong> {item.equipment_id}</p>
              <p><strong>Owner:</strong> {item.owner_address}</p>
              <p><strong>Borrower:</strong> {item.borrower_address}</p>
              <p><strong>TX Hash:</strong> {item.tx_hash}</p>
              <p>
                <strong>Time:</strong>{" "}
                {new Date(item.action_time).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
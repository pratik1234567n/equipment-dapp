import React, { useEffect, useState } from "react";
import { addEquipment, borrowEquipment, returnEquipment, getContract } from "../services/blockchain";

function Dashboard() {
  const [account, setAccount] = useState("");
  const [equipmentName, setEquipmentName] = useState("");
  const [equipmentList, setEquipmentList] = useState([]);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask not installed");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });

      setAccount(accounts[0]);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  const loadEquipment = async () => {
    try {
      const contract = await getContract();
      if (!contract) return;

      const count = await contract.equipmentCount();
      const items = [];

      for (let i = 1; i <= Number(count); i++) {
        const item = await contract.getEquipment(i);

        items.push({
          id: Number(item[0]),
          name: item[1],
          isBorrowed: item[2],
          borrower: item[3]
        });
      }

      setEquipmentList(items);
    } catch (error) {
      console.error("Load equipment failed:", error);
    }
  };

  const handleAddEquipment = async () => {
    if (!equipmentName.trim()) return;

    try {
      await addEquipment(equipmentName);
      setEquipmentName("");
      await loadEquipment();
      alert("Equipment added successfully");
    } catch (error) {
      console.error("Add equipment failed:", error);
      alert("Adding equipment failed");
    }
  };

  const handleBorrow = async (item) => {
    try {
      await borrowEquipment(item.id, item.name, item.borrower, account);
      await loadEquipment();
      alert("Equipment borrowed successfully");
    } catch (error) {
      console.error("Borrow failed:", error);
      alert("Borrow failed");
    }
  };

  const handleReturn = async (item) => {
    try {
      await returnEquipment(item.id, item.name, item.borrower, account);
      await loadEquipment();
      alert("Equipment returned successfully");
    } catch (error) {
      console.error("Return failed:", error);
      alert("Return failed");
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  useEffect(() => {
    if (account) {
      loadEquipment();
    }
  }, [account]);

  return (
    <div className="section-spacing">
      <h1 className="page-title">Equipment Dashboard</h1>

      <div className="wallet-banner">
        Connected wallet: <strong>{account || "Not connected"}</strong>
      </div>

      <div className="dashboard-actions">
        <input
          className="input-box"
          type="text"
          placeholder="Enter equipment name"
          value={equipmentName}
          onChange={(e) => setEquipmentName(e.target.value)}
        />
        <button className="btn btn-green" onClick={handleAddEquipment}>
          Add Equipment
        </button>
      </div>

      <div className="equipment-grid">
        {equipmentList.map((item) => (
          <div className="card" key={item.id}>
            <h3>{item.name}</h3>
            <p><strong>ID:</strong> {item.id}</p>
            <p><strong>Owner:</strong> {item.borrower}</p>
            <p>
              <strong>Status:</strong>{" "}
              {item.isBorrowed ? "Borrowed" : "Available"}
            </p>

            {item.isBorrowed ? (
              <button
                className="card-button return-btn"
                onClick={() => handleReturn(item)}
              >
                Return
              </button>
            ) : (
              <button
                className="card-button borrow-btn"
                onClick={() => handleBorrow(item)}
              >
                Borrow
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
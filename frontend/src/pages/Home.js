import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserProvider } from "ethers";

function Home() {
  const [account, setAccount] = useState("");
  const navigate = useNavigate();

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask not installed");
        return;
      }

      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      alert("Wallet connection failed");
    }
  };

  return (
    <div className="hero-section">
      <h1>Equipment Borrowing DApp</h1>
      <p>Hybrid Blockchain System Using Ethereum</p>

      <div className="hero-buttons">
        <button className="btn btn-green" onClick={connectWallet}>
          Connect Wallet
        </button>

        <button className="btn btn-orange" onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </button>

        <button className="btn btn-blue" onClick={() => navigate("/history")}>
          View History
        </button>
      </div>

      {account && (
        <div className="wallet-box">
          Connected: {account.slice(0, 6)}...{account.slice(-4)}
        </div>
      )}
    </div>
  );
}

export default Home;
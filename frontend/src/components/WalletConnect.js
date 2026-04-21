import React, { useState } from "react";
import { BrowserProvider } from "ethers";

function WalletConnect() {
  const [account, setAccount] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not installed");
      return;
    }

    const provider = new BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);
  };

  return (
    <div>
      {account ? (
        <span>{account.slice(0, 6)}...{account.slice(-4)}</span>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}

export default WalletConnect;
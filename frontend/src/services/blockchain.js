import { ethers } from "ethers";
import EquipmentBorrowingABI from "../abis/EquipmentBorrowing.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const backendUrl = "http://localhost:5001";

export const getContract = async () => {
  if (!window.ethereum) {
    alert("MetaMask not installed");
    return null;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(
    contractAddress,
    EquipmentBorrowingABI.abi,
    signer
  );
};

export const borrowEquipment = async (id, name, owner, account) => {
  const contract = await getContract();
  if (!contract) return null;

  const tx = await contract.borrowEquipment(id);
  await tx.wait();

  await fetch(`${backendUrl}/save-transaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      equipment_name: name,
      equipment_id: id,
      action_type: "BORROW",
      owner_address: owner || "SYSTEM",
      borrower_address: account,
      tx_hash: tx.hash
    })
  });

  return tx;
};

export const returnEquipment = async (id, name, owner, account) => {
  const contract = await getContract();
  if (!contract) return null;

  const tx = await contract.returnEquipment(id);
  await tx.wait();

  await fetch(`${backendUrl}/save-transaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      equipment_name: name,
      equipment_id: id,
      action_type: "RETURN",
      owner_address: owner || "SYSTEM",
      borrower_address: account,
      tx_hash: tx.hash
    })
  });

  return tx;
};

export const addEquipment = async (name) => {
  const contract = await getContract();
  if (!contract) return null;

  const tx = await contract.addEquipment(name);
  await tx.wait();

  return tx;
};
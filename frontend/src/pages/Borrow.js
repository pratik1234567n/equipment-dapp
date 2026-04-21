import React, { useState } from "react";
import { borrowEquipment } from "../services/blockchain";

function Borrow() {
  const [equipmentId, setEquipmentId] = useState("");

  const handleBorrow = async (e) => {
    e.preventDefault();

    try {
      await borrowEquipment(equipmentId);
      alert("Equipment borrowed successfully");
      setEquipmentId("");
    } catch (error) {
      console.error(error);
      alert("Borrow failed");
    }
  };

  return (
    <div>
      <h1>Borrow Equipment</h1>
      <form className="form-box" onSubmit={handleBorrow}>
        <label>Equipment ID</label>
        <input
          type="number"
          value={equipmentId}
          onChange={(e) => setEquipmentId(e.target.value)}
          placeholder="Enter equipment ID"
          required
        />
        <button type="submit">Borrow</button>
      </form>
    </div>
  );
}

export default Borrow;
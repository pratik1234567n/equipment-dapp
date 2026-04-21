import React, { useState } from "react";
import { returnEquipment } from "../services/blockchain";

function Return() {
  const [equipmentId, setEquipmentId] = useState("");

  const handleReturn = async (e) => {
    e.preventDefault();

    try {
      await returnEquipment(equipmentId);
      alert("Equipment returned successfully");
      setEquipmentId("");
    } catch (error) {
      console.error(error);
      alert("Return failed");
    }
  };

  return (
    <div>
      <h1>Return Equipment</h1>
      <form className="form-box" onSubmit={handleReturn}>
        <label>Equipment ID</label>
        <input
          type="number"
          value={equipmentId}
          onChange={(e) => setEquipmentId(e.target.value)}
          placeholder="Enter equipment ID"
          required
        />
        <button type="submit">Return</button>
      </form>
    </div>
  );
}

export default Return;
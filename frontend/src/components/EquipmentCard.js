import React from "react";

function EquipmentCard({ item }) {
  return (
    <div className="card">
      <h3>{item.name}</h3>
      <p><strong>ID:</strong> {item.id}</p>
      <p>
        <strong>Status:</strong>{" "}
        {item.isBorrowed ? "Borrowed" : "Available"}
      </p>
    </div>
  );
}

export default EquipmentCard;
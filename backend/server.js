require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error("DB Connection Failed:", err);
    return;
  }
  console.log("Connected to MySQL");
});

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/save-transaction", (req, res) => {
  const {
    equipment_name,
    equipment_id,
    action_type,
    owner_address,
    borrower_address,
    tx_hash
  } = req.body;

  const sql = `
    INSERT INTO transaction_history
    (equipment_name, equipment_id, action_type, owner_address, borrower_address, tx_hash)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      equipment_name,
      equipment_id,
      action_type,
      owner_address || "SYSTEM",
      borrower_address,
      tx_hash
    ],
    (err, result) => {
      if (err) {
        console.error("Insert failed:", err);
        return res.status(500).json({ message: "Error saving transaction" });
      }

      res.status(201).json({
        message: "Transaction saved successfully",
        id: result.insertId
      });
    }
  );
});

app.get("/transactions", (req, res) => {
  const sql = `
    SELECT *
    FROM transaction_history
    ORDER BY action_time DESC, id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Fetch failed:", err);
      return res.status(500).json({ message: "Error fetching transactions" });
    }

    res.json(results);
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
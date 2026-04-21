# Equipment Borrowing DApp

## Project Description

This project is a blockchain-based system where users can:

* Add equipment
* Borrow equipment
* Return equipment
* View transaction history

It uses Ethereum (smart contract) and MySQL (database).

---

## Technologies Used

* Solidity
* Hardhat
* React.js
* Node.js
* MySQL
* MetaMask

---

## How to Run

### 1. Start blockchain

npx hardhat node

### 2. Deploy contract

npx hardhat run scripts/deploy.cjs --network localhost

### 3. Start backend

cd backend
node server.js

### 4. Start frontend

cd frontend
npm start

---

## Database

Create database in MySQL:

CREATE DATABASE equipment_dapp;

---

## Features

* Connect wallet
* Add equipment
* Borrow equipment
* Return equipment
* View history

---

## Author

Pratik

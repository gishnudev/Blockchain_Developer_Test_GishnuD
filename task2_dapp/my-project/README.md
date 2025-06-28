# 🎓 Scholarship dApp Frontend

A React + Vite frontend to interact with the Scholarship.sol smart contract. Built for managing and claiming scholarships on the Ethereum Sepolia testnet.

---

## 🛠 Tech Stack

- ⚛️ React (via Vite)
- 💅 Tailwind CSS
- 🔗 Ethers.js
- 🔐 MetaMask for wallet connection
- 📜 Sepolia testnet deployment

## 🎯 Features

### 👑 Admin Interface

- Connect wallet (MetaMask)
- Only owner can access Admin Dashboard
- Create a new scholarship with:
    - ID
    - Recipient address
    - Amount (in ETH)
    - Deadline (datetime input)

### 🌍 Public Claim Interface

- Connect wallet
- Input scholarship ID to load details
- View recipient, amount, deadline, claim status
- If you're the assigned recipient, claim the scholarship before deadline


## 🔧 Setup Instructions

### 📦 Install dependencies

Run:

```bash
npm install
```

### 🧪 Start local dev server

```bash
npm run dev
```

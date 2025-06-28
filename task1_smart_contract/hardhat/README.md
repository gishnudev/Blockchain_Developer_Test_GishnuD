# Scholarship Smart Contract

A smart contract that allows the contract owner to create scholarships for recipients, which can be claimed before a deadline.

---

## Contract: `Scholarship.sol`

### Functions

- `createScholarship(uint256 id, address recipient, uint256 amount, uint256 deadline)`
  - Only callable by the owner (Ownable)
  - Creates a new scholarship with a specific ID
  - Emits ScholarshipCreated

- `claimScholarship(uint256 id)`
  - Callable only by the recipient
  - Can only be called before the deadline
  - Transfers the scholarship amount to the recipient
  - Emits ScholarshipClaimed

- `getScholarship(uint256 id)`
  - View function returning:
  - recipient
  - amount
  - deadline
  - claimed

### Events

- `ScholarshipCreated(uint256 id, address recipient, uint256 amount, uint256 deadline)`
- `ScholarshipClaimed(uint256 id, address recipient, uint256 amount)`

---

## Testing

Run:

```bash
npx hardhat test
```

## Deployment Guide: Scholarship Smart Contract

This guide walks you through deploying the `Scholarship.sol` smart contract to the **Sepolia testnet** using **Hardhat**.

---

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or later)
- npm or yarn
- Hardhat (`npx hardhat`)
- Infura or Alchemy account

---

###  Environment Setup

Create a `.env` file in the root of your project:

```env
PRIVATE_KEY=your_private_key_without_0x
INFURA_API_KEY=your_infura_project_id
```
### 🔧 1. Configure hardhat.config.js

Update your Hardhat config file

### 2. Create a Deployment Script

Create a new file: scripts/deploy.js

###  3. Deploy to Sepolia

Run the following command:

```bash
npx hardhat ignition deploy ignition/modules/deploy.js --network sepolia
```

###  Verify Deployment

Check your contract on:

Sepolia Etherscan: https://sepolia.etherscan.io/address/0xEd3C37124dc60A85412432aC89fc6932045a9Bf4

Use the same wallet to view sent transactions

### Deployment Address

0xEd3C37124dc60A85412432aC89fc6932045a9Bf4

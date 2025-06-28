## Task 4: Gas Optimization Analysis

### ✅ Objective
The goal of this task was to optimize the `Scholarship.sol` smart contract by identifying at least one gas-inefficient area and improving it while maintaining all core functionalities. The process was verified using Hardhat tests and the `hardhat-gas-reporter` plugin.

---

### ⚠️ Issue Identified

In the original contract, the `Scholarship` struct included several `string` fields such as `title`, `description`, `eligibility`, and `amount`. Storing multiple strings on-chain can lead to high gas consumption due to their dynamic nature and storage cost.

```solidity
struct Scholarship {
    uint256 scholarshipId;
    string title;
    string description;
    string eligibility;
    string amount;
    bool claimed;
    address claimant;
}

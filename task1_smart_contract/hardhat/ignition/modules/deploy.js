// ignition/modules/deploy.js

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ScholarshipModule", (m) => {
  const scholarship = m.contract("Scholarship");

  return {
    contracts: [scholarship] // ✅ This is what fixes the `.futures is not iterable` error
  };
});

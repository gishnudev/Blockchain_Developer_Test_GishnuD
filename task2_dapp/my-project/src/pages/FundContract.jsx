import React, { useState } from "react";
import { ethers } from "ethers";
import useWallet from "../hooks/useWallet";

const FundContract = () => {
  const { connect, account, signer, contract } = useWallet();
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const handleFund = async () => {
    if (!signer || !contract) {
      alert("Please connect your wallet.");
      return;
    }

    try {
      setStatus("⏳ Sending ETH...");
      const tx = await signer.sendTransaction({
        to: contract.target, // or CONTRACT_ADDRESS
        value: ethers.parseEther(amount),
      });

      await tx.wait();
      setStatus(`✅ Sent ${amount} ETH to the contract!`);
      setAmount("");
    } catch (err) {
      console.error("Funding failed:", err);
      setStatus("❌ Failed to send ETH.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">💰 Fund the Scholarship Contract</h2>

      {!account ? (
        <button
          onClick={connect}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Connect Wallet
        </button>
      ) : (
        <>
          <p className="text-sm text-gray-600 text-center mb-4">Connected as: {account}</p>

          <input
            type="number"
            step="0.000001"
            placeholder="Amount in ETH"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border p-2 rounded mb-4"
          />

          <button
            onClick={handleFund}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
          >
            Send ETH
          </button>

          {status && <p className="text-center mt-4 font-medium">{status}</p>}
        </>
      )}
    </div>
  );
};

export default FundContract;

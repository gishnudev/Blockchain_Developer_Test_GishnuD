import React, { useState } from "react";
import useWallet from "../hooks/useWallet";
import { ethers } from "ethers";

const ClaimScholarship = () => {
  const { connect, account, contract } = useWallet();

  const [scholarshipId, setScholarshipId] = useState("");
  const [details, setDetails] = useState(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleLoad = async () => {
    try {
      if (!contract) return setError("Contract not loaded");

      const data = await contract.getScholarship(scholarshipId);
      setDetails(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Scholarship not found or fetch error.");
    }
  };

  const handleClaim = async () => {
    try {
      if (!contract) return setError("Contract not loaded");
  
      // Extra check: fetch and log scholarship details before claiming
      const data = await contract.getScholarship(scholarshipId);
      console.log("⏳ Attempting to claim scholarship:", data);
      console.log("📅 Deadline:", Number(data.deadline), "Now:", Math.floor(Date.now() / 1000));
      console.log("👤 Recipient:", data.recipient, "Your Address:", account);
      console.log("✅ Already Claimed:", data.claimed);
  
      const tx = await contract.claimScholarship(scholarshipId);
      setStatus("⏳ Claiming...");
      await tx.wait();
      setStatus("✅ Scholarship claimed successfully!");
      setError("");
    } catch (err) {
      console.error("Claim failed:", err);
      setError("❌ Claim failed. Check if you're the recipient, it's unclaimed, and before the deadline.");
    }
  };
  
  
  

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">🎓 Claim Scholarship</h2>

      {!account ? (
        <button
          onClick={connect}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
        >
          Connect Wallet
        </button>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter Scholarship ID"
            value={scholarshipId}
            onChange={(e) => setScholarshipId(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          />
          <button
            onClick={handleLoad}
            className="bg-gray-700 text-white px-4 py-2 rounded w-full"
          >
            Load Scholarship
          </button>

          {details && (
            <div className="bg-gray-100 p-4 rounded mt-4 text-sm">
              <p><strong>Recipient:</strong> {details.recipient}</p>
              <p><strong>Amount:</strong> {ethers.formatEther(details.amount)} ETH</p>
              <p><strong>Claimed:</strong> {details.claimed ? "Yes" : "No"}</p>
              <p><strong>Deadline:</strong> {new Date(Number(details.deadline) * 1000).toLocaleString()}</p>
              {details && !details.claimed && details.recipient.toLowerCase() === account.toLowerCase() && (
                <button onClick={handleClaim} className="bg-green-600 text-white px-4 py-2 rounded mt-4 w-full">
                    Claim
                </button>
                )}

            </div>
          )}

          {status && <p className="text-green-600 mt-4 text-center">{status}</p>}
          {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        </>
      )}
    </div>
  );
};

export default ClaimScholarship;

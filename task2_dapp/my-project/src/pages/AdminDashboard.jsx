import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import useWallet from "../hooks/useWallet";

const AdminDashboard = () => {
  const { connect, account, contract } = useWallet();

  const [isOwner, setIsOwner] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    recipient: "",
    amount: "",
    deadline: "",
  });

  const [status, setStatus] = useState("");

  useEffect(() => {
    const checkOwner = async () => {
      if (contract && account) {
        try {
          const owner = await contract.owner();
          setIsOwner(owner.toLowerCase() === account.toLowerCase());
        } catch (err) {
          console.error("Error checking owner:", err);
        }
      }
    };
    checkOwner();
  }, [contract, account]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contract) return alert("Contract not connected");

    const { id, recipient, amount, deadline } = formData;

    try {
      const tx = await contract.createScholarship(
        id,
        recipient,
        ethers.parseEther(amount),
        Math.floor(new Date(deadline).getTime() / 1000)
      );
      setStatus("⏳ Waiting for confirmation...");
      await tx.wait();
      setStatus("✅ Scholarship created!");
    } catch (err) {
      console.error("Transaction failed:", err);
      setStatus("❌ Failed to create scholarship");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">🎓 Admin Dashboard</h2>

      {!account ? (
        <button
          onClick={connect}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Connect Wallet
        </button>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-4 text-center">Connected as: {account}</p>
          {isOwner ? (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="id"
                  placeholder="Scholarship ID"
                  value={formData.id}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
                <input
                  type="text"
                  name="recipient"
                  placeholder="Recipient Address"
                  value={formData.recipient}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
                <input
                  type="number"
                  name="amount"
                  placeholder="Amount in ETH"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
                <input
                  type="datetime-local"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                >
                  Create Scholarship
                </button>
              </form>
              {status && <p className="text-center mt-4 font-medium">{status}</p>}
            </>
          ) : (
            <p className="text-red-500 text-center font-semibold mt-4">
              ❌ You are not the contract owner.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;

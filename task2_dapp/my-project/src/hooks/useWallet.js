import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants/contract";

const useWallet = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  const connect = async () => {
    if (!window.ethereum) return alert("MetaMask is not installed.");
    const prov = new ethers.BrowserProvider(window.ethereum);
    const signer = await prov.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    const address = await signer.getAddress();
  
    // console.log("🧠 ABI methods:", contract.interface.fragments.map(f => f.name));
    // console.log("🧪 Contract available methods:");
    // contract.interface.fragments.forEach(frag => {
    //   if (frag.type === "function") {
    //     console.log(`  🛠 ${frag.name}(${frag.inputs.map(i => i.type).join(", ")})`);
    //   }
    // });
  
    setProvider(prov);
    setSigner(signer);
    setContract(contract);
    setAccount(address);
  };
  

  return { connect, account, contract, signer };
};

export default useWallet;

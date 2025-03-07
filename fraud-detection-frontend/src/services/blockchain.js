// src/services/blockchain.js
import { ethers } from "ethers"; // Add at top

export const getContract = async () => {
    if (!window.ethereum) throw new Error("MetaMask not installed");
    
    // Request connection first
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    
    // Now get the signer
    const signer = await provider.getSigner();
    
    return new ethers.Contract(
      import.meta.env.VITE_CONTRACT_ADDRESS,
      [
        "function addTransaction(address _receiver, uint256 _amount)",
        "function getTransaction(uint256 _id) view returns (tuple(uint256 id, address sender, address receiver, uint256 amount, uint256 timestamp, bool isFraudulent))",
        "function transactionCount() view returns (uint256)"
      ],
      signer
    );
  };
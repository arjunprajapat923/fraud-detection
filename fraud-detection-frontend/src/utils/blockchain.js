import { ethers } from "ethers";

export const connectBlockchain = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  
  return {
    provider,
    signer,
    network: await provider.getNetwork()
  };
};

export const loadContract = async () => {
  const { signer } = await connectBlockchain();
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
import { ethers } from "ethers";
import { useState } from 'react';
import { useBlockchain } from "../hooks/useBlockchain";
import { toast } from 'react-toastify';

export default function CreateTransaction() {
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { contract } = useBlockchain();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const tx = await contract.addTransaction(receiver, ethers.parseEther(amount));
      await tx.wait();
      setReceiver('');
      setAmount('');
      toast.success("Transaction added successfully!");
    } catch (error) {
      toast.error(`Failed: ${error.reason || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input fields same as before */}
    </form>
  );
}
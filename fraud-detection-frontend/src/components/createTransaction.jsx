// import { ethers } from "ethers";
// import { useState } from 'react';
// import { useBlockchain } from "../hooks/useBlockchain";
// import { toast } from 'react-toastify';

// export default function CreateTransaction() {
//   const [receiver, setReceiver] = useState('');
//   const [amount, setAmount] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { contract } = useBlockchain();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       const tx = await contract.addTransaction(receiver, ethers.parseEther(amount));
//       await tx.wait();
//       setReceiver('');
//       setAmount('');
//       toast.success("Transaction added successfully!");
//     } catch (error) {
//       toast.error(`Failed: ${error.reason || error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {/* Input fields same as before */}
//     </form>
//   );
// }


// "use client"

// import { ethers } from "ethers"
// import { useState } from "react"
// import { toast } from "react-toastify"

// export default function CreateTransaction({ contract, account }) {
//   const [receiver, setReceiver] = useState("")
//   const [amount, setAmount] = useState("")
//   const [loading, setLoading] = useState(false)

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!ethers.isAddress(receiver)) {
//       toast.error("Invalid Ethereum address");
//       return;
//     }
  
//     try {
//       setLoading(true);
      
//       // Validate contract balance first
//       const balance = await provider.getBalance(contract.address);
//       if (balance === 0n) {
//         throw new Error("Contract has insufficient funds");
//       }
  
//       // Estimate gas first
//       const gasEstimate = await contract.addTransaction.estimateGas(
//         receiver,
//         ethers.parseEther(amount)
//       );
  
//       const tx = await contract.addTransaction(receiver, ethers.parseEther(amount), {
//         gasLimit: gasEstimate + 10000n // Add buffer
//       });
  
//       const receipt = await tx.wait();
      
//       if (receipt.status !== 1) {
//         throw new Error("Transaction reverted silently");
//       }
  
//       // ... success handling
  
//     } catch (error) {
//       console.error("Full error details:", error);
      
//       let message = error.shortMessage || error.message;
//       if (error.info && error.info.error) {
//         message = error.info.error.message;
//       }
      
//       toast.error(`Transaction failed: ${message}`);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow-md">
//       <h2 className="text-xl font-bold mb-4">Send Transaction</h2>

//       {account && (
//         <div className="mb-4">
//           <p className="text-sm text-gray-600">Connected Account:</p>
//           <p className="font-mono text-sm">
//             {account.slice(0, 6)}...{account.slice(-4)}
//           </p>
//         </div>
//       )}

//       <div>
//         <label htmlFor="receiver" className="block text-sm font-medium text-gray-700 mb-1">
//           Receiver Address
//         </label>
//         <input
//           id="receiver"
//           type="text"
//           value={receiver}
//           onChange={(e) => setReceiver(e.target.value)}
//           placeholder="0x..."
//           className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//           disabled={loading || !contract}
//         />
//       </div>

//       <div>
//         <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
//           Amount (ETH)
//         </label>
//         <input
//           id="amount"
//           type="number"
//           step="0.0001"
//           min="0"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder="0.01"
//           className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//           disabled={loading || !contract}
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={loading || !contract}
//         className={`w-full py-2 px-4 rounded-md text-white font-medium ${
//           loading || !contract ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 transition-colors"
//         }`}
//       >
//         {loading ? "Processing..." : "Send Transaction"}
//       </button>
//     </form>
//   )
// }




import { useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";

export default function CreateTransaction({ contract, account }) {
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contract || !account) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!receiver || !amount) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      
      if (!ethers.isAddress(receiver)) {
        throw new Error("Invalid Ethereum address");
      }

      // Estimate gas first
      const parsedAmount = ethers.parseEther(amount);
      const gasEstimate = await contract.addTransaction.estimateGas(receiver, parsedAmount);

      const tx = await contract.addTransaction(receiver, parsedAmount, {
        gasLimit: gasEstimate + 10000n
      });

      toast.info("Transaction submitted...");
      const receipt = await tx.wait();

      if (receipt.status === 1) {
        toast.success("Transaction confirmed!");
        setReceiver("");
        setAmount("");
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.error("Transaction error:", error);
      toast.error(error.reason || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Send Transaction</h2>

      {account && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">Connected Account:</p>
          <p className="font-mono text-sm">
            {`${account.slice(0, 6)}...${account.slice(-4)}`}
          </p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Receiver Address
        </label>
        <input
          type="text"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          placeholder="0x..."
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Amount (ETH)
        </label>
        <input
          type="number"
          step="0.0001"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.01"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Processing..." : "Send Transaction"}
      </button>
    </form>
  );
}
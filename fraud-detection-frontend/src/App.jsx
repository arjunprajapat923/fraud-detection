// import { useEffect, useState } from "react";
// import { ethers } from "ethers"; // <-- Add this line here
// import { useBlockchain } from "./hooks/useBlockchain";
// import TransactionList from "./components/TransactionList";
// import CreateTransaction from "./components/createTransaction";
// import WalletConnector from "./components/WalletConnector";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./App.css";
// export default function App() {
//   const { contract, account, error } = useBlockchain();
//   const [balance, setBalance] = useState("");
//   const [network, setNetwork] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const initialize = async () => {
//       try {
//         if (contract?.runner && account) {
//           const provider = contract.runner.provider;
//           const [balance, network] = await Promise.all([
//             provider.getBalance(account),
//             provider.getNetwork()
//           ]);
//           console.log(network)
//           setBalance(ethers.formatEther(balance));
//           setNetwork(`${network.name} (${network.chainId})`);
//         }
//       } catch (err) {
//         toast.error(`Initialization error: ${err.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     initialize();
//   }, [contract, account]);

//   if (loading) {
//     return (
//       <div className="loading-screen">
//         <div className="spinner"></div>
//         <p>Connecting to blockchain...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="error-screen">
//         <h2>Connection Error</h2>
//         <p>{error}</p>
//         <div className="action-buttons">
//           <WalletConnector />
//           <button 
//             onClick={() => window.location.reload()}
//             className="retry-button"
//           >
//             Retry Connection
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!account) {
//     return (
//       <div className="connect-wallet-screen">
//         <h1>Welcome to Fraud Detection System</h1>
//         <WalletConnector />
//         <p className="disclaimer">
//           Please connect your MetaMask wallet to continue
//         </p>
//       </div>
//     );
//   }
// // console.log(account, network);
//   return (
//     <div className="app-container">
//       <header className="app-header">
//         <h1>Blockchain Fraud Detection</h1>
//         <div className="wallet-info">
//           <div className="network-badge">{network}</div>
//           <div className="account-info">
//             <span style={{background: "black"}} className="text-black">
//               {/* {account} */}
//               {`${account.slice(0, 6)}...${account.slice(-4)}`}
//               </span>
//             <span className="balance">{balance} ETH</span>
//           </div>
//         </div>
//       </header>

//       <main className="main-content">
//         <section className="transaction-section">
//           <h2>New Transaction</h2>
//           <CreateTransaction contract={contract} />
//         </section>

//         <section className="transactions-section">
//           <h2>Transaction History</h2>
//           <TransactionList contract={contract} />
//         </section>
//       </main>

//       <ToastContainer
//         position="bottom-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </div>
//   );
// }









// import { useState, useEffect } from "react"
// import { ToastContainer } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
// import { getContract } from "./services/blockchain"
// import WalletConnector from "./components/WalletConnector"
// import CreateTransaction from "./components/createTransaction"
// import TransactionList from "./components/TransactionList"
// import { ethers } from "ethers" // Import ethers

// function App() {
//   const [contract, setContract] = useState(null)
//   const [account, setAccount] = useState("")
//   const [networkInfo, setNetworkInfo] = useState(null)

//   const handleConnect = async (connectedAccount) => {
//     try {
//       const contractInstance = await getContract()
//       setContract(contractInstance)
//       setAccount(connectedAccount)

//       // Get network info
//       const provider = new ethers.BrowserProvider(window.ethereum)
//       const network = await provider.getNetwork()
//       setNetworkInfo({
//         name: network.name,
//         chainId: network.chainId,
//       })
//     } catch (error) {
//       console.error("Error connecting:", error)
//     }
//   }

//   // Listen for account changes
//   useEffect(() => {
//     if (window.ethereum) {
//       window.ethereum.on("accountsChanged", (accounts) => {
//         if (accounts.length > 0) {
//           setAccount(accounts[0])
//         } else {
//           setAccount("")
//           setContract(null)
//         }
//       })

//       window.ethereum.on("chainChanged", () => {
//         window.location.reload()
//       })
//     }

//     return () => {
//       if (window.ethereum) {
//         window.ethereum.removeAllListeners("accountsChanged")
//         window.ethereum.removeAllListeners("chainChanged")
//       }
//     }
//   }, [])

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-4xl">
//       <header className="mb-8">
//         <h1 className="text-3xl font-bold mb-2">Blockchain Transaction App</h1>
//         <div className="flex justify-between items-center">
//           <div>
//             {!account ? (
//               <WalletConnector onConnect={handleConnect} />
//             ) : (
//               <div className="bg-gray-100 p-3 rounded-lg">
//                 <p className="text-sm text-gray-600">Connected Account:</p>
//                 <p className="font-mono font-medium">
//                   {account.slice(0, 10)}...{account.slice(-8)}
//                 </p>
//                 {networkInfo && (
//                   <p className="text-xs text-gray-500 mt-1">
//                     Network: {networkInfo.name} (Chain ID: {networkInfo.chainId.toString()})
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div>
//           <CreateTransaction contract={contract} account={account} />
//         </div>
//         <div>
//           <TransactionList contract={contract} />
//         </div>
//       </div>

//       <ToastContainer position="bottom-right" />
//     </div>
//   )
// }

// export default App



import { ethers } from "ethers";

import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getContract } from "./services/blockchain";
import WalletConnector from "./components/WalletConnector";
import CreateTransaction from "./components/CreateTransaction";
import TransactionList from "./components/TransactionList";

export default function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [networkInfo, setNetworkInfo] = useState(null);

  const handleConnect = async (connectedAccount) => {
    try {
      const contractInstance = await getContract();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();

      setContract(contractInstance);
      setAccount(connectedAccount);
      setNetworkInfo({
        name: network.name,
        chainId: network.chainId.toString(),
      });
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts) => {
      setAccount(accounts[0] || "");
      if (!accounts[0]) setContract(null);
    };

    const handleChainChanged = () => window.location.reload();

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Fraud Detection System</h1>
        <div className="flex justify-between items-center">
          <div>
            {!account ? (
              <WalletConnector onConnect={handleConnect} />
            ) : (
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Connected Account:</p>
                <p className="font-mono font-medium">
                  {`${account.slice(0, 10)}...${account.slice(-8)}`}
                </p>
                {networkInfo && (
                  <p className="text-xs text-gray-500 mt-1">
                    Network: {networkInfo.name} (Chain ID: {networkInfo.chainId})
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <CreateTransaction contract={contract} account={account} />
        </div>
        <div>
          <TransactionList contract={contract} />
        </div>
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
}

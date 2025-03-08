// // export default function WalletConnector() {
// //   const [connecting, setConnecting] = useState(false);

// //   const connectWallet = async () => {
// //     try {
// //       setConnecting(true);
// //       if (!window.ethereum) throw new Error("MetaMask extension required");
      
// //       const accounts = await window.ethereum.request({
// //         method: "eth_requestAccounts"
// //       });
      
// //       if (!accounts[0]) throw new Error("No accounts found");
// //       window.location.reload(); // Force refresh after connection
// //     } catch (error) {
// //       toast.error(`Connection failed: ${error.message}`);
// //     } finally {
// //       setConnecting(false);
// //     }
// //   };

// //   return (
// //     <button 
// //       onClick={connectWallet}
// //       disabled={connecting}
// //       className="connect-button"
// //     >
// //       {connecting ? "Connecting..." : "Connect MetaMask"}
// //     </button>
// //   );
// // }

// import { useState } from "react";

// export default function WalletConnector() {
//   const [connecting, setConnecting] = useState(false);

//   const connectWallet = async () => {
//     try {
//       setConnecting(true);
//       if (!window.ethereum) throw new Error("MetaMask extension required");
//       console.log("hello world", window.ethereum);
//       const accounts = await window.ethereum.request({
//         method: "eth_requestAccounts"
//       });
      
//       if (!accounts[0]) throw new Error("No accounts found");
//       console.log(accounts);
//       // window.location.reload(); // Force refresh after connection
//     } catch (error) {
//       toast.error(`Connection failed: ${error.message}`);
//     } finally {
//       setConnecting(false);
//     }
//   };

//   return (
//     <button 
//       onClick={connectWallet}
//       disabled={connecting}
//       className="connect-button"
//     >
//       {connecting ? "Connecting..." : "Connect MetaMask"}
//     </button>
//   );
// }




// "use client"

// import { useState } from "react"
// import { toast } from "react-toastify"

// export default function WalletConnector({ onConnect }) {
//   const [connecting, setConnecting] = useState(false)

//   const connectWallet = async () => {
//     try {
//       setConnecting(true)
//       if (!window.ethereum) throw new Error("MetaMask extension required")

//       const accounts = await window.ethereum.request({
//         method: "eth_requestAccounts",
//       })

//       if (!accounts[0]) throw new Error("No accounts found")

//       // Call the onConnect callback with the connected account
//       onConnect(accounts[0])
//       toast.success("Wallet connected successfully!")
//     } catch (error) {
//       toast.error(`Connection failed: ${error.message}`)
//     } finally {
//       setConnecting(false)
//     }
//   }

//   return (
//     <button
//       onClick={connectWallet}
//       disabled={connecting}
//       className="connect-button bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
//     >
//       {connecting ? "Connecting..." : "Connect MetaMask"}
//     </button>
//   )
// }

import { useState } from "react";
import { toast } from "react-toastify";

export default function WalletConnector({ onConnect }) {
  const [connecting, setConnecting] = useState(false);

  const connectWallet = async () => {
    try {
      setConnecting(true);
      if (!window.ethereum) throw new Error("Please install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (!accounts[0]) throw new Error("No accounts found");
      onConnect(accounts[0]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setConnecting(false);
    }
  };

  return (
    <button
      onClick={connectWallet}
      disabled={connecting}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
    >
      {connecting ? "Connecting..." : "Connect Wallet"}
    </button>
  );
}
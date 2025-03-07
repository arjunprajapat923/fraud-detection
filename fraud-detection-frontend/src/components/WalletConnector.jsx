// export default function WalletConnector() {
//   const [connecting, setConnecting] = useState(false);

//   const connectWallet = async () => {
//     try {
//       setConnecting(true);
//       if (!window.ethereum) throw new Error("MetaMask extension required");
      
//       const accounts = await window.ethereum.request({
//         method: "eth_requestAccounts"
//       });
      
//       if (!accounts[0]) throw new Error("No accounts found");
//       window.location.reload(); // Force refresh after connection
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



export default function WalletConnector() {
  const [connecting, setConnecting] = useState(false);

  const connectWallet = async () => {
    try {
      setConnecting(true);
      if (!window.ethereum) throw new Error("MetaMask extension required");
      
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      
      if (!accounts[0]) throw new Error("No accounts found");
      window.location.reload(); // Force refresh after connection
    } catch (error) {
      toast.error(`Connection failed: ${error.message}`);
    } finally {
      setConnecting(false);
    }
  };

  return (
    <button 
      onClick={connectWallet}
      disabled={connecting}
      className="connect-button"
    >
      {connecting ? "Connecting..." : "Connect MetaMask"}
    </button>
  );
}
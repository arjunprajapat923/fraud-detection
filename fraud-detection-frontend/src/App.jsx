import { useEffect, useState } from "react";
import { ethers } from "ethers"; // <-- Add this line here
import { useBlockchain } from "./hooks/useBlockchain";
import TransactionList from "./components/TransactionList";
import CreateTransaction from "./components/createTransaction";
import WalletConnector from "./components/WalletConnector";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
export default function App() {
  const { contract, account, error } = useBlockchain();
  const [balance, setBalance] = useState("");
  const [network, setNetwork] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        if (contract?.runner && account) {
          const provider = contract.runner.provider;
          const [balance, network] = await Promise.all([
            provider.getBalance(account),
            provider.getNetwork()
          ]);
          
          setBalance(ethers.formatEther(balance));
          setNetwork(`${network.name} (${network.chainId})`);
        }
      } catch (err) {
        toast.error(`Initialization error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [contract, account]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Connecting to blockchain...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <h2>Connection Error</h2>
        <p>{error}</p>
        <div className="action-buttons">
          <WalletConnector />
          <button 
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="connect-wallet-screen">
        <h1>Welcome to Fraud Detection System</h1>
        <WalletConnector />
        <p className="disclaimer">
          Please connect your MetaMask wallet to continue
        </p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Blockchain Fraud Detection</h1>
        <div className="wallet-info">
          <div className="network-badge">{network}</div>
          <div className="account-info">
            <span>{`${account.slice(0, 6)}...${account.slice(-4)}`}</span>
            <span className="balance">{balance} ETH</span>
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="transaction-section">
          <h2>New Transaction</h2>
          <CreateTransaction contract={contract} />
        </section>

        <section className="transactions-section">
          <h2>Transaction History</h2>
          <TransactionList contract={contract} />
        </section>
      </main>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
import { useEffect, useState } from "react";
import { useBlockchain } from "../hooks/useBlockchain";

export default function TransactionList() {
  const { contract } = useBlockchain();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const count = await contract.transactionCount();
        
        const txArray = [];
        for (let i = 1; i <= count; i++) {
          txArray.push(await contract.getTransaction(i));
        }
        
        setTransactions(txArray);
      } catch (error) {
        console.error("Error loading transactions:", error);
      }
    };

    contract && loadTransactions();
  }, [contract]);

  return (
    <div className="transactions">
      <h2>Recent Transactions</h2>
      {transactions.map(tx => (
        <div key={tx.id} className={`tx-card ${tx.isFraudulent ? 'fraud' : ''}`}>
          <p>TX #{tx.id.toString()}</p>
          <p>From: {tx.sender.slice(0, 6)}...{tx.sender.slice(-4)}</p>
          <p>To: {tx.receiver.slice(0, 6)}...{tx.receiver.slice(-4)}</p>
          <p>Amount: {ethers.formatEther(tx.amount)} ETH</p>
          {tx.isFraudulent && <span className="fraud-badge">Fraud Detected</span>}
        </div>
      ))}
    </div>
  );
}
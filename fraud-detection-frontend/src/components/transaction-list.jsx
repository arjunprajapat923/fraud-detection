"use client"

import { useEffect, useState } from "react"
import { ethers } from "ethers"

export default function TransactionList({ contract }) {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadTransactions = async () => {
      if (!contract) return

      try {
        setLoading(true)
        const count = await contract.transactionCount()

        const txArray = []
        for (let i = 1; i <= count; i++) {
          txArray.push(await contract.getTransaction(i))
        }

        setTransactions(txArray)
      } catch (error) {
        console.error("Error loading transactions:", error)
      } finally {
        setLoading(false)
      }
    }

    contract && loadTransactions()
  }, [contract])

  if (loading) {
    return <div className="text-center py-4">Loading transactions...</div>
  }

  return (
    <div className="transactions space-y-4">
      <h2 className="text-xl font-bold">Recent Transactions</h2>

      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions found</p>
      ) : (
        transactions.map((tx) => (
          <div
            key={tx.id.toString()}
            className={`tx-card p-4 rounded-lg shadow-md ${
              tx.isFraudulent ? "bg-red-50 border border-red-200" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <p className="font-bold">TX #{tx.id.toString()}</p>
              {tx.isFraudulent && (
                <span className="fraud-badge bg-red-500 text-white text-xs px-2 py-1 rounded-full">Fraud Detected</span>
              )}
            </div>
            <p className="text-sm">
              <span className="text-gray-600">From:</span> {tx.sender.slice(0, 6)}...{tx.sender.slice(-4)}
            </p>
            <p className="text-sm">
              <span className="text-gray-600">To:</span> {tx.receiver.slice(0, 6)}...{tx.receiver.slice(-4)}
            </p>
            <p className="text-sm font-medium">
              <span className="text-gray-600">Amount:</span> {ethers.formatEther(tx.amount)} ETH
            </p>
            <p className="text-xs text-gray-500 mt-2">{new Date(Number(tx.timestamp) * 1000).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  )
}


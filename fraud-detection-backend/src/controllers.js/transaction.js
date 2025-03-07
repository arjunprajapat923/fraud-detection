import { contract } from '../services/blockchain';

export const getFraudulentTransactions = async (req, res) => {
  try {
    const transactions = await contract.getFraudulentTransactions();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

export const markAsFraudulent = async (req, res) => {
  try {
    const { transactionId } = req.body;
    const tx = await contract.markAsFraudulent(transactionId);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: error.reason || 'Transaction failed' });
  }
};
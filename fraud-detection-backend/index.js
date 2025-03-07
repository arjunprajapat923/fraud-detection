const express = require('express');
const { addTransaction, markAsFraudulent, getFraudulentTransactions } = require('./utils');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/addTransaction', async (req, res) => {
    const { sender, receiver, amount } = req.body;
    await addTransaction(sender, receiver, amount);
    res.send("Transaction added successfully");
});

app.post('/markFraud', async (req, res) => {
    const { transactionId } = req.body;
    await markAsFraudulent(transactionId);
    res.send(`Transaction ${transactionId} marked as fraudulent.`);
});

app.get('/fraudulentTransactions', async (req, res) => {
    const transactions = await getFraudulentTransactions();
    res.json(transactions);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

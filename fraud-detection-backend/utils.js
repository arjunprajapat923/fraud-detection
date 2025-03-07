const contract = require('./contract');

async function addTransaction(sender, receiver, amount) {
    try {
        const tx = await contract.addTransaction(sender, receiver, amount);
        await tx.wait();
        console.log(`Transaction added: ${tx.hash}`);
    } catch (error) {
        console.error("Error adding transaction:", error);
    }
}

async function markAsFraudulent(transactionId) {
    try {
        const tx = await contract.markAsFraudulent(transactionId);
        await tx.wait();
        console.log(`Transaction ${transactionId} marked as fraudulent.`);
    } catch (error) {
        console.error("Error marking transaction as fraudulent:", error);
    }
}

async function getFraudulentTransactions() {
    try {
        const transactions = await contract.getFraudulentTransactions();
        console.log("Fraudulent Transactions:", transactions);
        return transactions;
    } catch (error) {
        console.error("Error fetching fraudulent transactions:", error);
    }
}

module.exports = {
    addTransaction,
    markAsFraudulent,
    getFraudulentTransactions
};

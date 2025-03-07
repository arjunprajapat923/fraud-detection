require('dotenv').config();
const ethers = require('ethers');

const provider = new ethers.JsonRpcProvider(process.env.TESTNET_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = require('./contractABI.json'); // Put your ABI here

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

module.exports = contract;

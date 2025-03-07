import { ethers } from 'ethers';
import env from '../config/env';
import FraudDetection from '../utils/contracts/FraudDetection.json';

const provider = new ethers.JsonRpcProvider(env.RPC_URL);
const wallet = new ethers.Wallet(env.PRIVATE_KEY, provider);

export const contract = new ethers.Contract(
  env.CONTRACT_ADDRESS,
  FraudDetection.abi,
  wallet
);

export const validateAddress = (address) => {
  return ethers.isAddress(address);
};
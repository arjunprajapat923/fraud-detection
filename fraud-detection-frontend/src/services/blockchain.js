// // // src/services/blockchain.js
// // import { ethers } from "ethers"; // Add at top

// // export const getContract = async () => {
// //     if (!window.ethereum) throw new Error("MetaMask not installed");
    
// //     // Request connection first
// //     const provider = new ethers.BrowserProvider(window.ethereum);
// //     await provider.send("eth_requestAccounts", []);
    
// //     // Now get the signer
// //     const signer = await provider.getSigner();
    
// //     return new ethers.Contract(
// //       import.meta.env.VITE_CONTRACT_ADDRESS,
// //       [
// //         "function addTransaction(address _receiver, uint256 _amount)",
// //         "function getTransaction(uint256 _id) view returns (tuple(uint256 id, address sender, address receiver, uint256 amount, uint256 timestamp, bool isFraudulent))",
// //         "function transactionCount() view returns (uint256)"
// //       ],
// //       signer
// //     );
// //   };




// // import { ethers } from "ethers"

// // export const getContract = async () => {
// //   if (!window.ethereum) throw new Error("MetaMask not installed");

// //   try {
// //     const provider = new ethers.BrowserProvider(window.ethereum);
// //     await provider.send("eth_requestAccounts", []);
    
// //     // Validate network first
// //     const network = await provider.getNetwork();
// //     if (network.chainId !== 11155111n) { // Sepolia chain ID
// //       throw new Error("Please connect to Sepolia network");
// //     }

// //     const signer = await provider.getSigner();
    
// //     return new ethers.Contract(
// //       import.meta.env.VITE_CONTRACT_ADDRESS,
// //       [
// //         "function addTransaction(address _receiver, uint256 _amount) returns (bool)",
// //         "function getTransaction(uint256) view returns (tuple(uint256,address,address,uint256,uint256,bool))",
// //         "function transactionCount() view returns (uint256)"
// //       ],
// //       signer
// //     );
// //   } catch (error) {
// //     console.error("Contract connection error:", error);
// //     throw new Error(`Blockchain connection failed: ${error.message}`);
// //   }
// // };



// import { ethers } from "ethers";

// export const getContract = async () => {
//   if (!window.ethereum) throw new Error("MetaMask not installed");

//   try {
//     const provider = new ethers.BrowserProvider(window.ethereum);
//     await provider.send("eth_requestAccounts", []);
    
//     // Check network
//     const network = await provider.getNetwork();
//     if (network.chainId !== 11155111n) { // Sepolia chain ID
//       throw new Error("Please connect to Sepolia network");
//     }

//     const signer = await provider.getSigner();
    
//     return new ethers.Contract(
//       import.meta.env.VITE_CONTRACT_ADDRESS,
//       [
//         "function addTransaction(address _receiver, uint256 _amount)",
//         "function getTransaction(uint256) view returns (tuple(uint256,address,address,uint256,uint256,bool))",
//         "function transactionCount() view returns (uint256)"
//       ],
//       signer
//     );
//   } catch (error) {
//     console.error("Contract connection error:", error);
//     throw error;
//   }
// };





import { ethers } from "ethers";

export const getContract = async () => {
  if (!window.ethereum) throw new Error("MetaMask not installed");

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    
    if (!accounts || accounts.length === 0) {
      throw new Error("No accounts found");
    }
    
    // Check network
    const network = await provider.getNetwork();
    if (network.chainId !== 11155111n) { // Sepolia chain ID
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaa36a7' }], // Sepolia chain ID in hex
        });
      } catch (switchError) {
        throw new Error("Please connect to Sepolia network");
      }
    }

    const signer = await provider.getSigner();
    
    // Full ABI from your original code
    const abi = [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_receiver",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "addTransaction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "bool",
            "name": "isFraudulent",
            "type": "bool"
          }
        ],
        "name": "FraudDetected",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_id",
            "type": "uint256"
          }
        ],
        "name": "markAsFraudulent",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "receiver",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "name": "TransactionAdded",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "getFraudulentTransactions",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "sender",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              },
              {
                "internalType": "bool",
                "name": "isFraudulent",
                "type": "bool"
              }
            ],
            "internalType": "struct FraudDetection.Transaction[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_id",
            "type": "uint256"
          }
        ],
        "name": "getTransaction",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "receiver",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "isFraudulent",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "transactionCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "transactions",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "receiver",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "isFraudulent",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ];
    
    return new ethers.Contract(
      import.meta.env.VITE_CONTRACT_ADDRESS,
      abi,
      signer
    );
  } catch (error) {
    console.error("Contract connection error:", error);
    throw error;
  }
};


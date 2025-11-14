export const MoodContractAddress = "PASTE_YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE";

export const MoodContractABI = [
  {
    "inputs": [],
    "name": "getMood",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_mood", "type": "string" }
    ],
    "name": "setMood",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];


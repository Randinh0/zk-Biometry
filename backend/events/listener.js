const { ethers } = require("ethers");
require("dotenv").config();

const abi = require("../abi/Contract.json");
const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, provider);

// Set of listeners for pushing data to clients
const listeners = {
  onRegistered: [],
  onVerified: []
};

// Watch Registered
contract.on("Registered", (user, hash) => {
  console.log(`Registered: ${user}, Hash: ${hash}`);
  listeners.onRegistered.forEach((cb) => cb({ user, hash }));
});

// Watch Verified
contract.on("Verified", (user) => {
  console.log(`Verified: ${user}`);
  listeners.onVerified.forEach((cb) => cb({ user }));
});

module.exports = listeners;

const { ethers } = require("hardhat");


async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address);
  
    // Desplegar Verifier.sol primero
    const Verifier = await ethers.getContractFactory("Groth16Verifier");
    const verifier = await Verifier.deploy();
    console.log("Verifier deployed at:", verifier.target);
  
    // Desplegar Verifier.sol primero
    const Identity = await ethers.getContractFactory("Identity");
    const identity = await Identity.deploy();
    console.log("Identity deployed at:", identity.target);
    
    // Desplegar FaceScannerZKAuth.sol y pasar la dirección del Verifier si hace falta
    const FacescannerZKAuth = await ethers.getContractFactory("FacescannerZKAuth");
    const faceScanner = await FacescannerZKAuth.deploy();
    console.log("FacescannerZKAuth deployed at:", faceScanner.target);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });

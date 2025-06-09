// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Importar el verificador generado por snarkjs (lo añades luego)
import "./Verifier.sol"; // Este será generado por snarkjs
import "./identity.sol";

contract App is Groth16Verifier, Identity {
    mapping(address => bytes32) public registeredHash;

    event Registered(address indexed user, bytes32 hash);
    event Verified(address indexed user);

    /// @notice Registrar el hash de la cara
    function register(bytes32 hash) external {
        registeredHash[msg.sender] = hash;
        emit Registered(msg.sender, hash);
    }

    /// @notice Verifica que la prueba ZK demuestra que la huella del usuario coincide con su hash registrado
    /// @param a, b, c, input: Prueba generada por snarkjs
    function checkZKProof(
        uint[2] calldata a,
        uint[2][2] calldata b,
        uint[2] calldata c,
        uint[2] calldata input // <-- Cambia aquí a [2]
    ) external returns (bool) {
        require(registeredHash[msg.sender] != 0, "No registered hash");
        require(registeredHash[msg.sender] == bytes32(input[0]), "Hash mismatch");

        bool valid = verifyProof(a, b, c, input);
        require(valid, "Invalid proof");

        emit Verified(msg.sender);
        return true;
    }
}

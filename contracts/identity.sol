// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Identity {
    // Estructura para guardar el hash de la info sensible
    struct UserData {
        bytes32 dataHash; // Hash de la información sensible
        uint8 age;
        bool exists;
    }

    mapping(address => UserData) private users;

    // Evento para registrar la acción
    event UserRegistered(address indexed user, bytes32 dataHash);

    // Registrar el hash de la información sensible
    function registerSensitiveInfo(bytes32 _dataHash, uint8 _age) external {
        require(!users[msg.sender].exists, "Ya registrado");
        users[msg.sender] = UserData(_dataHash, _age, true);
        emit UserRegistered(msg.sender, _dataHash);
    }

    // Verificar si un usuario está registrado
    function isRegistered(address _user) external view returns (bool) {
        return users[_user].exists;
    }

    // Obtener el hash (solo para el propio usuario)
    function getMyDataHash() external view returns (bytes32) {
        require(users[msg.sender].exists, "No registrado");
        return users[msg.sender].dataHash;
    }
}
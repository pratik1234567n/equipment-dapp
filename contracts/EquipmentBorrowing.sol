// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EquipmentBorrowing {
    struct Equipment {
        uint256 id;
        string name;
        bool isBorrowed;
        address borrower;
    }

    mapping(uint256 => Equipment) public equipmentList;
    uint256 public equipmentCount;

    event EquipmentAdded(uint256 id, string name);
    event EquipmentBorrowed(uint256 id, address borrower);
    event EquipmentReturned(uint256 id, address borrower);

    function addEquipment(string memory _name) public {
        equipmentCount++;
        equipmentList[equipmentCount] = Equipment(
            equipmentCount,
            _name,
            false,
            address(0)
        );

        emit EquipmentAdded(equipmentCount, _name);
    }

    function borrowEquipment(uint256 _id) public {
        require(_id > 0 && _id <= equipmentCount, "Invalid ID");
        require(!equipmentList[_id].isBorrowed, "Already borrowed");

        equipmentList[_id].isBorrowed = true;
        equipmentList[_id].borrower = msg.sender;

        emit EquipmentBorrowed(_id, msg.sender);
    }

    function returnEquipment(uint256 _id) public {
        require(_id > 0 && _id <= equipmentCount, "Invalid ID");
        require(equipmentList[_id].isBorrowed, "Not borrowed");
        require(equipmentList[_id].borrower == msg.sender, "Not your item");

        equipmentList[_id].isBorrowed = false;
        equipmentList[_id].borrower = address(0);

        emit EquipmentReturned(_id, msg.sender);
    }

    function getEquipment(uint256 _id)
        public
        view
        returns (uint256, string memory, bool, address)
    {
        Equipment memory eq = equipmentList[_id];
        return (eq.id, eq.name, eq.isBorrowed, eq.borrower);
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Scholarship is Ownable {
    constructor() Ownable(msg.sender) {}

    struct ScholarshipInfo {
        address recipient;
        uint256 amount;
        uint256 deadline;
        bool claimed;
    }

    mapping(uint256 => ScholarshipInfo) public scholarships;

    // ✅ Optimized event: removed amount and deadline to reduce gas
    event ScholarshipCreated(
        uint256 indexed scholarshipId,
        address indexed recipient
    );

    event ScholarshipClaimed(
        uint256 indexed scholarshipId,
        address indexed recipient,
        uint256 amount
    );

    function createScholarship(
        uint256 _id,
        address _recipient,
        uint256 _amount,
        uint256 _deadline
    ) external onlyOwner {
        require(_recipient != address(0), "Invalid recipient");
        require(_amount > 0, "Amount must be greater than 0");
        require(_deadline > block.timestamp, "Deadline must be in future");
        require(scholarships[_id].recipient == address(0), "Scholarship ID already exists");

        scholarships[_id] = ScholarshipInfo({
            recipient: _recipient,
            amount: _amount,
            deadline: _deadline,
            claimed: false
        });

        emit ScholarshipCreated(_id, _recipient); // ✅ Optimized
    }

    function claimScholarship(uint256 _id) external {
        ScholarshipInfo storage info = scholarships[_id];

        require(info.recipient != address(0), "Scholarship does not exist");
        require(msg.sender == info.recipient, "Only the recipient can claim");
        require(block.timestamp <= info.deadline, "Deadline passed");
        require(!info.claimed, "Scholarship already claimed");

        info.claimed = true;
        payable(info.recipient).transfer(info.amount);

        emit ScholarshipClaimed(_id, info.recipient, info.amount);
    }

    function getScholarship(uint256 _id) external view returns (
        address recipient,
        uint256 amount,
        uint256 deadline,
        bool claimed
    ) {
        ScholarshipInfo memory info = scholarships[_id];
        return (info.recipient, info.amount, info.deadline, info.claimed);
    }

    receive() external payable {}
}

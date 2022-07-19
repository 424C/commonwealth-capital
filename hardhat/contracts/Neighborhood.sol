// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @dev Interface for Neighbor NFT.
 * balanceOf returns balance of NFTs held by owner
 * owner - address of the balance query
 * Returns number of NFTs held by wallet
 */
interface INeighborNFT {
    function balanceOf(address owner) external view returns (uint);

    function tokenOfOwnerByIndex(address owner, uint index)
        external
        view
        returns (uint);
}

contract DAO is Ownable {
    enum Vote {
        // INDEX POS
        YES, // 0
        NO // 1
    }

    struct Proposal {
        // UNIX timestamp valid until the proposal is able to be executed
        uint deadline;
        uint yesVotes;
        uint noVotes;
        bool executed;
        mapping(uint => bool) voters;
    }

    //Map proposals to an ID and keep track of count
    mapping(uint => Proposal) public proposals;
    uint public numProposals;

    //Initialize interface
    INeighborNFT NeighborNFT;

    constructor(address _Neighbors) payable {
        NeighborNFT = INeighborNFT(_Neighbors);
    }

    //Ensure only NFT holders can vote on proposals
    modifier nftHolderOnly() {
        require(NeighborNFT.balanceOf(msg.sender) > 0, "NOT_A_MEMBER");
        _;
    }

    //Ensure only active proposals can receive votes
    modifier activeProposalOnly(uint proposalIndex) {
        require(
            proposals[proposalIndex].deadline > block.timestamp,
            "DEADLINE_EXCEEDED"
        );
        _;
    }

    //Check that proposal deadline is exceeded and if proposal already executed
    modifier inactiveProposalOnly(uint proposalIndex) {
        require(
            proposals[proposalIndex].deadline <= block.timestamp,
            "DEADLINE_NOT_EXCEEDED"
        );
        require(
            proposals[proposalIndex].executed == false,
            "PROPOSAL_ALREADY_EXECUTED"
        );
        _;
    }

    function createProposal() external nftHolderOnly returns (uint256) {
        Proposal storage proposal = proposals[numProposals];
        proposal.deadline = block.timestamp + 48 hours;
        numProposals = numProposals + 1;
        return numProposals - 1;
    }

    function voteOnProposal(uint proposalIndex, Vote vote)
        external
        nftHolderOnly
        activeProposalOnly(proposalIndex)
    {
        Proposal storage proposal = proposals[proposalIndex];
        uint voterNFTBalance = NeighborNFT.balanceOf(msg.sender);
        uint numVotes = 0;

        // Collect eligible vote count for the caller
        for (uint i = 0; i < voterNFTBalance; i++) {
            uint tokenId = NeighborNFT.tokenOfOwnerByIndex(msg.sender, i);
            if (proposal.voters[tokenId] == false) {
                numVotes = numVotes + 1;
                proposal.voters[tokenId] = true;
            }
        }

        require(numVotes > 0, "ALREADY_VOTED");
        if (vote == Vote.YES) {
            proposal.yesVotes += numVotes;
        } else {
            proposal.noVotes += numVotes;
        }
    }

    function executeProposal(uint proposalIndex)
        external
        nftHolderOnly
        inactiveProposalOnly(proposalIndex)
    {
        Proposal storage proposal = proposals[proposalIndex];

        // Proceed if DAO has voted so
        if (proposal.yesVotes > proposal.noVotes) {
            // Placeholder action
        }
        proposal.executed = true;
    }

    function withdrawEther() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    receive() external payable {}

    fallback() external payable {}
}

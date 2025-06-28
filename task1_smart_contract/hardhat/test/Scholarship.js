const { time, loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("Scholarship", function () {
  async function deployScholarshipFixture() {
    const [owner, recipient, stranger] = await ethers.getSigners();

    const Scholarship = await ethers.getContractFactory("Scholarship");
    const scholarship = await Scholarship.deploy();

    return { scholarship, owner, recipient, stranger };
  }

  describe("Deployment", function () {
    it("Should set the deployer as the owner", async function () {
      const { scholarship, owner } = await loadFixture(deployScholarshipFixture);
      expect(await scholarship.owner()).to.equal(owner.address);
    });
  });

  describe("Creating Scholarships", function () {
    it("Should allow the owner to create a scholarship", async function () {
      const { scholarship, recipient } = await loadFixture(deployScholarshipFixture);

      const now = await time.latest();
      const deadline = now + 7 * 24 * 60 * 60; // 7 days from now

      await expect(scholarship.createScholarship(1, recipient.address, ethers.parseEther("1"), deadline))
        .to.emit(scholarship, "ScholarshipCreated")
        .withArgs(1, recipient.address, ethers.parseEther("1"), deadline);
    });

    it("Should revert if non-owner tries to create", async function () {
      const { scholarship, recipient, stranger } = await loadFixture(deployScholarshipFixture);
      const now = await time.latest();
      const deadline = now + 7 * 24 * 60 * 60;

      await expect(
        scholarship.connect(stranger).createScholarship(1, recipient.address, ethers.parseEther("1"), deadline)
      ).to.be.revertedWithCustomError(scholarship, "OwnableUnauthorizedAccount")
    });
  });

  describe("Claiming Scholarships", function () {
    it("Should allow the recipient to claim the scholarship", async function () {
      const { scholarship, recipient, owner } = await loadFixture(deployScholarshipFixture);
    
      const now = await time.latest();
      const deadline = now + 7 * 24 * 60 * 60;
    
      await owner.sendTransaction({ to: scholarship.target, value: ethers.parseEther("1") });
      await scholarship.createScholarship(1, recipient.address, ethers.parseEther("1"), deadline);
    
      await expect(scholarship.connect(recipient).claimScholarship(1))
        .to.emit(scholarship, "ScholarshipClaimed")
        .withArgs(1, recipient.address, ethers.parseEther("1"));
    });
    
    it("Should revert if the deadline has passed", async function () {
      const { scholarship, recipient, owner } = await loadFixture(deployScholarshipFixture);

      const now = await time.latest();
      const deadline = now + 60; // 1 minute from now

      await owner.sendTransaction({ to: scholarship.target, value: ethers.parseEther("1") });
      await scholarship.createScholarship(1, recipient.address, ethers.parseEther("1"), deadline);

      await time.increaseTo(deadline + 1);

      await expect(scholarship.connect(recipient).claimScholarship(1))
        .to.be.revertedWith("Deadline passed");
    });

    it("Should revert if someone else tries to claim", async function () {
      const { scholarship, recipient, stranger, owner } = await loadFixture(deployScholarshipFixture);

      const now = await time.latest();
      const deadline = now + 3600;

      await owner.sendTransaction({ to: scholarship.target, value: ethers.parseEther("1") });
      await scholarship.createScholarship(1, recipient.address, ethers.parseEther("1"), deadline);

      await expect(scholarship.connect(stranger).claimScholarship(1))
        .to.be.revertedWith("Only the recipient can claim");
    });

    it("Should revert if scholarship already claimed", async function () {
      const { scholarship, recipient, owner } = await loadFixture(deployScholarshipFixture);

      const now = await time.latest();
      const deadline = now + 3600;

      await owner.sendTransaction({ to: scholarship.target, value: ethers.parseEther("1") });
      await scholarship.createScholarship(1, recipient.address, ethers.parseEther("1"), deadline);
      await scholarship.connect(recipient).claimScholarship(1);

      await expect(scholarship.connect(recipient).claimScholarship(1))
        .to.be.revertedWith("Scholarship already claimed");
    });
  });

  describe("View Function", function () {
    it("Should return correct scholarship details", async function () {
      const { scholarship, recipient, owner } = await loadFixture(deployScholarshipFixture);
      const now = await time.latest();
      const deadline = now + 3600;

      await scholarship.createScholarship(42, recipient.address, ethers.parseEther("2"), deadline);

      const result = await scholarship.getScholarship(42);
      expect(result.recipient).to.equal(recipient.address);
      expect(result.amount).to.equal(ethers.parseEther("2"));
      expect(result.deadline).to.equal(deadline);
      expect(result.claimed).to.equal(false);
    });
  });
});

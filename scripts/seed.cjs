const hre = require("hardhat");

async function main() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const contract = await hre.ethers.getContractAt("EquipmentBorrowing", contractAddress);

  console.log("Adding equipment...");

  await (await contract.addEquipment("Laptop")).wait();
  await (await contract.addEquipment("Projector")).wait();
  await (await contract.addEquipment("Camera")).wait();
  await (await contract.addEquipment("Tablet")).wait();

  console.log("Equipment added successfully");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
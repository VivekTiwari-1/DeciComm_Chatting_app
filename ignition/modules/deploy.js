const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ChatApp", (m) => {
  const ChatApp = m.contract("ChatApp");

  return { ChatApp };
});

//Contract address - 0x5FbDB2315678afecb367f032d93F642f64180aa3

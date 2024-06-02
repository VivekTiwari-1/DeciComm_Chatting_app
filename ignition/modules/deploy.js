const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ChatApp", (m) => {
  const ChatApp = m.contract("ChatApp");

  return { ChatApp };
});

//Contract address - 0x1b82819Bf8Bf4fB3f1cdB68d846D1eD15ca4bE8f
//New address - 0x481077e0a80A9f80e8301a3262cB3226fA4202b4

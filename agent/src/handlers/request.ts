import { XMTPContext } from "@xmtp/message-kit";
import type { Skill } from "@xmtp/message-kit";
import { TOKENS } from "../constants/index.js";
import { ethers } from "ethers";

// [!region define]
export const registerSkill: Skill[] = [
  {
    skill: "/request [amount] [token] [payerAddress] [payeeAddress] [reason] [dueDate]",
    handler: handler,
    examples: ["/request 10 USDC 0x433F4d3ED23f169E465C06AB73c8e025f4e4f8Be 0xe965F6e534D597eA1f50d83a0051A3d8dd939c20 pizza 31-12-2024", "/request 20 USDT 0xe965F6e534D597eA1f50d83a0051A3d8dd939c20 0x433F4d3ED23f169E465C06AB73c8e025f4e4f8Be cake 22-10-2025"],
    description: "Generate a request of any amount to any address.",
    params: {
      amount: {
        type: "string",
      },
      token: {
        type: "string"
      },
      payerAddress: {
        type: "string"
      },
        payeeAddress : {
          type: "string"
        },
      reason: {
        type: "string"
      },
      dueDate: {
        type: "string"
      }
    },
  },
];
// [!endregion define]

// [!region handle]
export async function handler(context: XMTPContext) {
  const {
    message: {
      content: {
        params: { amount, token, payerAddress, payeeAddress, reason, dueDate },
      },
    },
  } = context;


  const tokenAddress = TOKENS.filter(tokenDetails => tokenDetails.name.toLowerCase() === token.toLowerCase());

  const amountInWei = ethers.utils.parseUnits(amount, +tokenAddress[0].decimals).toString();


  return {
    code: 200,
    message: JSON.stringify({type: "CREATE", payerAddress: payerAddress, payeeAddress: payeeAddress, tokenAddress: tokenAddress[0].address, amountInWei:amountInWei, reason:reason, dueDate:dueDate, tokenType: tokenAddress[0].type})
  }


}
// [!endregion handle]

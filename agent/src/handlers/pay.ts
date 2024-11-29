import { XMTPContext } from "@xmtp/message-kit";
import type { Skill } from "@xmtp/message-kit";
import { TOKENS } from "../constants/index.js";
import { ethers } from "ethers";
import { findRequestByAddress } from "../request-network/pay.js";

// [!region define]
export const registerSkill: Skill[] = [
  {
    skill: "/pay [amount] [token] [payeeAddress] [reason]",
    handler: handler,
    examples: ["/pay 10 USDC 0x433F4d3ED23f169E465C06AB73c8e025f4e4f8Be cake", "/pay 20 USDT 0xe965F6e534D597eA1f50d83a0051A3d8dd939c205 pizza"],
    description: "Generate a request of any amount to any address.",
    params: {
      amount: {
        type: "string",
      },
      token: {
        type: "string"
      },
      payeeAddress: {
        type: "string"
      },
      reason: {
        type: "string"
      },
    },
  },
];
// [!endregion define]

// [!region handle]
export async function handler(context: XMTPContext) {
  const {
    message: {
      content: {
        params: { amount, token, payeeAddress, reason },
      },
      sender : {
        address
      }
    },
  } = context;

  try {

    
    const tokenAddress = TOKENS.filter(tokenDetails => tokenDetails.name.toLowerCase() === token.toLowerCase());
    
    const amountInWei = ethers.utils.parseUnits(amount, +tokenAddress[0].decimals).toString();
    
    const requests = await findRequestByAddress(ethers.utils.getAddress(address));

    
    const singleReq = requests.filter((request) => request?.payee?.value.toLowerCase() === payeeAddress.toLowerCase() && amountInWei === request.expectedAmount && request.contentData.reason.toLowerCase() === reason.toLowerCase());
    
    
    if(!singleReq) {
      return {
        code: 404,
        message: "Sorry, I did not find any such request made to you :("
      }
    }
    
    
    return {
      code: 200,
      message: `{type: "PAY", requestId: ${singleReq[0].requestId}}`
    }
    
  } catch(error) {
    console.error("error is: ", error)
          return {
        code: 404,
        message: "Sorry, I did not find any such request made to you :("
      }
  }

}
// [!endregion handle]

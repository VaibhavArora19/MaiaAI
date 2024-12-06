import { Resend } from "resend";
import { XMTPContext } from "@xmtp/message-kit";
import type { Skill } from "@xmtp/message-kit";
import { TOKENS } from "../constants/index.js";
import { ethers } from "ethers";
import { findRequestByAddress } from "../request-network/pay.js";

const resend = new Resend(process.env.RESEND_API_KEY); // Replace with your Resend API key

export const registerSkill: Skill[] = [
  {
    skill: "/remind [payerAddress] [amount] [token] [reason] [email] [payeeAddress]",
    handler: handler,
    examples: ["/remind 0x5362fffC85632301293E78512063837c145c13F9 10 FAU cake andrewtate@gmail.com 0x433F4d3ED23f169e465C06ab73c8e025f4e4f8be"],
    description:
      "Reminds the receiver that they need to pay the payee a certain amount",
    params: {
      payerAddress: {
        type: "string"
      },
            amount: {
        type: "string"
      },
      
      token: {
        type: "string"
      },

      reason: {
        type: "string"
      },
            email: {
        type: "string"
      },

      payeeAddress: {
        type: "string"
      }
    },
  },
];

export async function handler(context: XMTPContext) {
  const {
    message: {
      content: {
        params: {
          email, amount, token, reason, payeeAddress, payerAddress
        }
      },
    },
  } = context;


  try {

    const tokenAddress = TOKENS.filter(tokenDetails => tokenDetails.name.toLowerCase() === token.toLowerCase());
    
    const amountInWei = ethers.utils.parseUnits(amount, +tokenAddress[0].decimals).toString();

    console.log('amount ', amountInWei)
    
    const requests = await findRequestByAddress(ethers.utils.getAddress(payeeAddress));

    const request = requests.filter(req => req.balance?.balance === "0" && req.contentData?.reason.toLowerCase() === reason && req.expectedAmount === amountInWei && payerAddress.toLowerCase() == req.payer?.value.toLowerCase());

    console.log('request is', request);


      let content = {
        from: "noreply@maiabot53.org",
        to: email,
        subject: "Reminder: You have a request to pay💸",
        html: `
        <h1>Hi there!</h1>
        <p>How are you doing? Seems like you have a pending request to pay to ${request[0].payee?.value}. The reason for this pending request is - ${request[0].contentData.reason}.<br /> <br /> This is a reminder to pay your request of ${amount} ${token} before ${request[0].contentData.dueDate}. <br /> <br /> Enjoy your day :) <br /> <br /> - Maia Bot.  </p>
      `,
      };
      await resend.emails.send(content);
      await context.send(`✅ Reminder sent successfully to ${email}`);

  } catch (error) {
    await context.send("❌ Sorry, Failed to send email. Please try again later.");
    console.error("Error sending email:", error);
  }
}

import { V2Client } from "@xmtp/message-kit";
import { Request, Response, NextFunction } from "express";
import { ethers } from "ethers";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const generateResponse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message, userAddress } = req.body;

    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string);

    const client = await V2Client.create(wallet, { env: "production" });

    const conversation = await client.conversations.newConversation("0x20647bDDa1Ce065566d73e8D702EE3f7E37f63CC"); //agent address

    const sentMessage = await conversation.send(message + ` My address is ${userAddress}`);

    while (true) {
      const data = await sentMessage.conversation.messages();

      const secondLastMessage = data[data.length - 2];
      const lastMessage = data[data.length - 1];

      console.log("sent message", secondLastMessage, lastMessage);

      if (lastMessage.content?.includes("type") && lastMessage.content !== undefined) {
        res.status(200).json({
          reply: secondLastMessage.content,
          transaction: lastMessage.content,
        });
        break;
      } else if (lastMessage.content?.includes("Sorry")) {
        res.status(404).json({
          reply: secondLastMessage.content,
          transaction: lastMessage.content,
        });
        break;
      }

      await sleep(1000);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default { generateResponse };

import { V2Client } from "@xmtp/message-kit";
import { Request, Response, NextFunction } from "express";
import { ethers } from "ethers";

const generateResponse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message, userAddress } = req.body;

    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string);

    const client = await V2Client.create(wallet, { env: "production" });

    const conversation = await client.conversations.newConversation("0x20647bDDa1Ce065566d73e8D702EE3f7E37f63CC"); //agent address

    await conversation.send(message + `. Suppose this message is sent by ${userAddress}`);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default { generateResponse };

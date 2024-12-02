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

    const sentMessage = await conversation.send(
      message +
        `. Suppose this message is sent by ${userAddress}. In case of request this is the payee address and in case of pay this is the payer address`
    );

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
      } else if (lastMessage.content?.includes("Maia") || secondLastMessage.content?.includes("Maia")) {
        res.status(200).json({
          reply: lastMessage.content?.includes("Maia") ? lastMessage.content : secondLastMessage.content,
        });
        break;
      } else if (lastMessage.content?.includes("Reminder sent successfully") || secondLastMessage.content?.includes("Reminder sent successfully")) {
        res.status(200).json({
          reply: lastMessage.content?.includes("Reminder sent successfully") ? lastMessage.content : secondLastMessage.content,
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

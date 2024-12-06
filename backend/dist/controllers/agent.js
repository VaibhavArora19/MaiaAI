import { V2Client } from "@xmtp/message-kit";
import { ethers } from "ethers";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const generateResponse = async (req, res, next) => {
    try {
        const { message, userAddress } = req.body;
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
        const client = await V2Client.create(wallet, { env: "production" });
        const conversation = await client.conversations.newConversation("0x20647bDDa1Ce065566d73e8D702EE3f7E37f63CC"); //agent address
        const sentMessage = await conversation.send(message +
            `. Suppose this message is sent by ${userAddress}. In case of request this is the payee address and in case of pay or escrow pay this is the payer address`);
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
            }
            else if (lastMessage.content?.includes("Sorry")) {
                res.status(404).json({
                    reply: secondLastMessage.content,
                    transaction: lastMessage.content,
                });
                break;
            }
            else if (lastMessage.content?.includes("Maia") || secondLastMessage.content?.includes("Maia")) {
                res.status(200).json({
                    reply: lastMessage.content?.includes("Maia") ? lastMessage.content : secondLastMessage.content,
                });
                break;
            }
            else if (lastMessage.content?.includes("Reminder sent successfully") || secondLastMessage.content?.includes("Reminder sent successfully")) {
                res.status(200).json({
                    reply: lastMessage.content?.includes("Reminder sent successfully") ? lastMessage.content : secondLastMessage.content,
                });
                break;
            }
            await sleep(1000);
        }
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};
export default { generateResponse };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlcnMvYWdlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFFaEMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxFQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFaEYsTUFBTSxnQkFBZ0IsR0FBRyxLQUFLLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDakYsSUFBSSxDQUFDO1FBQ0gsTUFBTSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBRTFDLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQXFCLENBQUMsQ0FBQztRQUVwRSxNQUFNLE1BQU0sR0FBRyxNQUFNLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7UUFFcEUsTUFBTSxZQUFZLEdBQUcsTUFBTSxNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDLENBQUMsZUFBZTtRQUU5SCxNQUFNLFdBQVcsR0FBRyxNQUFNLFlBQVksQ0FBQyxJQUFJLENBQ3pDLE9BQU87WUFDTCxxQ0FBcUMsV0FBVywyR0FBMkcsQ0FDOUosQ0FBQztRQUVGLE9BQU8sSUFBSSxFQUFFLENBQUM7WUFDWixNQUFNLElBQUksR0FBRyxNQUFNLFdBQVcsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7WUFF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
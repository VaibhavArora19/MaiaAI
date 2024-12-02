import { XMTPContext } from "@xmtp/message-kit";
import type { Skill } from "@xmtp/message-kit";

// [!region define]
export const registerSkill: Skill[] = [
  {
    skill: "/create-invoice",
    handler: handler,
    examples: ["/create-invoice",],
    description: "Allows user to create a new invoice by redirecting them to the create invoice page",
    params: {}
  },
];
// [!endregion define]

// [!region handle]
export async function handler(context: XMTPContext) {

  try {

    return {
        code: 200,
        message: JSON.stringify({type: "CREATE-INVOICE"})
    }

  } catch (error) {
        console.error("error is: ", error)
          return {
        code: 404,
        message: "Sorry, I did not find any such request made to you :("
      }
  }

}
// [!endregion handle]

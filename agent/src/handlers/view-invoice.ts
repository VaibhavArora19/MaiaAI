import { XMTPContext } from "@xmtp/message-kit";
import type { Skill } from "@xmtp/message-kit";

// [!region define]
export const registerSkill: Skill[] = [
  {
    skill: "/view-invoice",
    handler: handler,
    examples: ["/view-invoice",],
    description: "Allows user to view a all the invoice by redirecting them to the invoice page",
    params: {}
  },
];
// [!endregion define]

// [!region handle]
export async function handler(context: XMTPContext) {

  try {

    return {
        code: 200,
        message: JSON.stringify({type: "VIEW-INVOICE"})
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

"use client";

import { Button } from "@/components/ui/button";

const IntentPage = () => {
  const sendDM = async () => {
    const data = await fetch("http://localhost:8000/agent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Hello miss agent",
        userAddress: "0x433F4d3ED23f169E465C06AB73c8e025f4e4f8Be",
      }),
    });

    await data.json();
  };

  return (
    <div>
      <Button onClick={sendDM}>Hello</Button>
    </div>
  );
};

export default IntentPage;

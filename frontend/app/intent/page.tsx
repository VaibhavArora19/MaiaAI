"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { VscArrowSmallRight } from "react-icons/vsc";
import { LuBadgeDollarSign } from "react-icons/lu";
import { RiBillFill } from "react-icons/ri";
import { AiOutlineAlert } from "react-icons/ai";
import { useState } from "react";
import { useWalletClient } from "wagmi";
import { ThreeDots } from "react-loader-spinner";
import { useAccount } from "wagmi";
import { BACKEND_URL } from "@/constants";
import { sleep } from "@/lib/sleep";
import { createRequest } from "@/request-network/create";
import { payToRequest } from "@/request-network/pay";

type Option = {
  label: string;
  subOptions: string[];
  imageUrl: () => JSX.Element;
};

export const options: Option[] = [
  {
    label: "Pay",
    subOptions: ["Pay 10 USD ", "Pay 100 USD ", "Pay 1000 USD "],
    imageUrl: () => {
      return <LuBadgeDollarSign className="text-green-600" />;
    },
  },
  {
    label: "Request",
    subOptions: ["Request 10 USD", "Request 100 USD", "Request 1000 USD"],
    imageUrl: () => {
      return <RiBillFill className="text-blue-600" />;
    },
  },
  {
    label: "Alert",
    subOptions: ["Alert ", "Alert ", "Alert "],
    imageUrl: () => {
      return <AiOutlineAlert className="text-red-700" />;
    },
  },
];

const IntentPage = () => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [displayText, setDisplayText] = useState("");

  const sendDM = async () => {
    if (!input || !address) return;
    setIsLoading(true);

    const data = await fetch(`${BACKEND_URL}/agent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: input,
        userAddress: address,
      }),
    });

    if (data.status !== 200) return;

    const response = await data.json();
    setDisplayText(response.reply);

    await sleep(500);

    const transaction = JSON.parse(response.transaction);

    console.log("tt", transaction);

    if (transaction.type === "CREATE") {
      await createRequest(
        walletClient,
        transaction.payerAddress,
        transaction.payeeAddress,
        transaction.tokenAddress,
        transaction.amountInWei,
        transaction.reason,
        transaction.dueDate
      );
    } else if (transaction.type === "PAY") {
      await payToRequest(transaction.requestId);
    }
    setIsLoading(false);
  };

  return (
    <div className="mt-[12%]">
      <div className="mb-6 text-2xl font-semibold">
        <h1 className="text-center">What can I help with?</h1>
      </div>
      <div className="m-auto  flex w-full max-w-3xl items-center space-x-2 h-full">
        <Input type="text" placeholder="Ask me something..." className="h-[3.2rem] z-10" value={input} onChange={(e) => setInput(e.target.value)} />

        <Button type="submit" onClick={sendDM} className="h-[3.2rem] w-16 rounded-xl z-10">
          {isLoading ? <ThreeDots visible={true} height={100} width={100} color="white" radius={9} /> : <VscArrowSmallRight size={4} />}
        </Button>
      </div>
      {displayText !== "" && displayText}
      {!selectedOption && (
        <div className="ml-[45%] mt-6">
          <ToggleGroup type="multiple">
            {options.map((option) => {
              return (
                <ToggleGroupItem
                  key={option.label}
                  value={option.label}
                  className="ml-2 mr-2 border-black border-[1px] rounded-sm"
                  onClick={() => {
                    setSelectedOption(option);
                  }}
                >
                  <h1 className="px-2 flex">
                    <span className="pt-[4px]">{option.imageUrl()}</span>
                    <span className="pl-[4px]">{option.label}</span>
                  </h1>
                </ToggleGroupItem>
              );
            })}
          </ToggleGroup>
        </div>
      )}
      {/* <div className="fixed bottom-0 left-[30%]">
        <Image src="https://stnx-static.s3.us-east-1.amazonaws.com/landing-page/gmoon.svg" alt="gmoon" height={1200} width={1200} />
      </div> */}
      {selectedOption && (
        <div className="w-[33%] m-auto pr-16 mt-2">
          <Table>
            <TableBody>
              {selectedOption.subOptions.map((subOption) => (
                <TableRow
                  key={subOption}
                  onClick={() => {
                    setInput(subOption);
                    setSelectedOption(null);
                  }}
                >
                  <TableCell className="font-medium">{subOption}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default IntentPage;

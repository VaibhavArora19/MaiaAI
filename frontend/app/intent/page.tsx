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
import Image from "next/image";
import { ThreeDots } from "react-loader-spinner";

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
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendDM = async () => {
    setIsLoading(true);

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

    setIsLoading(false);
  };

  return (
    <div className="mt-[12%]">
      <div className="mb-4 text-2xl font-semibold">
        <h1 className="text-center">What can I help with?</h1>
      </div>
      <div className="m-auto  flex w-full max-w-3xl items-center space-x-2 h-full">
        <Input type="email" placeholder="Ask me something..." className="h-[3.2rem] z-10" value={input} onChange={(e) => setInput(e.target.value)} />

        <Button type="submit" onClick={sendDM} className="h-[3.2rem] w-16 rounded-xl z-10">
          {isLoading ? <ThreeDots visible={true} height={100} width={100} color="white" radius={9} /> : <VscArrowSmallRight size={4} />}
        </Button>
      </div>
      {!selectedOption && (
        <div className="ml-[44%] mt-4">
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
                    <span className="pt-[3px]">{option.imageUrl()}</span>
                    <span className="pl-[4px]">{option.label}</span>
                  </h1>
                </ToggleGroupItem>
              );
            })}
          </ToggleGroup>
        </div>
      )}
      <div className="absolute bottom-0 left-[25%]">
        <Image src="https://stnx-static.s3.us-east-1.amazonaws.com/landing-page/gmoon.svg" alt="gmoon" height={1200} width={1200} />
      </div>
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

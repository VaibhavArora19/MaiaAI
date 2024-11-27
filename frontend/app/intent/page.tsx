"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { VscArrowSmallRight } from "react-icons/vsc";
import { LuBadgeDollarSign } from "react-icons/lu";
import { RiBillFill } from "react-icons/ri";
import { AiOutlineAlert } from "react-icons/ai";
import { useState } from "react";
import Image from "next/image";

type Option = {
  label: string;
  subOptions: Option[];
  imageUrl: () => JSX.Element;
};

export const options: Option[] = [
  {
    label: "Pay",
    subOptions: [],
    imageUrl: () => {
      return <LuBadgeDollarSign className="text-green-600" />;
    },
  },
  {
    label: "Request",
    subOptions: [],
    imageUrl: () => {
      return <RiBillFill className="text-blue-600" />;
    },
  },
  {
    label: "Alert",
    subOptions: [],
    imageUrl: () => {
      return <AiOutlineAlert className="text-red-700" />;
    },
  },
];

const IntentPage = () => {
  const [selectedOpton, setSelectedOption] = useState<Option | null>(null);

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
    <div className="mt-[12%]">
      <div className="mb-4 text-2xl font-semibold">
        <h1 className="text-center">What can I help with?</h1>
      </div>
      <div className="m-auto  flex w-full max-w-3xl items-center space-x-2 h-full">
        <Input type="email" placeholder="Ask me something..." className="h-[3.2rem]" />
        <Button type="submit" onClick={sendDM} className="h-[3.2rem] w-16 rounded-xl">
          <VscArrowSmallRight size={4} />
        </Button>
      </div>
      {!selectedOpton && (
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
      <div className="absolute bottom-0 left-[26%]">
        <Image src="https://stnx-static.s3.us-east-1.amazonaws.com/landing-page/gmoon.svg" alt="gmoon" height={1200} width={1200} />
      </div>
    </div>
  );
};

export default IntentPage;

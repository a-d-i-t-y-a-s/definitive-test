"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useWriteContract } from "wagmi";
import ERC20ABI from "@/abi/ERC20ABI.json";
import { getInstance } from "@/utils/fhevm";
import { toHexString } from "@/utils/utils";
const Page = () => {
  const { data: hash, writeContract } = useWriteContract();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({
    erc20ContractAddress: "0x71ecd860e7e6E816427D5936d95d3456F3860d91",
    eventContractAddress: "0x71ecd860e7e6E816427D5936d95d3456F3860d91",
  });
  const formFields = [
    { id: "erc20ContractAddress", label: "ERC Contract Address" },
    { id: "eventContractAddress", label: "Event Contract Address" },
  ];
  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleFormSubmit = async () => {
    const data = [
      formValues.erc20ContractAddress,
      formValues.eventContractAddress,
    ];

    setIsSubmitted(true);
  };

  const getERC20Tokens = async () => {
    const instance = await getInstance();
    const encryptedString = await instance.encrypt32(400000000);
    const hexString = "0x" + toHexString(encryptedString);
    console.log(hexString)
    writeContract(
      {
        address: formValues.erc20ContractAddress,
        ERC20ABI,
        functionName: "mintAndApprove",
        args: [formValues.eventContractAddress, hexString],
      },
      {
        onSuccess(data, variables, context) {
          console.log(data);
        },
        onError(error, variables, context) {
          console.log(error);
        },
      }
    );
  };

  const buyEventTickets = () => {};

  return (
    <div className="mt-20 flex flex-col gap-6 pb-16">
      <div className="mt-10 flex justify-between scroll-m-20 border-b pb-6 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Buy Token
      </div>
      {isSubmitted ? (
        <>
          <div className="grid mt-10 gap-8">
            <div className="space-y-2">
              <p className="flex justify-between scroll-m-20 text-xl font-bold">
                Step 1: Get ERC 20 Token
              </p>
              <p className="text-sm">
                To participate in our event, you first need to obtain an ERC 20
                token. This token will be used to access various features and
                benefits exclusive to token holders. Ensure you have a
                compatible wallet to store your tokens securely. Once you have
                the token, you'll be ready for the next step.
              </p>
              <div className="w-full grid place-items-end">
                <Button onClick={getERC20Tokens}>Get ERC Token</Button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="flex justify-between scroll-m-20 text-xl font-bold">
                Step 2: Buy Event Ticket
              </p>
              <p className="text-sm">
                With your ERC 20 token in hand, you can now purchase an event
                ticket. The ticket grants you entry to the event and unlocks
                additional perks available only to attendees. Make sure to buy
                your ticket early to{"  "}
                {/* <span className="bg-main px-2 border-2 rounded-sm font-semibold"> */}
                secure your spot
                {/* </span> */}
                {"  "}
                and enjoy all the exclusive activities.
              </p>
              <div className="w-full grid place-items-end">
                <Button onClick={buyEventTickets}>Buy Event Ticket</Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 mt-10 gap-8">
            {formFields.map(({ id, label }) => (
              <div key={id} className="grid gap-2 md:grid-cols-2 items-center">
                <Label htmlFor={id}>{label}</Label>
                <Input
                  id={id}
                  onChange={handleChange}
                  value={formValues[id]}
                  placeholder={label}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end">
            <Button onClick={handleFormSubmit}>Submit</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;

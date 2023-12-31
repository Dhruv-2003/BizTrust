import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { getTxs } from "@/firebase/methods";

const PaymentsHistory = (props: any) => {
  const [txs, setTxs] = useState<any[]>();
  const address = props.address;

  useEffect(() => {
    if (address) {
      getTxsInfo(address);
    }
  }, [address]);

  const getTxsInfo = async (address: `0x${string}`) => {
    const data = await getTxs(address);
    // array of Txs
    // interface txObjectType {
    //   to: `0x${string}`;
    //   timestamp: string;
    //   SuccesStatus: boolean;
    //   FeesPaid: string;
    //   Amount: number;
    // }

    // We also have types to be inferred from the name of the Payload
    console.log(data);
    setTxs(data);
  };
  return (
    <div>
      <div className="bg-slate-100 h-screen">
        <div className="mt-10">
          <div className="w-5/6 bg-white px-10 py-6 flex flex-col mx-auto rounded-xl">
            <div className="">
              <p className="text-2xl font-semibold text-black">Payments</p>
            </div>
            <div className="mt-10 w-full">
              <Accordion defaultIndex={[0]} allowMultiple>
                {txs &&
                  txs.map((data) => {
                    return (
                      <AccordionItem>
                        <h2>
                          <AccordionButton>
                            <div className="w-full flex justify-between">
                              <div className="flex flex-col justify-start">
                                <p className="text-md font-semibold text-neutral-400">
                                  Trasaction ID
                                </p>
                                <p className="font-semibold mt-1">1</p>
                              </div>
                              <div className="flex flex-col justify-start">
                                <p className="text-md font-semibold text-neutral-400">
                                  Time Stamp
                                </p>
                                <p className="font-semibold mt-1">
                                {data.timestamp}
                                </p>
                              </div>
                              <AccordionIcon />
                            </div>
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <div className="w-full">
                            <div className="grid grid-flow-col grid-rows-2 gap-x-10 gap-y-5 mt-5">
                              <div>
                                <p className="text-md font-semibold text-neutral-400">
                                  To Address
                                </p>
                                <p className="font-semibold mt-1">
                                  {data.to}
                                </p>
                              </div>
                              <div>
                                <p className="text-md font-semibold text-neutral-400">
                                  Fees Paid
                                </p>
                                <p className="font-semibold mt-1">{data.FeesPaid}</p>
                              </div>
                              <div>
                                <p className="text-md font-semibold text-neutral-400">
                                  Success
                                </p>
                                <p className="font-semibold mt-1">{data.SuccesStatus}</p>
                              </div>
                              <div>
                                <p className="text-md font-semibold text-neutral-400">
                                  Amount
                                </p>
                                <p className="font-semibold mt-1">{data.Amount}</p>
                              </div>
                            </div>
                          </div>
                        </AccordionPanel>
                      </AccordionItem>
                    );
                  })}

                <AccordionItem className="mt-3">
                  <h2>
                    <AccordionButton>
                      <div className="w-full flex justify-between">
                        <div className="flex flex-col justify-start">
                          <p className="text-md font-semibold text-neutral-400">
                            Trasaction ID
                          </p>
                          <p className="font-semibold mt-1">82220823ehbdxhd</p>
                        </div>
                        <div className="flex flex-col justify-start">
                          <p className="text-md font-semibold text-neutral-400">
                            Time Stamp
                          </p>
                          <p className="font-semibold mt-1">11:19 7-10-2023</p>
                        </div>
                        <AccordionIcon />
                      </div>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <div className="w-full">
                      <div className="grid grid-flow-col grid-rows-2 gap-x-10 gap-y-5 mt-5">
                        <div>
                          <p className="text-md font-semibold text-neutral-400">
                            To Address
                          </p>
                          <p className="font-semibold mt-1">
                            0x3fdF69DA53299Cf8c179B19A644664a3bb6b7bBf
                          </p>
                        </div>
                        <div>
                          <p className="text-md font-semibold text-neutral-400">
                            Fees Paid
                          </p>
                          <p className="font-semibold mt-1">10000 gwei</p>
                        </div>
                        <div>
                          <p className="text-md font-semibold text-neutral-400">
                            Success
                          </p>
                          <p className="font-semibold mt-1">True</p>
                        </div>
                        <div>
                          <p className="text-md font-semibold text-neutral-400">
                            Amount
                          </p>
                          <p className="font-semibold mt-1">0.001 ETH</p>
                        </div>
                      </div>
                    </div>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(PaymentsHistory), { ssr: false });

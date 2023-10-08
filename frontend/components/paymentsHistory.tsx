import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

const PaymentsHistory = () => {
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
                <AccordionItem>
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
                          <p className="font-semibold mt-1">11:19 11-12-2020</p>
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
                          <p className="font-semibold mt-1">11:19 11-12-2020</p>
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

export default PaymentsHistory;

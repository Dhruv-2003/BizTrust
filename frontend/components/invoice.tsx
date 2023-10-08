import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";

const Invoice = () => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div>
      <div className="bg-slate-100 h-full">
        <div className="mt-10">
          <div className="w-11/12 bg-white px-10 py-6 flex flex-col mx-auto rounded-xl">
            <div>
              <p className="text-2xl text-black font-semibold">
                Create Invoices
              </p>
            </div>
            <div className="grid grid-flow-cols grid-cols-3 grid-rows-1 gap-x-20 mt-6">
              <div className="w-2/3 px-5 py-3 border border-slate-400 rounded-lg">
                <p className="text-black font-semibold text-2xl">$0.00</p>
                <p className="text-sm mt-2 font-semibold  text-slate-500">
                  Received this month
                </p>
              </div>
              <div className="w-2/3 px-5 py-3 border border-slate-400 rounded-lg">
                <p className="text-black font-semibold text-2xl">0</p>
                <p className="text-sm mt-2 font-semibold  text-slate-500">
                  Receipts created this month
                </p>
              </div>
              <div>
                <button
                  onClick={() => setShow(true)}
                  className="w-2/3 px-5 py-2 border font-semibold text-xl border-white bg-gradient-to-tl from-blue-300 to-blue-500 text-white rounded-lg mt-4 hover:scale-110 duration-300"
                >
                  Create Receipt
                </button>
              </div>
            </div>
            {show && (
              <div className="mt-10">
                <div className="flex flex-col bg-white rounded-xl w-3/5 mx-auto shadow-2xl px-6 py-3">
                  <div>
                    <p className="text-black font-semibold text-2xl">Invoice</p>
                  </div>
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-slate-500">
                      Your Client Information
                    </p>
                  </div>
                  <div className="mt-6">
                    <div>
                      <p className="text-md font-semibold">Reciepent Address</p>
                      <input className="mt-3 px-3 py-3 rounded-lg bg-slate-200 w-full text-black"></input>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div>
                      <p className="text-md font-semibold">Amount</p>
                      <input className="mt-3 px-3 py-3 rounded-lg bg-slate-200 w-full text-black"></input>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div>
                      <p className="text-md font-semibold">
                        Message (optional)
                      </p>
                      <input className="mt-3 px-3 py-3 rounded-lg bg-slate-200 w-full text-black"></input>
                    </div>
                  </div>
                  <div className="mx-auto mt-6">
                    <button
                      onClick={() => setShow(false)}
                      className="px-20 py-2 border font-semibold text-xl border-white bg-gradient-to-tl from-blue-300 to-blue-500 text-white rounded-lg mt-4 hover:scale-110 duration-300"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-11/12 bg-white px-10 mt-20 py-6 flex flex-col mx-auto rounded-xl">
            <div>
              <p className="text-2xl text-black font-semibold">
                Pending Payments
              </p>
            </div>
            <div className="mt-10">
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
                          <button className="px-14 py-1.5 border font-semibold text-xl border-white bg-gradient-to-tl from-blue-300 to-blue-500 text-white rounded-lg mt-2 hover:scale-110 duration-300">
                            Pay
                          </button>
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
                            From
                          </p>
                          <p className="font-semibold mt-1">
                            0x3fdF69DA53299Cf8c179B19A644664a3bb6b7bBf
                          </p>
                        </div>
                        <div>
                          <p className="text-md font-semibold text-neutral-400">
                            Time Created
                          </p>
                          <p className="font-semibold mt-1">12:40 11-10-2023</p>
                        </div>
                        <div>
                          <p className="text-md font-semibold text-neutral-400">
                            Verified
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
                          <button className="px-14 py-1.5 border font-semibold text-xl border-white bg-gradient-to-tl from-blue-300 to-blue-500 text-white rounded-lg mt-2 hover:scale-110 duration-300">
                            Pay
                          </button>
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
                            From
                          </p>
                          <p className="font-semibold mt-1">
                            0x3fdF69DA53299Cf8c179B19A644664a3bb6b7bBf
                          </p>
                        </div>
                        <div>
                          <p className="text-md font-semibold text-neutral-400">
                            Time Created
                          </p>
                          <p className="font-semibold mt-1">12:40 11-10-2023</p>
                        </div>
                        <div>
                          <p className="text-md font-semibold text-neutral-400">
                            Verified
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

export default dynamic(() => Promise.resolve(Invoice), { ssr: false });

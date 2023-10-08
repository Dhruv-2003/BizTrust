import React, { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Overview from "@/components/overview";
import PaymentsHistory from "@/components/paymentsHistory";
import Invoice from "@/components/invoice";
import VP from "@/components/vp";

const Dashboard = () => {

  return (
    <div className="w-screen">
      <div className="">
        <div className="mt-4">
          <div className="">
            <Tabs isFitted>
              <TabList>
                <Tab>Overview</Tab>
                <Tab>Verifiable Proofs</Tab>
                <Tab>Payment History</Tab>
                <Tab>Invoices</Tab>
              </TabList>
              <div className="bg-slate-100 w-full">
                <TabPanels>
                  <TabPanel>
                    <Overview/>
                  </TabPanel>
                  <TabPanel>
                    <VP/>
                  </TabPanel>
                  <TabPanel>
                    <PaymentsHistory />
                  </TabPanel>
                  <TabPanel>
                    <Invoice />
                  </TabPanel>
                </TabPanels>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

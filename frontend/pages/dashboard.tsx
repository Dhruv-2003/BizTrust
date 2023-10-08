import React, { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Overview from "@/components/overview";
import PaymentsHistory from "@/components/paymentsHistory";
import Invoice from "@/components/invoice";
import VP from "@/components/vp";
import { getCompanyInfo } from "@/firebase/methods";

const Dashboard = () => {
  const [userData, setUserData] = useState<any>();
  const address = ""; // get the user connected address

  useEffect(() => {
    if (address) {
      getInfo(address);
    }
  }, [address]);

  const getInfo = async (address: `0x${string}`) => {
    const data = await getCompanyInfo(address);
    // {
    //   Name: name,
    //   Address: companyAddress,
    //   ContactMail: mail,
    //   TaxNo: taxNo,
    //   RegNo: regNo,
    //   trustScore: 500,
    //   invoicesIssued: [],
    //   invoicesToPay: [],
    // }
    // Data will come in this way , just display as you need to and pass on the rest to the corresponding components
  };

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
                    <Overview address={address} />
                  </TabPanel>
                  <TabPanel>
                    <VP address={address} />
                  </TabPanel>
                  <TabPanel>
                    <PaymentsHistory address={address} />
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

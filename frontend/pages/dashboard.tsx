import React, { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Overview from "@/components/overview";
import PaymentsHistory from "@/components/paymentsHistory";
import Invoice from "@/components/invoice";
import VP from "@/components/vp";
import { getCompanyInfo } from "@/firebase/methods";

const Dashboard = () => {
  const address = "0x89D20d4f8F6F89Af9318c15f1AeFf6aB19b40247"; // get the user connected address
  const [data, setData] = useState<{}>();

  useEffect(() => {
    if (address) {
      if (!data) {
        getInfo(address);
      }
    }
  }, [address]);

  const getInfo = async (address: `0x${string}`) => {
    const data = await getCompanyInfo(address);
    console.log(data);
    setData(data);
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
                    <Overview/>
                  </TabPanel>
                  <TabPanel>
                    <VP
                      address={address}
                      name={data ? data?.Name : "ABC Company"}
                      trustScore={data ? data.trustScore : "500"}
                    />
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

import { useEffect, useState } from "react";
import Dashboard from "../../layouts/Dashboard";
import Sidebar from "../shared/Sidebar";
import Topbar from "../shared/Topbar";
import { Device } from "../../types/device.model";
import deviceController from "../../utils/controllers/devices";
import Datatable from "../shared/Datatable";
import { API_URL } from "../../environment";
import CarbonCredits from "../shared/CarbonCredits";

const DevicesPage = () => {
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  useEffect(() => {
    deviceController.getalldevices((data: any) => {
      setAllDevices(data?.data);
    });
  }, []);

  const calculateCarbonCredits = (index: number) => {
    const mID = (allDevices[index] as any)._id;

    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      id: mID,
    });

    fetch(`${API_URL}/device/calculate`, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((val) =>
        val.json().then((val) => {
          console.log(val);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Dashboard
      sidebar={<Sidebar />}
      topbar={<Topbar label="Devices Information" />}
    >
      <div>
        <div className="text-2xl mb-3">All Devices</div>
        <Datatable
          data={allDevices}
          headers={[
            "Name",
            "Lat",
            "Long",
            "device_type",
            "Account Ref",
            "Size",
            "Region",
            "SRF",
          ]}
          exclude={[
            "__v",
            "_id",
            "comments",
            "createdAt",
            "updatedAt",
            "numberOfOccupants",
          ]}
          actions={[
            {
              child: "Calculate",
              indexedChild: (index: number) => (
                <CarbonCredits mID={(allDevices[index] as any)._id} />
              ),
              action: (index) => {
                calculateCarbonCredits(index);
              },
            },
          ]}
        />
      </div>
    </Dashboard>
  );
};

export default DevicesPage;

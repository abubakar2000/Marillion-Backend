import { useEffect, useState } from "react";
import Dashboard from "../../layouts/Dashboard";
import Sidebar from "../shared/Sidebar";
import Topbar from "../shared/Topbar";

import { API_URL } from "../../environment";
import { MdClose } from "react-icons/md";

const Transactions = () => {
  const [allTransactions, setAllTransactions] = useState<any[]>([]);

  const [selectedDeviceInfo, setSelectedDeviceInfo] = useState<any>({});

  const getCredits = () => {
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };

    fetch(`${API_URL}/credits`, {
      method: "GET",
      headers: headersList,
    })
      .then((val) =>
        val.json().then((val) => {
          console.log("Credits");
          console.log(val);
          setAllTransactions(val);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCredits();
  }, []);

  const lookupDevice = async (id: string) => {
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      _id: id,
    });

    let response = await fetch(`${API_URL}/device/lookup`, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    let data = await response.json();

    console.log(data?.data?.length);
    if (data?.data?.length) {
      openDevicePopup(data?.data?.[0]);
    }
  };

  const openDevicePopup = (deviceData: any) => {
    console.log(deviceData);

    setSelectedDeviceInfo(deviceData);
    document
      .getElementById("DeviceInfoPopup")
      ?.setAttribute("style", "transform: translateY(0%)");
  };
  const closeDevicePopup = () => {
    document
      .getElementById("DeviceInfoPopup")
      ?.setAttribute("style", "transform: translateY(100%)");
  };

  const payOut = async (id: string, paid_status: boolean) => {
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      id: id,
      paidout: !paid_status,
    });

    let response = await fetch(`${API_URL}/credits`, {
      method: "PUT",
      body: bodyContent,
      headers: headersList,
    });

    response
      .text()
      .then((data) => {
        getCredits();
        console.log(data);
      })
      .catch((err) => {
        console.log(err);

        alert("Couldn't Payout");
      });
  };

  return (
    <Dashboard
      sidebar={<Sidebar />}
      topbar={<Topbar label="Devices Information" />}
    >
      <div>
        <div className="text-2xl mb-3">All Transactions</div>
        <table className="shadow-sm w-full">
          <thead className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
            <tr>
              <td className="font-normal leading-none opacity-70 p-3 text-start">
                ID
              </td>
              <td className="font-normal leading-none opacity-70 p-3 text-start">
                Device
              </td>
              <td className="font-normal leading-none opacity-70 p-3 text-start">
                Paid
              </td>
              <td className="font-normal leading-none opacity-70 p-3 text-start">
                Credits
              </td>
              <td className="font-normal leading-none opacity-70 p-3 text-start">
                Created At
              </td>
              <td className="font-normal leading-none opacity-70 p-3 text-start"></td>
            </tr>
          </thead>
          <tbody>
            {allTransactions?.map((trx, ind) => (
              <tr key={ind} className="border-b">
                <td className="p-3">{trx._id}</td>
                <td
                  className="p-3 underline text-blue-700 hover:text-blue-900 cursor-pointer"
                  onClick={() => {
                    lookupDevice(trx?.device);
                  }}
                >
                  {trx.device}
                </td>
                <td className="p-3">
                  {trx.paidout === true ? "✓ Paid" : "⛌ Not Paid"}
                </td>
                <td className="p-3">{trx.credits?.toFixed(2)}</td>
                <td className="p-3">{trx.createdAt}</td>
                <td className="p-3">
                  <button
                    onClick={() => payOut(trx?._id, trx.paidout)}
                    className="p-1.5  border-none outline-none bg-pink-300 text-white w-full rounded-md hover:bg-pink-400 active:bg-pink-600"
                  >
                    {trx.paidout === true ? "Reverse" : "Pay"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        id="DeviceInfoPopup"
        style={{ transform: "translateY(100%)" }}
        className="min-h-full w-screen left-0 top-0 fixed flex items-center justify-center transition-all duration-300"
      >
        <div className="xl:w-[60%] md:w-[70%] sm:w-[90%] p-3 bg-white shadow-lg rounded-md border-2">
          <div className="flex justify-end">
            <div onClick={closeDevicePopup} className="cursor-pointer">
              <MdClose size={20} />
            </div>
          </div>
          <div className="py-4">
            <div className="text-xl border-b p-3">
              Device Name: {selectedDeviceInfo?.name}
            </div>
            <div className="text-md border-b p-3">
              Device Type: {selectedDeviceInfo?.device_type}
            </div>
            <div className="text-md border-b p-3">
              Latitude: {selectedDeviceInfo?.lat}
            </div>
            <div className="text-md border-b p-3">
              Longitude: {selectedDeviceInfo?.long}
            </div>
            <div className="text-md border-b p-3">
              Device Size: {selectedDeviceInfo?.deviceSize}
            </div>
            <div className="text-md border-b p-3">
              Occupants: {selectedDeviceInfo?.numberOfOccupants}
            </div>
            <div className="text-md border-b p-3">
              SRF: {selectedDeviceInfo?.solarRadiationFactor}
            </div>
            <div className="text-md border-b p-3">
              Power Output: {selectedDeviceInfo?.powerOutputOfSolarPanel}
            </div>
            <div className="text-md border-b p-3">
              Region: {selectedDeviceInfo?.region}
            </div>
            <div className="text-md border-b p-3">
              User Id: {selectedDeviceInfo?.registered_against}
            </div>
            <div className="text-md border-b p-3">
              Created At: {selectedDeviceInfo?.createdAt}
            </div>
            <div className="text-md border-b p-3">
              last Updated: {selectedDeviceInfo?.updatedAt}
            </div>
            <div className="text-md border-b p-3">
              Comments: {selectedDeviceInfo?.comments}
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Transactions;

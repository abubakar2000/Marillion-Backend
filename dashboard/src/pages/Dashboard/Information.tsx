import Dashboard from "../../layouts/Dashboard";
import Sidebar from "../shared/Sidebar";
import Topbar from "../shared/Topbar";
import { AiFillGolden } from "react-icons/ai";
import { MdAccountCircle, MdVerifiedUser } from "react-icons/md";
import { BiSolidMapPin } from "react-icons/bi";
import { GiSolarPower } from "react-icons/gi";
import { FaFileContract } from "react-icons/fa";
import { useEffect, useState } from "react";
import userController from "../../utils/controllers/user";
import devicesController from "../../utils/controllers/devices";
import { API_URL } from "../../environment";

const Information = () => {
  const [totalUser, setTotalUser] = useState(0);
  const [totalDevices, setTotalDevices] = useState(0);
  const [totalUniqueRegions, setTotalUniqueRegions] = useState(0);
  const [totalCC, setTotalCC] = useState(0);
  useEffect(() => {
    userController.count((res: any) => {
      setTotalUser(res.data);
    });
    devicesController.count((res: any) => {
      setTotalDevices(res.data);
    });
    devicesController.countRegion((data: any) => {
      setTotalUniqueRegions(data.data);
    });

    let headersList = {
      Accept: "*/*",
    };

    fetch(`${API_URL}/device/calculateall`, {
      method: "POST",
      headers: headersList,
    }).then((data) =>
      data
        .json()
        .then((cc) => {
          setTotalCC(cc.data);
        })
        .catch((err) => {
          console.log(err);
        })
    );
  }, []);

  return (
    <div>
      <Dashboard sidebar={<Sidebar />} topbar={<Topbar label="Quick Info" />}>
        <div>
          <div className="text-2xl mb-3">Quick Information</div>
          <div className="flex-1 grid-cols-3 p-5 grid gap-5">
            <div className="min-h-[200pt] text-pink-400 shadow-lg rounded-md p-5 flex items-center justify-center flex-col bg-gray-50 border-2 gap-3">
              <MdAccountCircle size={50} color={"fill-ping-400"} />
              <div className="flex items-center justify-center gap-3 text-3xl">
                <div>{totalUser}</div>
                <div>Users</div>
              </div>
            </div>
            <div className="min-h-[200pt] text-pink-400 shadow-lg rounded-md p-5 flex items-center justify-center flex-col bg-gray-50 border-2 gap-3">
              <BiSolidMapPin size={50} color={"fill-ping-400"} />
              <div className="flex items-center justify-center gap-3 text-3xl">
                <div>{totalUniqueRegions}</div>
                <div>Regions</div>
              </div>
            </div>
            <div className="min-h-[200pt] text-pink-400 shadow-lg rounded-md p-5 flex items-center justify-center flex-col bg-gray-50 border-2 gap-3">
              <GiSolarPower size={50} color={"fill-ping-400"} />
              <div className="flex items-center justify-center gap-3 text-3xl">
                <div>{totalDevices}</div>
                <div>Devices</div>
              </div>
            </div>
            <div className="min-h-[200pt] text-pink-400 shadow-lg rounded-md p-5 flex items-center justify-center flex-col bg-gray-50 border-2 gap-3">
              <MdVerifiedUser size={50} color={"fill-ping-400"} />
              <div className="flex items-center justify-center gap-3 text-3xl">
                <div>12</div>
                <div>Subscription</div>
              </div>
            </div>
            <div className="min-h-[200pt] text-pink-400 shadow-lg rounded-md p-5 flex items-center justify-center flex-col bg-gray-50 border-2 gap-3">
              <FaFileContract size={50} color={"fill-ping-400"} />
              <div className="flex items-center justify-center gap-3 text-3xl">
                <div>{totalUniqueRegions}</div>
                <div>Location</div>
              </div>
            </div>
            <div className="min-h-[200pt] text-pink-400 shadow-lg rounded-md p-5 flex items-center justify-center flex-col bg-gray-50 border-2 gap-3">
              <AiFillGolden size={50} color={"fill-ping-400"} />
              <div className="flex items-center justify-center gap-3 text-3xl">
                <div>{totalCC.toFixed(1)}</div>
                <div>Credits</div>
              </div>
            </div>
          </div>
        </div>
      </Dashboard>
    </div>
  );
};

export default Information;

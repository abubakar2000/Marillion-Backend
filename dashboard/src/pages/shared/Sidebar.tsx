import { Link, useLocation } from "react-router-dom";
import { BiUser, BiSolidDashboard, BiDollarCircle } from "react-icons/bi";
import { FaLayerGroup } from "react-icons/fa";
import { GiSolarPower } from "react-icons/gi";
import { useState } from "react";
import clsx from "clsx";
import { Button } from "@material-tailwind/react";

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-center text-2xl font-semibold text-pink-300 tracking-wider">
        Marillion
      </div>
      <SidebarItem label="Dashboard" slug="/info" icon={<BiSolidDashboard />} />
      <SidebarItem label="User" slug="/users" icon={<BiUser />} />
      <SidebarItem label="Devices" slug="/devices" icon={<GiSolarPower />} />
      <SidebarItem
        label="Transactions"
        slug="/transactions"
        icon={<BiDollarCircle />}
      />
      <SidebarItem label="Plans" slug="/subscription" icon={<FaLayerGroup />} />
    </div>
  );
};

export default Sidebar;

interface SidebarItemProps {
  label?: string;
  icon?: any;
  slug?: string;
}

const SidebarItem = ({ label, icon, slug }: SidebarItemProps) => {
  const location = useLocation();
  const isActive = () => {
    return location.pathname.includes(slug ?? "");
  };
  icon = { ...icon, props: { size: 25, color: isActive() ? "white" : "gray" } };
  const [Icon, setIcon] = useState<any>({ ...icon });

  const onMouseEnter = () => {
    setIcon({ ...Icon, props: { ...Icon?.props, color: "black" } });
  };
  const onMouseLeave = () => {
    setIcon({
      ...Icon,
      props: { ...Icon?.props, color: isActive() ? "white" : "gray" },
    });
  };

  return (
    <div>
      <Link
        to={slug ?? "."}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Button
          className={clsx([
            "flex items-center justify-start bg-white hover:bg-pink-300 group w-full shadow-sm shadow-gray-400 border-none",
            "px-3 py-2 rounded-md hover:shadow-gray-500",
            isActive() && "bg-pink-300",
            "transition-all duration-300",
          ])}
        >
          {Icon}
          <div
            className={clsx([
              "text-md group-hover:text-black px-3",
              isActive() ? "text-white" : "text-gray-700",
            ])}
          >
            {label}
          </div>
        </Button>
      </Link>
    </div>
  );
};

import { ReactNode } from "react";

interface Props {
  sidebar?: string | JSX.Element | JSX.Element[];
  topbar?: string | JSX.Element | JSX.Element[];
  children?: string | JSX.Element | JSX.Element[] | ReactNode | ReactNode[];
}

const Dashboard = ({ topbar, children, sidebar }: Props) => {
  return (
    <div className="flex h-screen">
      <div className="p-2 border-r">{sidebar}</div>
      <div className="flex-1">
        <div className="p-3 border-b flex items-center bg-white">
          {topbar}{" "}
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="bg-pink-400 text-white px-3 py-1 rounded-md"
          >
            Logout
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

export default Dashboard;

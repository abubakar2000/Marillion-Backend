import Dashboard from "../../layouts/Dashboard";
import Sidebar from "../shared/Sidebar";
import Topbar from "../shared/Topbar";

const Subscription = () => {
  return (
    <Dashboard
      sidebar={<Sidebar />}
      topbar={<Topbar label="Subscription Plans" />}
    >
      <div className="text-2xl mb-3">Subscriptions</div>
      <div>No Subscriptions yet</div>
    </Dashboard>
  );
};

export default Subscription;

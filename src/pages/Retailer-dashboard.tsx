import { useState } from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '../components/UI/sidebar';
import { RetailerSidebar } from '../components/retailer-dashboard/Sidebar';
import { DashboardOverview } from '../components/retailer-dashboard/DashboardOverview';
import { BrowseMedicines } from '../components/retailer-dashboard/BrowseMedicine';
import { MyOrders } from '../components/retailer-dashboard/MyOrders';
import { Profile } from '../components/retailer-dashboard/Profile';

const RetailerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'browse-medicines':
        return <BrowseMedicines />;
      case 'my-orders':
        return <MyOrders />;
      case 'profile':
        return <Profile />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <SidebarProvider>
      <RetailerSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-gray-900">PharmaChain Retailer Portal</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto w-full">
            {renderContent()}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default RetailerDashboard;

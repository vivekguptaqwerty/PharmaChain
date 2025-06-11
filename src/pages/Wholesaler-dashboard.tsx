import { useState } from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '../components/UI/sidebar';
import { AppSidebar } from '../components/wholesaler-dashboard/AppSidebar';
import { DashboardOverview } from '../components/wholesaler-dashboard/DashboardOverview';
import { BrowseMedicines } from '../components/wholesaler-dashboard/BrowseMedicine';
import { AddProduct } from '../components/wholesaler-dashboard/AddProduct';
import { Orders } from '../components/wholesaler-dashboard/Orders';
import { MyProducts } from '../components/wholesaler-dashboard/MyProducts';
import { Profile } from '../components/wholesaler-dashboard/Profile';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'browse-medicines':
        return <BrowseMedicines />;
      case 'add-product':
        return <AddProduct />;
      case 'orders':
        return <Orders />;
      case 'my-products':
        return <MyProducts />;
      case 'profile':
        return <Profile />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-gray-900">PharmaChain Dashboard</h1>
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

export default Dashboard;

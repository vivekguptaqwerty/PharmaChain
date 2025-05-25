import { useState } from 'react';
import { SidebarProvider } from '../components/UI/sidebar';
import { AppSidebar } from '../components/manufucturer-dashboard/AppSidebar';
import { DashboardOverview } from '../components/manufucturer-dashboard/DashboardOverview';
import { AddProduct } from '../components/manufucturer-dashboard/AddProduct';
import { MyProduct } from '../components/manufucturer-dashboard/MyProduct';
import { OrdersReceived } from '../components/manufucturer-dashboard/OrdersReceived';
import { Profile } from '../components/manufucturer-dashboard/Profile';
import { SidebarInset, SidebarTrigger } from '../components/UI/sidebar';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'add-product':
        return <AddProduct />;
      case 'my-products':
        return <MyProduct />;
      case 'orders':
        return <OrdersReceived />;
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
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">PharmaChain Dashboard</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="max-w-7xl mx-auto w-full">
            {renderContent()}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard;
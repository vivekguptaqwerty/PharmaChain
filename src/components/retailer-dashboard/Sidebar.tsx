import { Search, ShoppingCart, User, Building2, LayoutDashboard } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '../../components/UI/sidebar';

interface RetailerSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  {
    id: 'overview',
    title: 'Overview',
    icon: LayoutDashboard,
  },
  {
    id: 'browse-medicines',
    title: 'Browse Medicines',
    icon: Search,
  },
  {
    id: 'my-orders',
    title: 'My Orders',
    icon: ShoppingCart,
  },
  {
    id: 'profile',
    title: 'Profile',
    icon: User,
  },
];

export function RetailerSidebar({ activeTab, setActiveTab }: RetailerSidebarProps) {
  return (
    <Sidebar collapsible="icon" className="border-r border-blue-100">
      <SidebarHeader className="bg-gradient-to-r from-blue-50 to-green-50">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <h2 className="text-lg font-bold text-gray-900">PharmaChain</h2>
            <p className="text-xs text-blue-600">Retailer Portal</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveTab(item.id)}
                    isActive={activeTab === item.id}
                    tooltip={item.title}
                    className={`${
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

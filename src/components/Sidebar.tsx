import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Mail, 
  FileText, 
  Tags, 
  UserCircle,
  Settings,
  X,
  FileCheck,
  CreditCard,
  ChevronDown,
  ChevronRight,
  UsersRound,
  DollarSign,
  ClipboardCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { title: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  {
    title: 'HR',
    icon: UsersRound,
    subItems: [
      { title: 'Employees', icon: Users, path: '/hr/employees' },
      { title: 'Salary', icon: DollarSign, path: '/hr/salary' },
      { title: 'Attendance', icon: ClipboardCheck, path: '/hr/attendance' },
    ]
  },
  {
    title: 'Sales',
    icon: CreditCard,
    subItems: [
      { title: 'Leads', icon: UserCircle, path: '/leads' },
      { title: 'Quotation', icon: FileCheck, path: '/quotation' },
      { title: 'Payments', icon: CreditCard, path: '/payments' },
    ]
  },
  {
    title: 'Inventory',
    icon: Package,
    subItems: [
      { title: 'Products', icon: Package, path: '/products' },
      { title: 'Categories', icon: Tags, path: '/categories' },
    ]
  },
  {
    title: 'Content',
    icon: FileText,
    subItems: [
      { title: 'Blogs', icon: FileText, path: '/blogs' },
    ]
  },
  {
    title: 'Communication',
    icon: Mail,
    subItems: [
      { title: 'Contacts', icon: Mail, path: '/contacts' },
    ]
  },
  {
    title: 'System',
    icon: Settings,
    subItems: [
      { title: 'Users', icon: Users, path: '/users' },
      { title: 'Settings', icon: Settings, path: '/settings' },
    ]
  },
];

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (title: string) => {
    setOpenMenus(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen bg-[hsl(222,47%,11%)] border-r border-sidebar-border z-50 transition-transform duration-300 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          "w-64"
        )}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-sidebar-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-elegant">
              <span className="text-white font-bold text-xl">Z</span>
            </div>
            <div>
              <h1 className="text-sidebar-foreground font-heading font-bold text-lg leading-tight">
                Zentroverse
              </h1>
              <p className="text-sidebar-foreground/60 text-xs">Admin Panel</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path || item.title}>
                {'path' in item ? (
                  // Single menu item
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth text-[hsl(210,40%,98%)] hover:text-white hover:bg-[hsl(217,33%,17%)]",
                        isActive && "bg-[hsl(250,69%,61%)] text-white font-medium shadow-elegant"
                      )
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </NavLink>
                ) : (
                  // Collapsible menu group
                  <Collapsible
                    open={openMenus[item.title]}
                    onOpenChange={() => toggleMenu(item.title)}
                  >
                    <CollapsibleTrigger className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-smooth text-[hsl(210,40%,98%)] hover:text-white hover:bg-[hsl(217,33%,17%)]">
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </div>
                      {openMenus[item.title] ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-1">
                      <ul className="space-y-1 ml-4 pl-4 border-l border-[hsl(217,33%,17%)]">
                        {item.subItems?.map((subItem) => (
                          <li key={subItem.path}>
                            <NavLink
                              to={subItem.path}
                              onClick={onClose}
                              className={({ isActive }) =>
                                cn(
                                  "flex items-center gap-3 px-4 py-2 rounded-lg transition-smooth text-[hsl(210,40%,85%)] hover:text-white hover:bg-[hsl(217,33%,17%)]",
                                  isActive && "bg-[hsl(250,69%,61%)] text-white font-medium"
                                )
                              }
                            >
                              <subItem.icon className="h-4 w-4" />
                              <span className="text-sm">{subItem.title}</span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="text-sidebar-foreground/50 text-xs text-center">
            © 2025 Zentroverse
          </div>
        </div>
      </aside>
    </>
  );
};

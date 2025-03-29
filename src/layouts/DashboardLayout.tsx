
import { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Truck, 
  ClipboardList,
  LogOut,
  Menu,
  X,
  ChevronRight,
  FileText,
  StoreIcon
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      path: "/dashboard/pos",
      name: "Atendimento",
      icon: <StoreIcon className="h-5 w-5" />
    },
    {
      path: "/dashboard/products",
      name: "Produtos",
      icon: <Package className="h-5 w-5" />
    },
    {
      path: "/dashboard/inventory",
      name: "Estoque",
      icon: <ClipboardList className="h-5 w-5" />
    },
    {
      path: "/dashboard/orders",
      name: "Pedidos",
      icon: <ShoppingCart className="h-5 w-5" />
    },
    {
      path: "/dashboard/invoices",
      name: "Notas Fiscais",
      icon: <FileText className="h-5 w-5" />
    },
    {
      path: "/dashboard/customers",
      name: "Clientes",
      icon: <Users className="h-5 w-5" />
    },
    {
      path: "/dashboard/suppliers",
      name: "Fornecedores",
      icon: <Truck className="h-5 w-5" />
    }
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar toggle button (mobile only) */}
      {isMobile && !sidebarOpen && (
        <button 
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-50 rounded-md bg-primary p-2 text-white shadow-md"
        >
          <Menu className="h-5 w-5" />
        </button>
      )}

      {/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:relative lg:translate-x-0"
        )}
      >
        {/* Sidebar header */}
        <div className="flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold">VendaHub</h1>
          {isMobile && (
            <button 
              onClick={() => setSidebarOpen(false)}
              className="rounded-md p-1 text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Business name */}
        <div className="mb-6 px-4">
          <p className="text-sm font-medium">{user?.businessName || "Meu Negócio"}</p>
          <div className="mt-1">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
              {user?.plan === 'pro' ? 'Plano Pro' : user?.plan === 'standard' ? 'Plano Padrão' : 'Trial Gratuito'}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )
              }
              onClick={() => isMobile && setSidebarOpen(false)}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
              {location.pathname === item.path && (
                <ChevronRight className="ml-auto h-4 w-4" />
              )}
            </NavLink>
          ))}
        </nav>

        {/* User and logout */}
        <div className="mt-auto border-t border-sidebar-border/50 p-4">
          <div className="mb-2 flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-accent-foreground">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{user?.name || "Usuário"}</p>
              <p className="text-xs text-sidebar-foreground/70">{user?.email || "email@exemplo.com"}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2 w-full justify-start border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import UserList from "./pages/Users/UserList";
import ProductList from "./pages/Products/ProductList";
import QuotationList from "./pages/Quotation/QuotationList";
import PaymentList from "./pages/Payments/PaymentList";
import Employees from "./pages/HR/Employees";
import Salary from "./pages/HR/Salary";
import Attendance from "./pages/HR/Attendance";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import LeadsList from "./pages/Leads/LeadsList";
import LeadForm from "./pages/Leads/LeadForm";
import LandingLeadsList from "./pages/Leads/LandingLeadsList";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />

          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            {/* HR Module */}
            <Route path="/hr/employees" element={<Employees />} />
            <Route path="/hr/salary" element={<Salary />} />
            <Route path="/hr/attendance" element={<Attendance />} />

            {/* Sales Module */}
            <Route path="/leads" element={<LandingLeadsList />} />
            <Route path="/leads/new" element={<LeadForm />} />
            <Route path="/leads/:id/edit" element={<LeadForm />} />
            <Route path="/quotation" element={<QuotationList />} />
            <Route path="/payments" element={<PaymentList />} />

            {/* Inventory Module */}
            <Route path="/products" element={<ProductList />} />
            <Route path="/categories" element={<ProductList />} />

            {/* Content Module */}
            <Route path="/blogs" element={<ProductList />} />

            {/* Communication Module */}
            <Route path="/contacts" element={<UserList />} />

            {/* System Module */}
            <Route path="/users" element={<UserList />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

// src/routes/index.tsx
import NotFound from "@/components/pages/NotFound";

// Guest
import HomePage from "@/components/pages/HomePage";
import LoginPage from "@/components/pages/LoginPage";
import RegisterPage from "@/components/pages/RegisterPage";
import PropertyPage from "@/components/pages/PropertyPage";

// Tenant
import TenantPropertyPage from "@/components/pages/TenantPropertyPage";
import TenantDetailPropertyPage from "@/components/pages/TenantDetailPropertyPage";
import TenantRentalHistoryPage from "@/components/pages/TenantRentalHistoryPage";
import TenantProfilePage from "@/components/pages/TenantProfilePage";

// Owner
import OwnerPropertyPage from "@/components/pages/OwnerPropertyPage";
import OwnerDetailPropertyPage from "@/components/pages/OwnerDetailPropertyPage";
import OwnerCreatePropertyPage from "@/components/pages/OwnerCreatePropertyPage";
import OwnerProfilePage from "@/components/pages/OwnerProfilePage";
import OwnerUpdatePropertyPage from "@/components/pages/OwnerUpdatePropertyPage";

// Admin
import AdminApprovalsPage from "@/components/pages/AdminApprovalsPage";
import AdminDetailApprovalsPage from "@/components/pages/AdminDetailApprovalsPage";
import AdminProfilePage from "@/components/pages/AdminProfilePage";

export const routes = [
  // Guest
  { path: "/", element: <HomePage /> },
  { path: "/property", element: <PropertyPage /> },
  { path: "/auth/login", element: <LoginPage /> },
  { path: "/auth/register", element: <RegisterPage /> },

  // Tenant
  { path: "/tenant/property", element: <TenantPropertyPage /> },
  { path: "/tenant/property/:id", element: <TenantDetailPropertyPage /> },
  { path: "/tenant/rental/history", element: <TenantRentalHistoryPage /> },
  { path: "/tenant/profile", element: <TenantProfilePage /> },

  // Owner
  { path: "/owner/property", element: <OwnerPropertyPage /> },
  { path: "/owner/property/:id", element: <OwnerDetailPropertyPage /> },
  { path: "/owner/property/create", element: <OwnerCreatePropertyPage /> },
  { path: "/owner/property/update/:id", element: <OwnerUpdatePropertyPage /> },
  { path: "/owner/profile", element: <OwnerProfilePage /> },

  // Admin
  { path: "/admin/approvals", element: <AdminApprovalsPage /> },
  { path: "/admin/approvals/:id", element: <AdminDetailApprovalsPage /> },
  { path: "/admin/profile", element: <AdminProfilePage /> },

  { path: "*", element: <NotFound /> },
];

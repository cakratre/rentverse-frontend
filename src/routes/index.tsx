// src/routes/index.tsx
import NotFound from "@/pages/NotFound";

// Guest
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";

// Tenant
import TenantHomePage from "@/pages/TenantHomePage";
import TenantPropertyPage from "@/pages/TenantPropertyPage";
import TenantDetailPropertyPage from "@/pages/TenantDetailPropertyPage";
import TenantRentalAgreementPage from "@/pages/TenantRentalAgreementPage";
import TenantDetailRentalAgreementPage from "@/pages/TenantDetailRentalAgreementPage";
import TenantProfilePage from "@/pages/TenantProfilePage";

// Owner
import OwnerHomePage from "@/pages/OwnerHomePage";
import OwnerAddPropertyPage from "@/pages/OwnerAddPropertyPage";

// Admin
import AdminApprovalsPage from "@/pages/AdminApprovalsPage";
import AdminDetailApprovalsPage from "@/pages/AdminDetailApprovalsPage";
import AdminManageUserPage from "@/pages/AdminManageUserPage";
import AdminDetailManageUserPage from "@/pages/AdminDetailManageUserPage";
import AdminProfilePage from "@/pages/AdminProfilePage";

export const routes = [

  // Guest
  { path: "/", element: <HomePage /> },
  { path: "/auth/login", element: <LoginPage /> },
  { path: "/auth/register", element: <RegisterPage /> },

  // Tenant
  { path: "/tenant", element: <TenantHomePage /> },
  { path: "/tenant/property", element: <TenantPropertyPage /> },
  { path: "/tenant/property/id", element: <TenantDetailPropertyPage /> },
  { path: "/tenant/rental-agreement", element: <TenantRentalAgreementPage /> },
  { path: "/tenant/rental-agreement/id", element: <TenantDetailRentalAgreementPage /> },
  { path: "/tenant/profile", element: <TenantProfilePage /> },

  // Owner
  { path: "/owner", element: <OwnerHomePage /> },
  { path: "/owner/property/add", element: <OwnerAddPropertyPage /> },

  // Admin
  { path: "/admin", element: <AdminApprovalsPage /> },
  { path: "/admin/approvals/id", element: <AdminDetailApprovalsPage /> },
  { path: "/admin/manage-user", element: <AdminManageUserPage /> },
  { path: "/admin/manage-user/id", element: <AdminDetailManageUserPage /> },
  { path: "/admin/profile", element: <AdminProfilePage /> },

  { path: "*", element: <NotFound /> },
];

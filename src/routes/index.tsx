// src/routes/index.tsx
import NotFound from "@/components/pages/NotFound";

// Guest
import HomePage from "@/components/pages/HomePage";
import LoginPage from "@/components/pages/LoginPage";
import RegisterPage from "@/components/pages/RegisterPage";

// Tenant
import TenantHomePage from "@/components/pages/TenantHomePage";
import TenantPropertyPage from "@/components/pages/TenantPropertyPage";
import TenantDetailPropertyPage from "@/components/pages/TenantDetailPropertyPage";
import TenantRentalAgreementPage from "@/components/pages/TenantRentalAgreementPage";
import TenantDetailRentalAgreementPage from "@/components/pages/TenantDetailRentalAgreementPage";
import TenantProfilePage from "@/components/pages/TenantProfilePage";

// Owner
import OwnerPropertyPage from "@/components/pages/OwnerPropertyPage";
import OwnerDetailPropertyPage from "@/components/pages/OwnerDetailPropertyPage";
import OwnerCreatePropertyPage from "@/components/pages/OwnerCreatePropertyPage";
import OwnerPredictPricePage from "@/components/pages/OwnerPredictPricePage";
import OwnerProfilePage from "@/components/pages/OwnerProfilePage";

// Admin
import AdminApprovalsPage from "@/components/pages/AdminApprovalsPage";
import AdminDetailApprovalsPage from "@/components/pages/AdminDetailApprovalsPage";
import AdminProfilePage from "@/components/pages/AdminProfilePage";

export const routes = [
  // Guest
  { path: "/", element: <HomePage /> },
  { path: "/auth/login", element: <LoginPage /> },
  { path: "/auth/register", element: <RegisterPage /> },

  // Tenant
  { path: "/tenant", element: <TenantHomePage /> },
  { path: "/tenant/property", element: <TenantPropertyPage /> },
  { path: "/tenant/property/:id", element: <TenantDetailPropertyPage /> },
  { path: "/tenant/rental-agreement", element: <TenantRentalAgreementPage /> },
  {
    path: "/tenant/rental-agreement/:id",
    element: <TenantDetailRentalAgreementPage />,
  },
  { path: "/tenant/profile", element: <TenantProfilePage /> },

  // Owner
  { path: "/owner/property", element: <OwnerPropertyPage /> },
  { path: "/owner/property/:id", element: <OwnerDetailPropertyPage /> },
  { path: "/owner/property/create", element: <OwnerCreatePropertyPage /> },
  {
    path: "/owner/property/create/predict",
    element: <OwnerPredictPricePage />,
  },
  { path: "/owner/profile", element: <OwnerProfilePage /> },

  // Admin
  { path: "/admin/approvals", element: <AdminApprovalsPage /> },
  { path: "/admin/approvals/:id", element: <AdminDetailApprovalsPage /> },
  { path: "/admin/profile", element: <AdminProfilePage /> },

  { path: "*", element: <NotFound /> },
];

import { Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "@/layouts/AdminLayout";
import { PublicLayout } from "@/layouts/PublicLayout";
import { AboutPage } from "@/pages/About";
import { ContactPage } from "@/pages/Contact";
import { Home } from "@/pages/Home";
import { NotFoundPage } from "@/pages/NotFound";
import { PrivacyPage } from "@/pages/Privacy";
import { ServicesPage } from "@/pages/Services";
import { TermsPage } from "@/pages/Terms";
import { WorkPage } from "@/pages/Work";
import { WorkDetailPage } from "@/pages/WorkDetail";
import { AdminAuditLogsPage } from "@/pages/admin/AuditLogs";
import { AdminDashboardPage } from "@/pages/admin/Dashboard";
import { AdminInquiriesPage } from "@/pages/admin/Inquiries";
import { AdminInquiryDetailPage } from "@/pages/admin/InquiryDetail";
import { AdminLoginPage } from "@/pages/admin/Login";
import { AdminSettingsPage } from "@/pages/admin/Settings";

export function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/:slug" element={<WorkDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/inquiries" element={<AdminInquiriesPage />} />
        <Route path="/admin/inquiries/:id" element={<AdminInquiryDetailPage />} />
        <Route path="/admin/audit-logs" element={<AdminAuditLogsPage />} />
        <Route path="/admin/settings" element={<AdminSettingsPage />} />
        <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
}

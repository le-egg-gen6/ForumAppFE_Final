import MainLayout from "@/custom_component/layout/MainLayout";
import ProtectedRoute from "@/router/ProtectedRoute";

export function protectPage(children: React.ReactNode) {
  return <ProtectedRoute>
    <MainLayout>
        {children}
    </MainLayout>
  </ProtectedRoute>;
}

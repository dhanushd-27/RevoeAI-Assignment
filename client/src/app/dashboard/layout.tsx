"use client"

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/lib/store/store";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <Provider store={store}>
      <main>
        {children}
      </main>
    </Provider>
  );
};

export default DashboardLayout;

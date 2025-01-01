import React from "react";
import { Header } from "./_components/Header";
import Navbar from "@/components/ui/Navbar";

function DashboardLayout({ children }) {
  return (
    <div>
      
      <Navbar />
      <div className="mx-5 md:mx-20 lg:,mx:36">{children}</div>
    </div>
  );
}

export default DashboardLayout;

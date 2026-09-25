import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/layout/Sidebar";

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-64 lg:block"><Sidebar /></aside>
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background/80 px-5 backdrop-blur lg:hidden">
        <div className="font-heading text-2xl font-light">Sahara<span className="text-gold">.</span></div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="rounded-full p-2 hover:bg-muted"><Menu className="h-5 w-5" /></button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 border-0 p-0 [&>button]:text-white">
            <Sidebar onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </header>
      <main className="lg:pl-64">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-7xl px-5 py-10 lg:px-12 lg:py-14"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}
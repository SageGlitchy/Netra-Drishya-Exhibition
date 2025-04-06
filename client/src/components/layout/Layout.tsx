import { PropsWithChildren } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { motion } from "framer-motion";

interface LayoutProps {
  fullHeight?: boolean;
}

export function Layout({ children, fullHeight = false }: PropsWithChildren<LayoutProps>) {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <motion.main 
        className={`flex-grow ${fullHeight ? "" : "pt-20"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}

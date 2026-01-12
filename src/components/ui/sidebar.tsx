"use client";
import { cn } from "@/lib/utils";
import { Link, LinkProps } from "react-router-dom";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  const { className, children } = props;
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar className={className}>{children as React.ReactNode}</MobileSidebar>
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  // Floating sidebar with rounded corners, always open
  return (
    <motion.div
      className={cn(
        "h-[calc(100%-32px)] m-4 px-4 py-4 hidden md:flex md:flex-col bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 w-[260px] flex-shrink-0 shadow-xl relative z-50",
        className
      )}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      {/* Fixed Mobile Header Bar */}
      <div
        className={cn(
          "h-14 px-4 flex flex-row md:hidden items-center justify-between bg-white dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-800 w-full shadow-sm fixed top-0 left-0 right-0 z-[60]",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-3">
          <IconMenu2
            className="text-neutral-800 dark:text-neutral-200 cursor-pointer hover:text-primary transition-colors w-6 h-6"
            onClick={() => setOpen(!open)}
          />
          <span className="font-bold text-sm text-foreground">CodeX Admin</span>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[70] md:hidden"
              onClick={() => setOpen(false)}
            />
            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed top-0 left-0 h-full w-[280px] bg-white dark:bg-[#0F172A] p-6 z-[80] flex flex-col shadow-2xl border-r border-slate-200 dark:border-slate-800",
                className
              )}
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-bold text-lg gradient-text">CodeX Admin</span>
                <IconX 
                  className="text-neutral-800 dark:text-neutral-200 cursor-pointer hover:text-destructive transition-colors w-6 h-6"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="flex-1 overflow-y-auto">
                {children}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
  props?: LinkProps;
}) => {
  // Always show label (no animation hide)
  return (
    <Link
      to={link.href}
      className={cn(
        "flex items-center justify-start gap-3 group/sidebar py-3 px-4 rounded-xl transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:shadow-md hover:scale-[1.02]",
        className
      )}
      {...props}
    >
      <div className="text-neutral-600 dark:text-neutral-300 group-hover/sidebar:text-primary transition-colors flex-shrink-0">
        {link.icon}
      </div>

      <span className="text-neutral-700 dark:text-neutral-200 text-sm font-medium group-hover/sidebar:translate-x-1 transition-transform duration-300">
        {link.label}
      </span>
    </Link>
  );
};

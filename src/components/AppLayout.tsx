import { ReactNode } from "react";
import DesktopNav from "./DesktopNav";
import BottomNav from "./BottomNav";

interface AppLayoutProps {
  children: ReactNode;
  hideBottomNav?: boolean;
}

const AppLayout = ({ children, hideBottomNav }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <DesktopNav />
      {children}
      {!hideBottomNav && <div className="md:hidden"><BottomNav /></div>}
    </div>
  );
};

export default AppLayout;

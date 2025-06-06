import type { ReactNode } from "react";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { cn } from "../utils/cn";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <section className="min-h-screen flex flex-col max-w-screen">
      <Header />
      <section className={cn("flex flex-1 flex-col", "md:flex-row")}>
        <Sidebar />
        <main className="flex-1 bg-grayDark w-full overflow-x-hidden">
          {children}
        </main>
      </section>
    </section>
  );
};

export default MainLayout;

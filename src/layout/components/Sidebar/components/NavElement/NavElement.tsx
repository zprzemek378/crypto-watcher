import type { ReactNode } from "react";
import { cn } from "../../../../../utils/cn";
import { Link } from "react-router-dom";

type NavElementProps = {
  children: ReactNode;
  selected: boolean;
  to: string;
};

const NavElement = ({ children, selected, to }: NavElementProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "h-16 flex items-center px-4 font-bold",
        selected
          ? "text-black bg-gradient-to-r from-grayMedium to-grayLight"
          : ""
      )}
    >
      {children}
    </Link>
  );
};

export default NavElement;

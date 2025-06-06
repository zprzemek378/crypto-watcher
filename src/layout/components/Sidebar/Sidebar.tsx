import { useLocation } from "react-router-dom";
import { cn } from "../../../utils/cn";
import NavElement from "./components/NavElement/NavElement";

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <aside
      className={cn(
        "bg-gradient-to-r from-blackMuted to-grayDarker  border-blackMuted",
        "w-full",
        "md:w-[262px] md:border-x"
      )}
    >
      <NavElement to="/" selected={pathname === "/"}>
        Pick favourites
      </NavElement>
      <NavElement to="my-crypto" selected={pathname === "/my-crypto"}>
        My cryptocurrencies
      </NavElement>
    </aside>
  );
};

export default Sidebar;

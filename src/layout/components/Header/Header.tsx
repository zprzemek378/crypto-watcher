import { cn } from "../../../utils/cn";

const Header = () => {
  return (
    <header
      className={cn(
        "bg-blackMuted flex items-center",
        "flex-col",
        "md:flex-row md:justify-between md:px-10 md:py-7"
      )}
    >
      <div className={cn("jersey-10-regular text-7xl", "py-7", "md:py-0")}>
        CryptoWatcher
      </div>
      <div
        className={cn(
          "bg-gradient-to-r from-blackMuted to-grayDarker w-full",
          "h-16 flex items-center px-4 font-bold",
          "md:bg-none md:from-transparent md:to-transparent md:w-fit"
        )}
      >
        My wallet USD value: $93,200.00
      </div>
    </header>
  );
};

export default Header;

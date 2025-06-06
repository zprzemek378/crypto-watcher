import { cn } from "../../utils/cn";
import Box from "@mui/material/Box";
import CryptoForm from "./components/CryptoForm/CryptoForm";
import {
  toggleFavorite,
  type CryptoToken,
} from "../../features/crypto/cryptoSlice";
import { useAppDispatch } from "../../app/hooks";
import heartEmptyIcon from "../../assets/icons/heart-empty.svg";
import heartFullIcon from "../../assets/icons/heart-full.svg";

type CryptoCardProps = {
  isFullView: boolean;
  isCenter: boolean;
  slide: CryptoToken;
};

const CryptoCard = ({ isFullView, isCenter, slide }: CryptoCardProps) => {
  const dispatch = useAppDispatch();

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(slide.short));
  };

  return (
    <Box
      sx={{ backgroundColor: "#332e2e", color: "#ffffff" }}
      className={cn(
        "mt-16 flex flex-col items-center max-w-[500px] rounded-[10px] bg-black transition-transform duration-300 mx-auto",
        isCenter ? "scale-100" : "scale-50 opacity-60"
      )}
    >
      <img src={slide.img} alt={slide.name} className="size-40 my-12" />
      <div className="font-bold text-2xl">
        {slide.name} ({slide.short})
      </div>
      <div
        className={cn("mt-3 flex flex-col text-center", "md:flex-row md:gap-2")}
      >
        <a>Current price:</a>
        <a>${slide.currentPrice.toFixed(2)}</a>
      </div>
      <div
        className={cn(
          "mt-3 flex flex-col text-center",
          "md:flex-row md:gap-2 md:mt-0"
        )}
      >
        <a>{isFullView ? "Value in USD:" : "Last check:"}</a>
        <a>
          {isFullView
            ? `$${(slide.balance * slide.currentPrice).toFixed(2)}`
            : "12/31/2024 11:00 a.m."}
        </a>
      </div>

      {isFullView && <CryptoForm slide={slide} />}
      <button onClick={handleToggleFavorite}>
        <img
          className="mt-4 ml-auto p-3"
          alt={slide.isFavorite ? "Ulubione" : "Nieulubione"}
          src={slide.isFavorite ? heartFullIcon : heartEmptyIcon}
        />
      </button>
    </Box>
  );
};

export default CryptoCard;

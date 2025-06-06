import { useSelector } from "react-redux";
import Carousel from "../../common/carousel/Carousel";
import type { RootState } from "../../app/store";
import type { CryptoToken } from "../../features/crypto/cryptoSlice";
import { cn } from "../../utils/cn";

const Favorites = () => {
  const cryptos: CryptoToken[] = useSelector(
    (state: RootState) => state.crypto.list
  );

  return (
    <div>
      <h1
        className={cn("text-center font-bold mt-9", "text-3xl", "md:text-7xl")}
      >
        Pick favourites
      </h1>
      <Carousel slides={cryptos} isFullView={false} />
    </div>
  );
};

export default Favorites;

import { useSelector } from "react-redux";
import Carousel from "../../common/carousel/Carousel";
import type { CryptoToken } from "../../features/crypto/cryptoSlice";
import type { RootState } from "../../app/store";
import { cn } from "../../utils/cn";

const MyCrypto = () => {
  const cryptos: CryptoToken[] = useSelector(
    (state: RootState) => state.crypto.list
  );

  return (
    <div>
      <h1
        className={cn("text-center font-bold mt-9", "text-3xl", "md:text-7xl")}
      >
        My cryptocurrencies
      </h1>
      <Carousel slides={cryptos} isFullView={true} />
    </div>
  );
};

export default MyCrypto;

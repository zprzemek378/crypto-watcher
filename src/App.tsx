import MainLayout from "./layout/MainLayout";
import Favorites from "./pages/favorites/Favorites";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyCrypto from "./pages/my-crypto/MyCrypto";
import { useAppDispatch } from "./app/hooks";
import { useEffect } from "react";

import cryptoData from "./features/crypto/cryptoData.json";
import {
  increaseAllPrices,
  initializeCryptos,
} from "./features/crypto/cryptoSlice";

const INCREASE_INTERVAL_IN_SECONDS = 30;

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeCryptos(cryptoData));
  }, [dispatch]);

  setInterval(() => {
    dispatch(increaseAllPrices());
  }, INCREASE_INTERVAL_IN_SECONDS * 1000);

  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Favorites />} />
          <Route path="/my-crypto" element={<MyCrypto />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;

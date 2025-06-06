import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CryptoDataJSON {
  name: string;
  short: string;
  img: string;
  currentPrice: number;
  units: {
    unitName: string;
    unit: number;
  }[];
}

export interface CryptoToken extends CryptoDataJSON {
  isFavorite: boolean;
  balance: number;
}

interface CryptoState {
  list: CryptoToken[];
}

const LOCAL_KEY = "cryptoState";

const loadState = (): Partial<
  Record<string, { isFavorite: boolean; balance: number }>
> => {
  const data = localStorage.getItem(LOCAL_KEY);
  return data ? JSON.parse(data) : {};
};

const saveState = (cryptos: CryptoToken[]) => {
  const saveObj = cryptos.reduce((acc, crypto) => {
    acc[crypto.short] = {
      isFavorite: crypto.isFavorite,
      balance: crypto.balance,
    };
    return acc;
  }, {} as Record<string, { isFavorite: boolean; balance: number }>);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(saveObj));
};

const initialState: CryptoState = {
  list: [],
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    initializeCryptos(state, action: PayloadAction<CryptoDataJSON[]>) {
      const localData = loadState();
      state.list = action.payload.map((c) => {
        const local = localData[c.short] || { isFavorite: false, balance: 0 };
        return {
          ...c,
          isFavorite: local.isFavorite,
          balance: local.balance,
        };
      });
      saveState(state.list);
    },
    toggleFavorite(state, action: PayloadAction<string>) {
      const item = state.list.find((c) => c.short === action.payload);
      if (item) {
        item.isFavorite = !item.isFavorite;
        saveState(state.list);
      }
    },
    updateBalance(
      state,
      action: PayloadAction<{ short: string; balance: number }>
    ) {
      const item = state.list.find((c) => c.short === action.payload.short);
      if (item) {
        item.balance = action.payload.balance;
        saveState(state.list);
      }
    },
    increaseAllPrices(state) {
      state.list.forEach((c) => {
        c.currentPrice += 1;
      });
    },
  },
});

export const {
  initializeCryptos,
  toggleFavorite,
  updateBalance,
  increaseAllPrices,
} = cryptoSlice.actions;

export default cryptoSlice;

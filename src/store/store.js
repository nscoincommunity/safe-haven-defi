import { configureStore } from "@reduxjs/toolkit";

import appReducer from "./slices/app-slice";
import userReducer from "./slices/user-slice/reducer";
import farmsReducer from "./slices/farms-slice";
import stakeReducer from "./slices/stake-slice";
import blockReducer from './slices/block-slice';
import multicallReducer from './slices/multicall-slice';
import swapReducer from './slices/swap-slice/reducer';
import listsReducer from './slices/lists-slice/reducer';
import transactionsReducer from './slices/transactions-slice/reducer';
import poolsReducer from './slices/pools-slice';
import isoReducer from './slices/iso-slice';

const store = configureStore({
    reducer: {
        app: appReducer,
        user: userReducer,
        farms: farmsReducer,
        stake: stakeReducer,
        block: blockReducer,
        multicall: multicallReducer,
        swap: swapReducer,
        lists: listsReducer,
        transactions: transactionsReducer,
        pools: poolsReducer,
        iso: isoReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;

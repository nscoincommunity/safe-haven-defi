import { ethers } from "ethers";
import WrappedBNBContractABI from "../../abi/wbnbContract.json";
import BusdContractABI from "../../abi/busdContract.json";
import { getHavenTokenAddress } from "../../utils/addressHelpers";
import { getHavenTokenContract, getDividendDistributorContract, getsltTokenContract } from "../../utils/contractHelpers";
import { setAll } from "../../utils/set-all";
import { createSlice, createSelector, createAsyncThunk, createAction } from "@reduxjs/toolkit";

export const loadAppDetails = createAsyncThunk(
    "app/loadAppDetails",
    async ({ provider, account }) => {
        const wrappedBNBContract = new ethers.Contract("0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", WrappedBNBContractABI, provider);
        const BUSDContract = new ethers.Contract("0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", BusdContractABI, provider);
        const havenContract = getHavenTokenContract(provider);
        const dividendDistributorContract = getDividendDistributorContract(provider);
        const sltTokenContract = getsltTokenContract(provider);
        const WBNBbalanceOfLP = (await wrappedBNBContract.balanceOf("0x63373252f5090B3CEE061348D627A17cf6Ab360F")) / Math.pow(10, 18);
        const HavenBalanceOfLP = (await havenContract.balanceOf("0x63373252f5090B3CEE061348D627A17cf6Ab360F")) / Math.pow(10, 9);
        const circulatingSupply = (await havenContract.getCirculatingSupply()) / Math.pow(10, 9);
        const slttotalSupply = (await sltTokenContract.totalSupply()) / Math.pow(10, 18);

        const priceOfSLTInBNB = (await wrappedBNBContract.balanceOf("0x869F4e106c8f2b9062F93Db214FE23Fb073873e1")) / await sltTokenContract.balanceOf("0x869F4e106c8f2b9062F93Db214FE23Fb073873e1");
        const priceOfCoinInBNB = WBNBbalanceOfLP / HavenBalanceOfLP;
        const priceOfBNB = (await BUSDContract.balanceOf("0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16")) / (await wrappedBNBContract.balanceOf("0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16"));
        let priceOfOneHaven  = priceOfBNB * priceOfCoinInBNB;
        let priceOfOneSLT = priceOfBNB * priceOfSLTInBNB;
        if( isNaN(priceOfOneHaven) ===  true) {
			priceOfOneHaven = 0.00;
		}
        if( isNaN(priceOfOneSLT) ===  true) {
			priceOfOneSLT = 0.00;
		}
        let marketCap = circulatingSupply * priceOfOneHaven;
        let sltmarketCap = slttotalSupply * priceOfOneSLT;
        const liquidityPoolInDollars = priceOfBNB * (WBNBbalanceOfLP * 2);
        let balanceOfUser = 0;
        if (account) {
            balanceOfUser = ethers.utils.formatEther(await havenContract.balanceOf(account)) * 1000000000;    
        }
        const totalBNBFee =  parseInt(await havenContract.getTotalFee(true));
        let unpaidEarnings = 0;
        if (account) {
            unpaidEarnings = ethers.utils.formatEther(await dividendDistributorContract.getUnpaidEarnings(account));   
        }
        const buyTaxFee = parseInt(await havenContract.getTotalFee(false));
        let totalRealised = 0;
        if (account) {
            totalRealised = ethers.utils.formatEther((await dividendDistributorContract.shares(account)).totalRealised);
        }
        const burntTokens =  (await havenContract.balanceOf("0x000000000000000000000000000000000000dead")) / Math.pow(10, 9);
        const sltburntTokens =  (await sltTokenContract.balanceOf("0x000000000000000000000000000000000000dead")) / Math.pow(10, 18);
        const taxSaleInPercentage = totalBNBFee / 100
        const buyTaxInPercentage =  buyTaxFee / 100

        const totalDistributed = (await dividendDistributorContract.totalDistributed()) / Math.pow(10, 18);
        const balanceOfContract = (await provider.getBalance(getHavenTokenAddress())) / Math.pow(10, 18);
        return {
            priceOfOneHaven,
            priceOfOneSLT,
            sltmarketCap,
            marketCap,
            liquidityPoolInDollars,
            circulatingSupply,
            balanceOfUser,
            totalRealised,
            unpaidEarnings,
            taxSaleInPercentage,
            buyTaxInPercentage,
            burntTokens,
            sltburntTokens,
            totalDistributed,
            balanceOfContract,
            slttotalSupply
        };
    },
);

export const changeDrawer = createAction('lists/changeDrawer')

const initialState = {
    loading: true,
    isDrawerSmall: false
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        fetchAppSuccess(state, action) {
            setAll(state, action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadAppDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loadAppDetails.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(loadAppDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            })
            .addCase(changeDrawer, (state, action) => {
                state.isDrawerSmall = action.payload
            })
    },
});

const baseInfo = (state) => state.app;

export default appSlice.reducer;

export const { fetchAppSuccess } = appSlice.actions;

export const getAppState = createSelector(baseInfo, app => app);

import { useEffect, useCallback, useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import useActiveWeb3React from '../hooks/useActiveWeb3React';
import { loadAppDetails } from "../store/slices/app-slice";
import Loading from "../components/PageLoader";
import ViewBase from "../components/ViewBase";
import { 
    Stake, 
    Dashboard, 
    NotFound, 
    Farms, 
    SafeFarms, 
    Swap, 
    RedirectToSwap,
    Pools,
    Ifos,
    Referral
} from "../views";
import { usePollFarmsWithUserData } from '../store/slices/farms-slice/hooks';
import { usePollStakesWithUserData } from '../store/slices/stake-slice/hooks';
import { usePollIsosWithUserData } from '../store/slices/iso-slice/hooks'
import { useFetchPublicPoolsData } from '../store/slices/pools-slice/hooks'
import useEagerConnect from '../hooks/useEagerConnect'
import { usePollBlockNumber } from '../store/slices/block-slice/hooks'
import "./style.scss";

function App() {
    const dispatch = useDispatch();
    const { library, account } = useActiveWeb3React();
    usePollBlockNumber()
    useEagerConnect()
    usePollFarmsWithUserData()
    usePollStakesWithUserData()
    usePollIsosWithUserData()
    useFetchPublicPoolsData()

    // const isAppLoading = useSelector(state => state.app.loading);
    const [isAppLoading, setIsAppLoading] = useState(true)

    setTimeout(() => {
        setIsAppLoading(false)
    }, [1000])

    async function loadDetails(whichDetails) {
        if (whichDetails === "app") {
            loadApp(library);
        }
    }

    const loadApp = useCallback(
        loadProvider => {
            dispatch(loadAppDetails({ provider: loadProvider, account }));
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [account]
    );

    useEffect(() => {
        loadDetails("app");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account]);

    if (isAppLoading) return <Loading />;

    return (
        <ViewBase>
            <Switch>
                <Route exact path="/dashboard">
                    <Dashboard />
                </Route>

                <Route exact path="/">
                    <Redirect to="/dashboard" />
                </Route>

                <Route path="/pools">
                    <Stake />
                </Route>

                <Route path="/safefarms">
                    <SafeFarms />
                </Route>

                <Route path="/farms">
                    <Farms />
                </Route>

                <Route path="/safepad">
                    <Ifos />
                </Route>

                <Route path="/swap">
                    <Swap />
                </Route>

                <Route path="/swap/:outputCurrency">
                    <RedirectToSwap />
                </Route>

                <Route path="/safestake">
                    <Pools />
                </Route>

                <Route path="/referral">
                    <Referral />
                </Route>

                <Route component={NotFound} />
            </Switch>
        </ViewBase>
    );
}

export default App;

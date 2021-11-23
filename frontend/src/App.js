import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from "./components/Navigation/Navbar";
import Loader from "./components/Loader";
import Spinner from "./components/Spinner";

import Pages from "./pages";

import * as Action from "./redux-store/actions";

function App() {
    // const [appInitialized, setAppInitialized] = useState(false);
    // const user = useSelector((state) => (state.user && state.user.profile) || {});
    const appInitialized = useSelector((state) => (state.user && state.user.appInitialized) || false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(Action.getUserData(), dispatch);
    }, []);
    return (
        <div className="App">
            {appInitialized !== false ? (
                <Router basename="/">
                    <Loader />
                    <Navbar />
                    <Pages />
                </Router>
            ) : (
                <Spinner />
            )}
        </div>
    );
}

export default App;

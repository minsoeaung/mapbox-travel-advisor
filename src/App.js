import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import getPlacesData from "./api/index";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

const App = () => {
    const [places, setPlaces] = useState([]);
    const [bounds, setBounds] = useState({});
    const [clickedMarker, setClickedMarker] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getPlacesData(bounds.ne, bounds.sw).then((data) => {
            if (data !== undefined) {
                setPlaces(data);
                setIsLoading(false);
            }
        });

    }, [bounds]); // re-fetch places data every time bounds change

    return (
        <div>
            <CssBaseline />
            <Header />

            <Grid container>
                <Grid items xs={12} md={4}>
                    <List places={places} clickedMarker={clickedMarker} isLoading={isLoading} />
                </Grid>
                <Grid items xs={12} md={8}>
                    <Map
                        setBounds={setBounds}
                        places={places}
                        setClickedMarker={setClickedMarker}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default App;

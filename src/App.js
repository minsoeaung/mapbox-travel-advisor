import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import getPlacesData from "./api/index";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

const App = () => {
    const [places, setPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});

    useEffect(() => {
        getPlacesData(bounds.ne, bounds.sw).then((data) => {
            console.log("fetched some data")
            setPlaces(data);
        });
    }, [bounds]); // re-fetch places data every time bounds change

    return (
        <div>
            <CssBaseline />
            <Header />

            <Grid container>
                <Grid items xs={12} md={4}>
                    <List places={places} />
                </Grid>
                <Grid items xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default App;

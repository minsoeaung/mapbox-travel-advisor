import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import getPlacesData from "./api/index";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

const App = () => {
    const [places, setPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState(null);

    useEffect(() => {
        getPlacesData().then((data) => {
            setPlaces(data);
        });
    }, []);

    return (
        <div>
            <CssBaseline />
            <Header />

            <Grid container>
                <Grid items xs={12} md={4}>
                    <List />
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

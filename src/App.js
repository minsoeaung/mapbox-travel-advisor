import React, { useEffect, useState, createRef } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import getPlacesData from "./api/index";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

const App = () => {
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [bounds, setBounds] = useState({});
    const [clickedMarker, setClickedMarker] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState("restaurants");
    const [rating, setRating] = useState("");
    const geocoderContainerRef = createRef();

    useEffect(() => {
        setIsLoading(true);
        getPlacesData(type, bounds.ne, bounds.sw).then((data) => {
            if (data !== undefined) {
                setPlaces(data);
                setFilteredPlaces([]);
                setIsLoading(false);
            }
        });

    }, [type, bounds]);

    useEffect(() => {
        setFilteredPlaces(places.filter(place => place.rating > rating))
    }, [rating])

    return (
        <div>
            <CssBaseline />
            <Header containerRef={geocoderContainerRef} />

            <Grid container>
                <Grid items xs={12} md={4}>
                    <List
                        places={filteredPlaces.length ? filteredPlaces : places}
                        clickedMarker={clickedMarker}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid items xs={12} md={8}>
                    <Map
                        setBounds={setBounds}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setClickedMarker={setClickedMarker}
                        containerRef={geocoderContainerRef}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default App;

import React, {
    useRef,
    useEffect,
    useState,
    useCallback,
    useMemo,
} from "react";
import { Paper, Typography, useMediaQuery } from "@mui/material";
import Rating from "@mui/material/Rating";

import MapGL, { GeolocateControl, Marker } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

import useStyles from "./styles";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOXGL_ACCESS_TOKEN;

const Map = ({ places, setBounds, setClickedMarker, containerRef }) => {
    const classes = useStyles();
    const desktopScreen = useMediaQuery("(min-width:600px)");

    const [viewport, setViewport] = useState({
        latitude: 16.806513845650294,
        longitude: 96.15593339811613,
        zoom: 12.303149558712713,
    });

    const mapRef = useRef();

    useEffect(() => {
        const bounds = mapRef.current.getMap().getBounds();
        setBounds({
            ne: bounds._ne,
            sw: bounds._sw,
        });
    }, []);

    const handleViewportChange = useCallback((newViewport) => {
        setViewport(newViewport);
    }, []);

    const handleGeocoderViewportChange = useCallback((newViewport) => {
        const geocoderDefaultOverrides = { transitionDuration: 1000 };
        return handleViewportChange({
            ...newViewport,
            ...geocoderDefaultOverrides,
        });
    }, []);

    /* 
        1. every wheel moment counted ( want it to count only when wheel action end )
        2. for some reason, transition made by mouse skip sometime
        // change this later, for now, implement api and show result on list, depending on bounds
    */
    const handleTransitionEnd = useCallback(() => {
        const bounds = mapRef.current.getMap().getBounds();
        setBounds({
            ne: bounds._ne,
            sw: bounds._sw,
        });
    }, [setBounds]);

    /* 
        adding markers about places to the map


        Performance notes: 
        if a large number of markers are needed, it's generally favorable to cache the <Marker> nodes, 
        so that we don't rerender them when the viewport changes. 
        https://visgl.github.io/react-map-gl/docs/api-reference/marker
    */

    const markers = useMemo(
        () =>
            places?.map((place, i) => {
                if (!isNaN(place.longitude)) {
                    return (
                        <Marker
                            longitude={Number(place.longitude)}
                            latitude={Number(place.latitude)}
                            key={i}
                            className={classes.markerContainer}
                            offsetLeft={-20}
                            offsetTop={-10}
                            onClick={() => {
                                setClickedMarker(i);
                            }}
                        >
                            {!desktopScreen ? (
                                <LocationOnOutlinedIcon
                                    color="primary"
                                    fontSize="large"
                                />
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography
                                        className={classes.typography}
                                        variant="subtitle2"
                                        gutterBottom
                                    >
                                        {" "}
                                        {place.name}
                                    </Typography>
                                    <img
                                        className={classes.pointer}
                                        alt={place.name}
                                        src={
                                            place.photo
                                                ? place.photo.images.large.url
                                                : "https://jooinn.com/images/blur-restaurant-1.png"
                                        }
                                    />
                                    <Rating
                                        name="read-only"
                                        size="small"
                                        value={Number(place.rating)}
                                        readOnly
                                    />
                                </Paper>
                            )}
                        </Marker>
                    );
                } else {
                    return null;
                }
            }),
        [
            places,
            setClickedMarker,
            classes.markerContainer,
            classes.paper,
            classes.pointer,
            classes.typography,
            desktopScreen,
        ]
    );

    return (
        <div className={classes.mapContainer}>
            <MapGL
                ref={mapRef}
                {...viewport}
                width="100%"
                height="100%"
                onViewportChange={handleViewportChange}
                onTransitionEnd={handleTransitionEnd}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                mapStyle="mapbox://styles/mapbox/streets-v11"
            >
                <Geocoder
                    mapRef={mapRef}
                    containerRef={containerRef}
                    onViewportChange={handleGeocoderViewportChange}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    inputValue=""
                />
                <GeolocateControl
                    style={{ top: 10, right: 10 }}
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation={true}
                    auto
                />
                {markers}
            </MapGL>
        </div>
    );
};

export default Map;

import React, { useRef, useEffect, useState, useCallback } from "react";
// import { Paper, Typography, useMediaQuery } from '@material-ui/core'

import MapGL, { GeolocateControl } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

import useStyles from "./styles";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOXGL_ACCESS_TOKEN;

const Map = ({ setCoordinates, setBounds, coordinates }) => {
    const classes = useStyles();

    const [viewport, setViewport] = useState({
        latitude: 16.806513845650294,
        longitude: 96.15593339811613,
        zoom: 12.303149558712713,
    });

    const mapRef = useRef();
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

    return (
        <div className={classes.mapContainer}>
            <MapGL
                ref={mapRef}
                {...viewport}
                width="100%"
                height="100%"
                onViewportChange={handleViewportChange}
                mapboxApiAccessToken={MAPBOX_TOKEN}
            >
                <Geocoder
                    mapRef={mapRef}
                    onViewportChange={handleGeocoderViewportChange}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    position="top-left"
                />
                <GeolocateControl
                    style={{ top: 10, right: 10 }}
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation={true}
                    auto
                />
            </MapGL>
        </div>
    );
};

export default Map;

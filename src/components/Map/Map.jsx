import React, { useRef, useEffect, useState } from "react"
// import GoogleMapReact from 'google-map-react'
// import { Paper, Typography, useMediaQuery } from '@material-ui/core'
// import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'

import useStyles from './styles'

/* 
    GoogleMapReact does not work without billing, so mapbox-gl is the one to use
*/

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_ACCESS_TOKEN;

const Map = () => {
    const classes = useStyles()
    // const isMobile = useMediaQuery('(min-width: 600px)')

    // const coordinates = { lat: 0, lng: 0 }

    const mapContainer = useRef(null)
    const map = useRef(null)
    const [lng, setLng] = useState(96.1561)
    const [lat, setLat] = useState(16.7870)
    const [zoom, setZoom] = useState(14.52)

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    return (
        <div ref={mapContainer} className={classes.mapContainer}>
            {/* <div className={classes.sidebar}>Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}</div> */}
        </div>
    );
}

export default Map
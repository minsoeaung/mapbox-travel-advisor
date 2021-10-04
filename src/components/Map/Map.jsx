import React, { useRef, useEffect, useState } from "react"
// import GoogleMapReact from 'google-map-react'
// import { Paper, Typography, useMediaQuery } from '@material-ui/core'
// import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'

import useStyles from './styles'

/* 
    GoogleMapReact does not work without billing, so mapbox-gl is the one to use
*/

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoibWluc29lYXVuZyIsImEiOiJja3Vjamo5d3UxMTR4Mm9sbXB1emU3dTlqIn0.IsvkqXCFX7OpiHXPrtc2sA';

const Map = () => {
    const classes = useStyles()
    // const isMobile = useMediaQuery('(min-width: 600px)')

    // const coordinates = { lat: 0, lng: 0 }

    const mapContainer = useRef(null)
    const map = useRef(null)
    const [lng, setLng] = useState(97.5799)
    const [lat, setLat] = useState(19.5138)
    const [zoom, setZoom] = useState(4.68)

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
    /* 
        <div className={classes.sidebar}>
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
    */

    return (
        <div ref={mapContainer} className={classes.mapContainer}></div>
    );
}

export default Map
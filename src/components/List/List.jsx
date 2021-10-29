import React, {useState, useEffect, createRef} from "react";
import {
    CircularProgress,
    Grid,
    Typography,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
} from "@mui/material";

import PlaceDetails from "../PlaceDetails/PlaceDetails";

import useStyles from "./styles";

const List = ({
                  places,
                  clickedMarker,
                  isLoading,
                  type,
                  setType,
                  rating,
                  setRating,
              }) => {
    const classes = useStyles();
    const [elementRefs, setElementRefs] = useState([]);

    useEffect(() => {
        const refs = Array(places?.length)
            .fill()
            .map((_, i) => elementRefs[i] || createRef());

        setElementRefs(refs);
    }, [places]);

    return (
        <div className={classes.container}>
            <Typography variant="h4">
                Restaurants, Hotels & Attractions around you
            </Typography>

            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem"/>
                </div>
            ) : (
                <>
                    {/* form selector div */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "start",
                        }}
                    >
                        <FormControl
                            className={classes.formControl}
                            sx={{m: 1, minWidth: 150}}
                        >
                            <InputLabel id="type-label">Type</InputLabel>
                            <Select
                                labelId="type-label"
                                label="Type"
                                id="typeID"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <MenuItem value={"restaurants"}>
                                    Restaurants
                                </MenuItem>
                                <MenuItem value={"hotels"}>Hotels</MenuItem>
                                <MenuItem value={"attractions"}>
                                    Attractions
                                </MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl
                            className={classes.formControl}
                            sx={{m: 1, minWidth: 150}}
                        >
                            <InputLabel id="rating-label">Rating</InputLabel>
                            <Select
                                labelId="rating-label"
                                label="Rating"
                                id="ratingID"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                            >
                                <MenuItem value={0}>All</MenuItem>
                                <MenuItem value={3}>Above 3.0</MenuItem>
                                <MenuItem value={4}>Above 4.0</MenuItem>
                                <MenuItem value={4.5}>Above 4.5</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    {/* card div */}

                    {/* 
                        need to wrap with div and give some padding to prevent grid overflow
                        link : https://mui.com/components/grid/#limitations
                    */}
                    <div style={{paddingTop: 25}}>
                        <Grid container spacing={3} className={classes.list}>
                            {places?.map((place, index) => (
                                <Grid
                                    ref={elementRefs[index]}
                                    item
                                    key={index}
                                    xs={12}
                                >
                                    <PlaceDetails
                                        place={place}
                                        selected={clickedMarker === index}
                                        refProp={elementRefs[index]}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </>
            )}
        </div>
    );
};

export default List;

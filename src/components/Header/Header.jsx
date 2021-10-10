import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@material-ui/core";

import useStyles from "./styles";

const Header = ({ containerRef }) => {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5" className={classes.title}>
                    Travel Advisor
                </Typography>
                <Box display="flex">
                    <Typography variant="h6" className={classes.title}>
                        Explore new places
                    </Typography>
                    <div className={classes.search}>
                        <div ref={containerRef} />
                    </div>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;

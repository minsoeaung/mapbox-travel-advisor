import React from "react";
import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import useStyles from "./styles";

const Header = ({ containerRef, mode, setMode }) => {
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
                    <div>
                        {mode} mode
                        <IconButton
                            sx={{ ml: 1 }}
                            onClick={() => setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))}
                            color="inherit"
                        >
                            {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                        </IconButton>
                    </div>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;

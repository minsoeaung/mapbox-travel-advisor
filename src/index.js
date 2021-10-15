import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';

import App from './App'

const theme = createTheme({
    type: "light"
})

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
    document.getElementById("root")
)
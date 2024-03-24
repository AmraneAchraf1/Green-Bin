import { createTheme } from "@mui/material";



const theme = createTheme({
    palette: {
        primary: {
        main: "#6b5",
        },
        secondary: {
        main: "#1c1c1c",
        },
        background: {
        default: "#f5f5f5",
        },
    },
    components: {
        MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: 32,
            },

        },
        },
    },
    typography: {
        fontFamily: "Poppins, sans-serif",
    },
});

export default theme;
import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#3155a4',
        },
        secondary: {
            main: '#6b4eff',
        },
        background: {
            default: '#f5f7fb',
            paper: '#ffffff',
        },
    },
    shape: {
        borderRadius: 10,
    },
    typography: {
        fontFamily: [
            'Inter',
            'Segoe UI',
            'Roboto',
            'Arial',
            'sans-serif',
        ].join(','),
        h4: {
            fontWeight: 800,
        },
        button: {
            textTransform: 'none',
            fontWeight: 700,
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
        },
    },
});

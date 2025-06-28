import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Heebo,-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 }
  },
  palette: {
    primary: {
      main: "#667eea",
      light: "#8fa5ff",
      dark: "#3554b7"
    },
    secondary: {
      main: "#764ba2",
      light: "#a477d4",
      dark: "#462272"
    },
    success: { main: "#4CAF50" },
    warning: { main: "#FF9800" },
    error: { main: "#f44336" },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff"
    },
    grey: {
      50:  '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      500: '#9e9e9e',
    },
    divider: 'rgba(102, 126, 234, 0.2)',
    custom: {
      white: '#fff',
      disabled: '#bdbdbd',
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'#ffffff\\' fill-opacity=\\'0.05\\'%3E%3Ccircle cx=\\'30\\' cy=\\'30\\' r=\\'4\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
            zIndex: 0
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 30px 60px rgba(0, 0, 0, 0.15)"
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          padding: "12px 30px",
          fontSize: "1.1rem",
          fontWeight: 600,
          textTransform: "none",
          background: "linear-gradient(45deg, #667eea, #764ba2)",
          transition: "all 0.3s ease",
          "&:hover": {
            background: "linear-gradient(45deg, #764ba2, #667eea)",
            transform: "scale(1.05)",
            boxShadow: "0 10px 20px rgba(118, 75, 162, 0.3)"
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            "&:hover fieldset": {
              borderColor: "#667eea"
            }
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20
        }
      }
    }
  }
});

export default theme;
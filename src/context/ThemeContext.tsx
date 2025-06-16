import React, {
    createContext,
    useMemo,
    useState,
    useContext,
    useEffect,
} from 'react';
import {ThemeProvider, createTheme, CssBaseline} from '@mui/material';
import setupAppKit from "../utils/setupAppKit.ts";

type PaletteMode = 'light' | 'dark';

interface ThemeContextProps {
    toggleColorMode: () => void;
    mode: PaletteMode;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context)
        throw new Error('useThemeContext must be used within ThemeProviderCustom');
    return context;
};

export const ThemeProviderCustom: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [mode, setMode] = useState<PaletteMode>(() => {
        const savedMode = localStorage.getItem('paletteMode') as PaletteMode | null;
        return savedMode || 'light';
    });

    useEffect(() => {
        localStorage.setItem('paletteMode', mode);
    }, [mode]);

    useEffect(() => {
        const setupApp = setupAppKit(mode);
        setupApp.setThemeMode(mode);
    }, [mode]);

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode]
    );

    return (
        <ThemeContext.Provider value={{toggleColorMode, mode}}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
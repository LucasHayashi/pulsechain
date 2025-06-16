import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {useThemeContext} from "../context/ThemeContext.tsx";

const ThemeToggleButton = () => {
    const {toggleColorMode, mode} = useThemeContext();

    return (
        <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`} enterDelay={1000}>
            <IconButton color="inherit" onClick={toggleColorMode}>
                {mode === 'light' ? <DarkModeIcon/> : <LightModeIcon/>}
            </IconButton>
        </Tooltip>
    );
};

export default ThemeToggleButton;
import {useAppKitAccount} from '@reown/appkit/react';
import {useContractLink} from "./hooks/useContractLink.ts";

import {
    Container, AppBar, Toolbar, Typography,
    Alert, Divider, Link, Box, IconButton, Stack, Chip
} from '@mui/material';
import {GitHub, Language, ContentCopy} from '@mui/icons-material';

import CreatePulseForm from "./components/CreatePulseForm.tsx";
import PulseFeed from "./components/PulseFeed.tsx";
import ThemeToggleButton from './components/ThemeToggleButton';

import imgLogo from './assets/pulsechain.png';

function App() {
    const {isConnected} = useAppKitAccount();
    const {contractLink, contractAddress} = useContractLink();
    const footerDate = new Date().getFullYear();

    const handleCopyContract = () => {
        navigator.clipboard.writeText(contractAddress);
    };

    return (
        <>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: 'primary.main',
                }}
            >
                <Toolbar
                    sx={{
                        width: '100%',
                        maxWidth: 'md',
                        mx: 'auto',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="h6" component="div" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                    }}>
                        PulseChain <img src={imgLogo} alt={'Pulsechain Logo'} height={25} />
                    </Typography>
                    <appkit-button />
                    <ThemeToggleButton />
                </Toolbar>
            </AppBar>

            <Container maxWidth="md" sx={{py: 2, minHeight: 'calc(100vh - 200px)'}}>
                {isConnected ? (
                    <>
                        <CreatePulseForm/>
                        <Divider sx={{my: 4}}/>
                    </>
                ) : (
                    <Alert severity="info" sx={{my: 2}}>
                        Please connect your wallet to interact with and create Pulses.
                    </Alert>
                )}
                <PulseFeed/>
            </Container>

            <Box
                component="footer"
                sx={{
                    mt: 'auto',
                    py: 4,
                    px: 2,
                    background: (theme) =>
                        theme.palette.mode === 'dark'
                            ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
                            : 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
                    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                }}
            >
                <Container maxWidth="md">
                    <Stack spacing={3}>
                        <Stack
                            direction={{xs: 'column', md: 'row'}}
                            justifyContent="space-between"
                            alignItems={{xs: 'center', md: 'flex-start'}}
                            spacing={3}
                        >
                            <Box textAlign={{xs: 'center', md: 'left'}}>
                                <Typography variant="h6" component="div" sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                }}>
                                    PulseChain <img src={imgLogo} alt={'Pulsechain Logo'} height={25} />
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{maxWidth: 300}}
                                >
                                    Connecting the community through decentralized pulses on the blockchain.
                                </Typography>
                            </Box>

                            {/* Social Links */}
                            <Stack direction="row" spacing={1}>
                                <IconButton
                                    href={'https://github.com/LucasHayashi'}
                                    target={'_blank'}
                                    size="small"
                                    sx={{
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            transition: 'transform 0.2s ease-in-out'
                                        }
                                    }}
                                >
                                    <GitHub/>
                                </IconButton>
                                <IconButton
                                    href={'https://hayashi.dev.br/'}
                                    target={'_blank'}
                                    size="small"
                                    sx={{
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            transition: 'transform 0.2s ease-in-out'
                                        }
                                    }}
                                >
                                    <Language/>
                                </IconButton>
                            </Stack>
                        </Stack>

                        {/* Contract Information */}
                        <Box
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                backgroundColor: (theme) =>
                                    theme.palette.mode === 'dark'
                                        ? 'rgba(255, 255, 255, 0.05)'
                                        : 'rgba(0, 0, 0, 0.05)',
                                border: (theme) => `1px solid ${theme.palette.divider}`,
                            }}
                        >
                            <Stack
                                direction={{xs: 'column', sm: 'row'}}
                                alignItems="center"
                                justifyContent="space-between"
                                spacing={2}
                            >
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Typography variant="body2" color="text.secondary">
                                        Smart Contract:
                                    </Typography>
                                    <Chip
                                        label={`${contractAddress.slice(0, 6)}...${contractAddress.slice(-4)}`}
                                        size="small"
                                        variant="outlined"
                                        sx={{fontFamily: 'monospace'}}
                                    />
                                </Stack>

                                <Stack direction="row" spacing={1}>
                                    <IconButton
                                        size="small"
                                        onClick={handleCopyContract}
                                        title="Copy contract address"
                                    >
                                        <ContentCopy fontSize="small"/>
                                    </IconButton>
                                    <Link
                                        href={contractLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{textDecoration: 'none'}}
                                    >
                                        <Chip
                                            label="View on Explorer"
                                            size="small"
                                            clickable
                                            sx={{
                                                '&:hover': {
                                                    transform: 'scale(1.05)',
                                                    transition: 'transform 0.2s ease-in-out'
                                                }
                                            }}
                                        />
                                    </Link>
                                </Stack>
                            </Stack>
                        </Box>

                        <Divider/>

                        {/* Final Footer */}
                        <Stack
                            direction={{xs: 'column', sm: 'row'}}
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                        >
                            <Typography variant="body2" color="text.secondary">
                                © {footerDate} PulseChain. Developed with ❤️ for the community.
                            </Typography>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </>
    );
}

export default App;
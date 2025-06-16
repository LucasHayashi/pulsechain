import {useState, useEffect} from 'react';
import {useWriteEnsRegistryPostPulse} from "../generated.ts";
import {useWaitForTransactionReceipt} from 'wagmi';
import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    CircularProgress,
    Snackbar
} from '@mui/material';

function CreatePulseForm() {
    const [content, setContent] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const {
        writeContract: createPulse,
        data: hash,
        isPending,
        error
    } = useWriteEnsRegistryPostPulse();

    const {
        isLoading: isConfirming,
        isSuccess: isConfirmed,
        error: confirmError
    } = useWaitForTransactionReceipt({
        hash,
    });

    // Reset form when transaction is confirmed
    useEffect(() => {
        if (isConfirmed) {
            setContent('');
            setShowSuccess(true);
        }
    }, [isConfirmed]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        createPulse({
            args: [content.trim()]
        });
    };

    const isLoading = isPending || isConfirming;

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{maxWidth: 'md', margin: 'auto', mb: 4}}>
            <Typography variant="h6" gutterBottom>
                Create New Pulse
            </Typography>

            <TextField
                fullWidth
                multiline
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's happening?"
                variant="outlined"
                disabled={isLoading}
                sx={{mb: 2}}
                slotProps={
                    {
                        htmlInput: {
                            maxLength: 280
                        }
                    }
                }
                helperText={`${content.length}/280 characters`}
            />

            <Button
                type="submit"
                variant="contained"
                disabled={!content.trim() || isLoading}
                startIcon={isLoading ? <CircularProgress size={20}/> : null}
            >
                {isPending ? 'Confirming...' : isConfirming ? 'Publishing...' : 'Publish Pulse'}
            </Button>

            {/* Transaction status */}
            {isPending && (
                <Alert severity="info" sx={{mt: 2}}>
                    Awaiting wallet confirmation...
                </Alert>
            )}

            {isConfirming && (
                <Alert severity="info" sx={{mt: 2}}>
                    Transaction sent! Awaiting blockchain confirmation...
                    {hash && (
                        <Typography variant="caption" component="div">
                            Hash: {hash}s
                        </Typography>
                    )}
                </Alert>
            )}

            {/* Errors */}
            {(error || confirmError) && (
                <Alert severity="error" sx={{mt: 2}}>
                    {error?.message || confirmError?.message || 'Error creating pulse'}
                </Alert>
            )}

            {/* Success snackbar */}
            <Snackbar
                open={showSuccess}
                autoHideDuration={4000}
                onClose={() => setShowSuccess(false)}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
                <Alert
                    onClose={() => setShowSuccess(false)}
                    severity="success"
                    sx={{width: '100%'}}
                >
                    Pulse published successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default CreatePulseForm;

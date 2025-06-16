import {
    useWriteEnsRegistryLikePulse,
    useWriteEnsRegistryUnlikePulse,
    useWriteEnsRegistryDeletePulse
} from "../generated.ts";

import {useAppKitAccount} from "@reown/appkit/react";
import {useWaitForTransactionReceipt} from "wagmi";
import {useState, useEffect} from "react";

import {
    Card,
    CardContent,
    CardActions,
    IconButton,
    Typography,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button, Snackbar, Alert
} from "@mui/material";
import {Favorite, FavoriteBorder, Delete} from '@mui/icons-material';

type Pulse = {
    id: bigint;
    content: string;
    author: `0x${string}`;
    timestamp: bigint;
    likes: bigint;
    status: number; // 0 for ACTIVE, 1 for DELETED
};

function PulseCard({pulse, isLikedByCurrentUser, isConnected}: { pulse: Pulse; isLikedByCurrentUser: boolean; isConnected: boolean }) {
    const {address} = useAppKitAccount();

    // Write contracts
    const {writeContract: likePulse, data: likeHash, isPending: isLikePending} = useWriteEnsRegistryLikePulse();
    const {writeContract: unlikePulse, data: unlikeHash, isPending: isUnlikePending} = useWriteEnsRegistryUnlikePulse();
    const {writeContract: deletePulse, data: deleteHash, isPending: isDeletePending} = useWriteEnsRegistryDeletePulse();

    // Wait for transaction receipts
    const {isLoading: isLikeConfirming} = useWaitForTransactionReceipt({
        hash: likeHash,
    });

    const {isLoading: isUnlikeConfirming} = useWaitForTransactionReceipt({
        hash: unlikeHash,
    });

    const {isLoading: isDeleteConfirming, isSuccess: isDeleteConfirmed} = useWaitForTransactionReceipt({
        hash: deleteHash,
    });

    // Local UI states
    const [isDeleted, setIsDeleted] = useState(false);
    const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false); // State for custom dialog

    // Disconnect Snackbar
    const [showDisconnect, setShowDisconnect] = useState(false);

    // Update state when delete transaction is confirmed
    useEffect(() => {
        if (isDeleteConfirmed) {
            setIsDeleted(true);
        }
    }, [isDeleteConfirmed]);

    // Computed states
    const isLikeLoading = isLikePending || isLikeConfirming;
    const isUnlikeLoading = isUnlikePending || isUnlikeConfirming;
    const isDeleteLoading = isDeletePending || isDeleteConfirming;
    const isAnyLikeActionLoading = isLikeLoading || isUnlikeLoading;

    const handleLikeToggle = () => {
        if (isAnyLikeActionLoading) return; // Prevent clicks during loading

        if (!isConnected) {
            setShowDisconnect(true);
            return;
        }

        if (isLikedByCurrentUser) {
            unlikePulse({args: [pulse.id]});
        } else {
            likePulse({args: [pulse.id]});
        }
    };

    const handleDeleteClick = () => {
        setShowDeleteConfirmDialog(true); // Open the custom dialog
    };

    const handleConfirmDelete = () => {
        setShowDeleteConfirmDialog(false); // Close dialog
        if (isDeleteLoading) return; // Prevent clicks during loading
        deletePulse({args: [pulse.id]});
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirmDialog(false); // Close dialog
    };

    // If the pulse has been deleted, do not render (or render with opacity)
    if (isDeleted) {
        return (
            <Card variant="outlined" sx={{opacity: 0.5}}>
                <CardContent>
                    <Typography variant="body2" color="text.secondary" style={{fontStyle: 'italic'}}>
                        Pulse removed
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="body1" sx={{wordBreak: 'break-word', mb: 2}}>
                    {pulse.content}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Author: {pulse.author}
                    <br/>
                    Date: {new Date(Number(pulse.timestamp) * 1000).toLocaleString()}
                </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{pt: 0}}>
                <IconButton
                    aria-label="like"
                    onClick={handleLikeToggle}
                    disabled={isAnyLikeActionLoading}
                >
                    {isAnyLikeActionLoading ? (
                        <CircularProgress size={20}/>
                    ) : (
                        isLikedByCurrentUser ? <Favorite color="error"/> : <FavoriteBorder/>
                    )}
                </IconButton>
                <Typography variant="body2">{pulse.likes.toString()}</Typography>

                {/* Show like transaction status */}
                {isLikeLoading && (
                    <Typography variant="caption" color="primary" sx={{ml: 1}}>
                        Liking...
                    </Typography>
                )}
                {isUnlikeLoading && (
                    <Typography variant="caption" color="primary" sx={{ml: 1}}>
                        Unliking...
                    </Typography>
                )}

                {address === pulse.author && (
                    <IconButton
                        aria-label="delete"
                        onClick={handleDeleteClick} // Use new handler to open dialog
                        sx={{ml: 'auto'}}
                        disabled={isDeleteLoading}
                    >
                        {isDeleteLoading ? (
                            <CircularProgress size={20}/>
                        ) : (
                            <Delete/>
                        )}
                    </IconButton>
                )}

                {/* Show delete transaction status */}
                {isDeleteLoading && (
                    <Typography variant="caption" color="error" sx={{ml: 1}}>
                        {isDeletePending ? 'Confirming...' : 'Deleting...'}
                    </Typography>
                )}
            </CardActions>

            {/* Custom Delete Confirmation Dialog */}
            <Dialog
                open={showDeleteConfirmDialog}
                onClose={handleCancelDelete}
                aria-labelledby="delete-dialog-title"
                aria-describedby="delete-dialog-description"
            >
                <DialogTitle id="delete-dialog-title">{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <Typography id="delete-dialog-description">
                        Are you sure you want to remove this Pulse? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete} disabled={isDeleteLoading}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} autoFocus color="error" disabled={isDeleteLoading}>
                        {isDeleteLoading ? <CircularProgress size={20}/> : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Disconnect snackbar */}
            <Snackbar
                open={showDisconnect}
                autoHideDuration={4000}
                onClose={() => setShowDisconnect(false)}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
                <Alert
                    onClose={() => setShowDisconnect(false)}
                    severity="info"
                    sx={{width: '100%'}}
                >
                    Please connect your wallet to like Pulses
                </Alert>
            </Snackbar>
        </Card>
    );
}

export default PulseCard;

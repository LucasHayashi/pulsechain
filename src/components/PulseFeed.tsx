import {useAppKitAccount} from "@reown/appkit/react";
import {useCallback, useMemo, useState} from "react";
import {useChainId, useReadContracts} from "wagmi";
import {useEffect, useRef} from "react";
import {
    ensRegistryAbi,
    ensRegistryAddress,
    useReadEnsRegistryGetActivePulseCount,
    useReadEnsRegistryGetPulses,
    useWatchEnsRegistryPulseCreatedEvent,
    useWatchEnsRegistryPulseDeletedEvent,
    useWatchEnsRegistryPulseLikedEvent,
    useWatchEnsRegistryPulseUnlikedEvent
} from "../generated.ts";
import {Alert, Box, CircularProgress, Pagination, Stack, Typography} from "@mui/material";
import PulseCard from "./PulseCard.tsx";

function PulseFeed() {
    const {address, isConnected} = useAppKitAccount();
    const [page, setPage] = useState(1);
    const chainId = useChainId();
    const PAGE_SIZE = 5;

    const feedTopRef = useRef<HTMLDivElement>(null);

    const {data: activePulseCount, refetch: refetchCount} = useReadEnsRegistryGetActivePulseCount();
    const totalPages = activePulseCount ? Math.ceil(Number(activePulseCount) / PAGE_SIZE) : 0;

    const {data: pulses, isLoading: isLoadingPulses, refetch: refetchPulses} = useReadEnsRegistryGetPulses({
        args: [BigInt((page - 1) * PAGE_SIZE), BigInt(PAGE_SIZE)],
    });

    useEffect(() => {
        if (!isLoadingPulses) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [page, isLoadingPulses]);

    const {data: likedStatuses} = useReadContracts({
        contracts: pulses?.map(p => ({
            abi: ensRegistryAbi,
            address: ensRegistryAddress[chainId as keyof typeof ensRegistryAddress],
            functionName: 'userHasLiked',
            args: [p.id, address!],
        })),
        query: {enabled: !!pulses && pulses.length > 0},
    });

    const pulsesWithLikeStatus = useMemo(() => {
        if (!pulses || !likedStatuses) return [];
        return pulses.map((p, i) => ({
            ...p,
            isLiked: likedStatuses[i]?.status === 'success' ? (likedStatuses[i].result as unknown as boolean) : false,
        }));
    }, [pulses, likedStatuses]);

    // Specific handlers for each event type
    const handlePulseCreated = useCallback(() => {
        console.log("New pulse created, updating feed...");
        refetchPulses();
        refetchCount();
        // Go back to the first page if not already there
        if (page !== 1) {
            setPage(1);
        }
    }, [refetchPulses, refetchCount, page]);

    const handlePulseLiked = useCallback(() => {
        console.log("Pulse liked, updating feed...");
        refetchPulses(); // Update to get the new number of likes
    }, [refetchPulses]);

    const handlePulseUnliked = useCallback(() => {
        console.log("Pulse unliked, updating feed...");
        refetchPulses(); // Update to get the new number of likes
    }, [refetchPulses]);

    const handlePulseDeleted = useCallback(() => {
        console.log("Pulse deleted, updating feed...");
        refetchPulses();
        refetchCount();
    }, [refetchPulses, refetchCount]);

    // Event watchers with specific handlers
    useWatchEnsRegistryPulseCreatedEvent({
        onLogs: handlePulseCreated,
        poll: false,
    });

    useWatchEnsRegistryPulseLikedEvent({
        onLogs: handlePulseLiked,
        poll: false,
    });

    useWatchEnsRegistryPulseUnlikedEvent({
        onLogs: handlePulseUnliked,
        poll: false,
    });

    useWatchEnsRegistryPulseDeletedEvent({
        onLogs: handlePulseDeleted,
        poll: false,
    });

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        event.preventDefault();
        setPage(value);
    };

    if (isLoadingPulses) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 200
                }}
            >
                <CircularProgress/>
            </Box>
        );
    }

    if (!pulses?.length) {
        return (
            <Alert severity="info">
                No Pulses
                found. {isConnected ? "Be the first to post!" : "Connect your wallet and be the first to post!"}
            </Alert>
        );
    }

    return (
        <Box component="section" ref={feedTopRef}>
            <Typography
                variant="h5"
                component="h2"
                gutterBottom
                sx={{textAlign: 'center'}}
            >
                Timeline
            </Typography>

            <Stack
                spacing={2}
                sx={{
                    maxWidth: "md",
                    mx: 'auto'
                }}
            >
                {pulsesWithLikeStatus.map(pulse => (
                    <PulseCard
                        key={pulse.id}
                        pulse={pulse}
                        isLikedByCurrentUser={pulse.isLiked}
                        isConnected={isConnected}
                    />
                ))}
            </Stack>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 4
                }}
            >
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </Box>
    );
}

export default PulseFeed;

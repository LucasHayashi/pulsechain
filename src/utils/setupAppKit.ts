import {createAppKit} from '@reown/appkit/react';
import {metadata, networks, projectId, wagmiAdapter} from '../config'

const setupAppKit = (themeMode: 'light' | 'dark') =>
    createAppKit({
        adapters: [wagmiAdapter],
        projectId,
        networks,
        metadata,
        themeMode,
        features: {
            socials: false
        }
    });

export default setupAppKit;

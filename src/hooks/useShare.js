import React from 'react';

export default function useShare() {
    const [canShare, setCanShare] = React.useState(false);

    React.useEffect(() => {
        if (!canShare && typeof navigator !== 'undefined' && navigator.share) {
            setCanShare(true);
        }
    }, [canShare]);

    /**
     * @param {{
     *   title: string, 
     *   url: string, 
     *   text: string
     * }} data 
     */
    const share = async (data) => {
        try {
            const shared = await navigator.share(data);
            console.log(shared)
        } catch (error) {
            console.log(error)
        }

    };

    return {
        canShare,
        share
    }
};

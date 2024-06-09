import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchCurrentUser } from 'utils/fetchCurrentUser';

export const useCurrentUser = (interval = 60000) => {
    const dispatch = useDispatch();

    // Memoize the selector using useMemo
    const currentUser = useSelector(
        useMemo(() => state => state.auth.currentUser, [])
    );
    
    const [initialLoading, setInitialLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchCurrentUser(dispatch, setLoading, setInitialLoading); // Initial fetch

        const intervalId = setInterval(() => {
            fetchCurrentUser(dispatch, setLoading, setInitialLoading);
        }, interval);

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [interval, dispatch]);

    return { currentUser, initialLoading };
};
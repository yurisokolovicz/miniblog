import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, orderBy, onSnapshot, where, QuerySnapshot } from 'firebase/firestore';

// We did not use useReducer here because we are not going to handle any reducer events (actions). We are just going to fetch data from the database.
export const useFetchDocuments = (docCollection, search = null, uid = null) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Deal with memory leaks
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        async function loadData() {
            if (cancelled) return;

            setLoading(true);

            const collectionRef = await collection(db, docCollection);

            try {
                let q;

                if (search) {
                    q = await query(collectionRef, where('tagsArray', 'array-contains', search), orderBy('createdAt', 'desc'));
                } else {
                    q = await query(collectionRef, orderBy('createdAt', 'desc'));
                }
                // desc = descending order - newest first

                await onSnapshot(q, QuerySnapshot => {
                    setDocuments(
                        QuerySnapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        }))
                    );
                });

                setLoading(false);
            } catch (error) {
                console.log(error);
                setError(error.message);

                setLoading(false);
            }
        }

        loadData(); // We need to call the function to execute it, it will only be executed if the dependencies change (doCollection, search, uid, cancelled).
    }, [docCollection, search, uid, cancelled]);

    // Deal with memory leaks
    // The return function will be executed when the component is unmounted. It prevents the component from trying to set the state after it has been unmounted.
    useEffect(() => {
        return () => {
            setCancelled(true);
        };
    }, []);

    return { documents, loading, error };
};

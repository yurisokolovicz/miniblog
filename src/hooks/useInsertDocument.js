// Reducer's Custom hook for inserting data in Firestore
import { useState, useEffect, useReducer } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

// Reducer Logic
const initialState = {
    loading: null,
    error: null
};
// insertReducer is a Function that will handle reducer events. It receives the current state and an action as parameters and returns a new state.
const insertReducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return { loading: true, error: null };
        case 'INSERTED_DOC':
            return { loading: false, error: null };
        case 'ERROR':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userInsertDocument = docCollection => {
    const [response, dispatch] = useReducer(insertReducer, initialState);

    // Deal with memory leaks
    const [cancelled, setCancelled] = useState(false);

    const checkCancelBeforeDispatch = action => {
        if (!cancelled) {
            dispatch(action);
        }
    };

    const insertDocument = async document => {
        checkCancelBeforeDispatch({
            type: 'LOADING'
        });

        try {
            const newDocument = { ...document, createdAt: Timestamp.now() };

            const insertDocument = await addDoc(collection(db, docCollection), newDocument);

            checkCancelBeforeDispatch({
                type: 'INSERTED_DOC',
                payload: insertDocument
            });
        } catch (error) {
            checkCancelBeforeDispatch({
                type: 'ERROR',
                payload: error.message
            });
        }
    };

    // To avoid memory leaks
    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { insertDocument, response };
};

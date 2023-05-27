import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyC-LR8ncuSGpOUpfJYFoQPYPlokWWFC4bI',
    authDomain: 'miniblog-42867.firebaseapp.com',
    projectId: 'miniblog-42867',
    storageBucket: 'miniblog-42867.appspot.com',
    messagingSenderId: '595614742914',
    appId: '1:595614742914:web:21307c4801131db04fb79b'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// Exporting database
export { db };

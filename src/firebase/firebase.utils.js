import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDlFnThNew5lZNbnyOq1PpKMSGdSOA-_tI",
    authDomain: "crwn-db-14772.firebaseapp.com",
    projectId: "crwn-db-14772",
    storageBucket: "crwn-db-14772.appspot.com",
    messagingSenderId: "922367340046",
    appId: "1:922367340046:web:bdd42728dc226afc68d65f",
    measurementId: "G-WB1R62BZ9G"
};


firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;









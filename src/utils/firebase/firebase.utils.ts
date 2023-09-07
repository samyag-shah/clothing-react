// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc, //retrieve documents inside of our firestore database
  getDoc, //get data from documents
  setDoc, //set data into documents
  collection, //To get collection referance
  writeBatch, //
  query,
  getDocs,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIw4jgx_5kf2p_4HmwBlFKWbZziclVAas",
  authDomain: "clothing-app-bb91d.firebaseapp.com",
  projectId: "clothing-app-bb91d",
  storageBucket: "clothing-app-bb91d.appspot.com",
  messagingSenderId: "20521049516",
  appId: "1:20521049516:web:568daa9f8473a7d29a6e09",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth();

//auth provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

//db
export const db = getFirestore();
export const createUserDocumentFromAuth = async (
  userAuth: any,
  additionalInformation: { displayName?: string } = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  //if user data doesn't exists in doc set data into userdoc
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    //console.log({ userAuth, displayName, email });
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (err: any) {
      console.error("err creating user", err.message);
    }
  }

  return userDocRef;
};

export const createNewUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

//observer
//persist auth state between page refreshes
//to signout manually call signout
export const onAuthStateChangedListerner = (callback: (data: any) => void) =>
  onAuthStateChanged(auth, callback);

export const addCollectionAndDocuments = async (
  collectionKey: string,
  objectsToAdd: any[]
) => {
  //make collection reference if ex
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object: any) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocument = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  //challnging
  const querySnapshot = await getDocs(q);
  // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
  //   const { title, items } = docSnapshot.data();
  //   const abc = title.toLowerCase() as string
  //   //acc[abc as keyof typeof {}] = items;
  //   return acc;
  // }, {});
  const categoryMap: { [key: string]: any } = {};

  querySnapshot.docs.map((data) => {
    const { title, items } = data.data();
    categoryMap[title] = { title, items };
  });

  return categoryMap;
};

/*
{
  hats: {
    title: 'Hats',
    items: [
      {},
      {}
    ]
  },
  snekars: {
    title: 'Snekars',
    items: [
      {},
      {}
    ]
  }
}
*/

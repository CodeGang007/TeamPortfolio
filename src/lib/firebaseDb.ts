import { getFirestore } from "firebase/firestore";
import { getFirebaseApp } from "./firebase";

export const db = getFirestore(getFirebaseApp());

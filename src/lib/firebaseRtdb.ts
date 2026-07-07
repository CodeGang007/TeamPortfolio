import { getDatabase } from "firebase/database";
import { getFirebaseApp } from "./firebase";

export const database = getDatabase(getFirebaseApp());

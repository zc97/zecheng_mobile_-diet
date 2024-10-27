import { doc, addDoc, collection, setDoc, deleteDoc } from "firebase/firestore";
import { database } from "./firebaseSetup";

export async function writeToDB(data, collectionName) {
  try {
    const docRef = await addDoc(collection(database, collectionName), data);
    return docRef
  } catch (err) {
    console.error("Write to database: ", err);
  }
}


export async function updateItem(itemId, data, collectionName) {
  try {
    const docRef = doc(database, collectionName, itemId);
    await setDoc(docRef, data, { merge: true });
  } catch (err) {
    console.error("Update item: ", err);
  }
}


export async function deleteItem(itemId, collectionName) {
  try {
    const docRef = doc(database, collectionName, itemId);
    await deleteDoc(docRef);
  } catch (err) {
    console.error('Delete item: ', err);
  }
}

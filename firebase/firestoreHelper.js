import { doc, addDoc, collection, getDocs, updateDoc, setDoc } from "firebase/firestore";
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


export async function setItemWarning(itemId, collectionName) {
  try {
    const docRef = doc(database, collectionName, itemId);
    await updateDoc(docRef, {
      warning: true,
    });
  } catch (err) {
    console.error('Update document warning field: ', err);
  }
}


export async function realAllDocs(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(database, collectionName));
    let newArray = []; 
    querySnapshot.forEach((docSnapshot) => {
      newArray.push({ ...docSnapshot.data()});
    });
    return newArray;
  } catch (err) {
    console.error("Read all docs: ", err);
  }
}
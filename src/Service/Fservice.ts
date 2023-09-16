import { getDocs, collection, getDoc, doc } from "firebase/firestore";
import { db } from "./firebaseSetting";

export class Fservice {
  async getData() {
    const querySnapshot = (await getDocs(collection(db, "Users"))).docs
    const dataById = (await getDoc(doc(db, "Users", "6eIAD0ExnP5G3JM35MNZ"))).data();

    console.log(dataById);
    querySnapshot.map((result) => {
      console.log(result.id);
      console.log(result.data());
    })
  }
}
import { collection, getDoc, doc, setDoc, DocumentData } from "firebase/firestore";
import { db } from "./firebaseSetting";

export class Fservice {
  
  //ログイン後ユーザデータ取得する
  async getUserData(userUID: string): Promise<DocumentData | undefined> {
   try{
    const dataById = (await getDoc(doc(db, "Users", userUID))).data();
    return dataById;
   }
   catch(e){
    console.error(e);
    return undefined;
   }
  }

  //アカウント作成時データ入る
  async userRegister(userUID: string,email:string) {
    const data = {
      email: email,
      name: "CA",
      uid: userUID,
    };

    await setDoc(doc(collection(db, "Users"), userUID), data)
  }
}
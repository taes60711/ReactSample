import { collection, getDoc, doc, setDoc, DocumentData, updateDoc } from "firebase/firestore";
import { db } from "./firebaseSetting";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";



export class Fservice {

  //ログイン後ユーザデータ取得する
  async getUserData(userUID: string): Promise<DocumentData | undefined> {
    try {
      const dataById = (await getDoc(doc(db, "Users", userUID))).data();
      return dataById;
    }
    catch (e) {
      console.error(e);
      return undefined;
    }
  }

  //アカウント作成時データ入る
  async userRegister(userUID: string, email: string) {
    const data = {
      email: email,
      name: "CA",
      uid: userUID,
    };

    await setDoc(doc(collection(db, "Users"), userUID), data)
  }

  async updateUserIcon(userUID: string, file: File) {
    const storage = getStorage();
    const storageRef = ref(storage, `${userUID}/${file.name}`);
    await uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("アップロードに成功しました");
        const imgUrl = "gs://react-73a85.appspot.com/" + userUID + "/" + file.name;
        const pathReference = ref(storage, imgUrl);
        getDownloadURL(pathReference)
        .then(async (url)=>{
          console.log(url)
          await updateDoc(doc(collection(db, "Users"), userUID), {photoUrl: url})
        })

        
      })
      .catch((error) => {
        console.log("アップロードに失敗しました");
      });
  }
}
import AppConfig from '../AppConfig';
import { createContext, useEffect, useMemo, useState } from 'react';
import { auth } from '../Service/firebaseSetting';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import ReactLoading from "react-loading";
import "./UserComponent.css";
import { Fservice } from '../Service/FService';


interface IUserInfo {
  uid: string | null,
  name: string | null,
  email: string | null,
}

export const ResourceContext = createContext<{
  FService: Fservice,
  currentUser: IUserInfo,
  setCurrentUser: React.Dispatch<React.SetStateAction<IUserInfo>>
} | null>(null);

export function UserComponent() {
  const [currentUser, setCurrentUser] = useState<IUserInfo>({ uid: null, name: null, email: null });
  const ContextInfo = { FService: new Fservice(), currentUser: currentUser, setCurrentUser: setCurrentUser };
  const [loading, setLoading] = useState(true);


  const createAccount = async () => {
    await createUserWithEmailAndPassword(
      auth,
      "taes60711@gmail.com",
      "toto60711"
    ).then((data) => {
      console.log(data);
    })
  }

  const login = async () => {
    await signInWithEmailAndPassword(
      auth,
      "taes60711@gmail.com",
      "toto60711"
    ).then((data) => {
      console.log(data);
    })
  }

  useEffect(() => {
    console.log("useEffect")
  })


  useMemo(() => {
    console.log("useCallback")
    let user: IUserInfo = { uid: null, name: null, email: null };
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        user = {
          uid: currentUser.uid,
          name: currentUser.displayName,
          email: currentUser.email
        }
        setCurrentUser(user);
      }
      setLoading(false);
      console.log("loading end");
    });
  }, []);


  return (
    <div>
      <ResourceContext.Provider value={ContextInfo}>
        <div className="Container">
          {loading ?
            <ReactLoading type="spin" color="#ebc634" height="100px" width="100px" className="mx-auto" />
            :
            <>
              {currentUser?.uid ?
                <AppConfig /> :
                <>
                  <div>LoginPage</div>
                  <button onClick={login}>login</button>
                  <br></br>
                  <button onClick={createAccount}>createAccount</button>
                </>
              }
            </>
          }
        </div>
      </ResourceContext.Provider>
    </div>
  );
}

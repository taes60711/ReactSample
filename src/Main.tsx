import AppConfig from './AppConfig';
import { createContext, useEffect, useMemo, useState } from 'react';
import { auth } from './Service/firebaseSetting';
import { onAuthStateChanged } from 'firebase/auth';
import ReactLoading from "react-loading";
import { Fservice } from './Service/FService';
import React from 'react';
import UserSystemConfig from './UserSystemConfig';
import "../src/Component/UserSystem/SignIn/SignIn.scss";

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

export function Main() {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<IUserInfo>({ uid: null, name: null, email: null });
  const ContextInfo = { FService: new Fservice(), currentUser: currentUser, setCurrentUser: setCurrentUser };

  useEffect(() => {
    console.log("Main useEffect")
  })

  /**
   * ユーザログイン確認
   */
  useMemo(() => {
    console.log("Main useMemo")
    setLoading(true);
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
        {loading ?
          <div className="Container">
            <ReactLoading type="spin" color="#ccc" height="100px" width="100px" className="mx-auto" />
          </div>
          :
          <>
            {currentUser?.uid ?
              <AppConfig /> :
              <UserSystemConfig setLoading={setLoading} />
            }
          </>
        }
      </ResourceContext.Provider>
    </div>
  );
}
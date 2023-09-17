import AppConfig from './AppConfig';
import { createContext, useEffect, useState } from 'react';
import { auth } from './Service/firebaseSetting';
import { onAuthStateChanged } from 'firebase/auth';
import ReactLoading from "react-loading";
import { Fservice } from './Service/FService';
import React from 'react';
import UserSystemConfig from './UserSystemConfig';
import "../src/Component/UserSystem/SignIn/SignIn.scss";
import { AuthService } from './Service/AuthService';

interface IUserInfo {
  uid: string,
  name: string,
  email: string,
}

interface IResourceContext {
  FService: Fservice,
  AuthService: AuthService,
  currentUser: IUserInfo,
  setCurrentUser: React.Dispatch<React.SetStateAction<IUserInfo>>
}

export const ResourceContext = createContext<IResourceContext>({ FService: new Fservice(), AuthService: new AuthService(), currentUser: { uid: "", name: "", email: "" }, setCurrentUser: () => { } });

export function Main() {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<IUserInfo>({ uid: "", name: "", email: "" });
  const ContextInfo = { FService: new Fservice(), AuthService: new AuthService(), currentUser: currentUser, setCurrentUser: setCurrentUser };


  /**
   * ユーザログイン判定
   */
  useEffect(() => {
    console.log("Main useEffect")
    setLoading(true);
    let user: IUserInfo = { uid: "", name: "", email: "" };
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        //ログインした
        const UserInfo = await ContextInfo.FService.getUserData(currentUser.uid);
        if(UserInfo){
          user = {
            uid: currentUser.uid,
            name: UserInfo.name,
            email: UserInfo.email,
          }
        }
        setCurrentUser(user);
      } else {
        //ログアウト
        user = { uid: "", name: "", email: "" };
        setCurrentUser(user);
      }
      setLoading(false);
      console.log("loading end,", user);
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
            {currentUser.uid ?
              <AppConfig /> :
              <UserSystemConfig setLoading={setLoading} />
            }
          </>
        }
      </ResourceContext.Provider>
    </div>
  );
}

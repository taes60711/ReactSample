import './Home.css';
import { useContext, useState } from 'react';
import MyComponent from './MyComponent/MyComponent';
import { ResourceContext } from '../../UserComponent/UserComponent';
import { signOut } from 'firebase/auth';
import { auth } from '../../Service/firebaseSetting';


function Home() {
  const [s, setS] = useState("string");
  const ContextInfo = useContext(ResourceContext)


  const getData = async () => {
    ContextInfo?.FService.getData();
  }

  const logout = async () => {
    await signOut(auth);
    ContextInfo?.setCurrentUser({ uid: null, name: null, email: null });
  }
  return (
    <div>
      {ContextInfo?.currentUser.email}
      <br></br>
      <br></br>
      <button onClick={logout}>logout</button>
      <br></br>
      <br></br>
      <button onClick={getData}>getData</button>
      <br></br>
      <br></br>
      <MyComponent name={s} setName={setS}></MyComponent>
    </div>
  );
}

export default Home;

import { useContext, useEffect, useState } from 'react';
import MyComponent from './MyComponent/MyComponent';
import { ResourceContext } from '../../../Main';
import { AuthService } from '../../../Service/AuthService';
import { useNavigate } from 'react-router-dom';



function Home() {
  const [s, setS] = useState("string");
  const ContextInfo = useContext(ResourceContext)

  useEffect(() => {
    console.log("Home useEffect")
  })


  const getData = async () => {
    ContextInfo?.FService.getData();
  }

  const logout = async () => {
    new AuthService().signOut();
    ContextInfo?.setCurrentUser({ uid: null, name: null, email: null });
  }

  let navigate = useNavigate();

  const pageClick = ()=>{
      navigate("/RouterApp");
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
      <button onClick={pageClick}>画面遷移</button>
      <br></br>
      <MyComponent name={s} setName={setS}></MyComponent>
      
    </div>
  );
}

export default Home;

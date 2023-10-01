import { memo, useContext, useState } from 'react';
import MyComponent from './MyComponent/MyComponent';
import { ResourceContext } from '../../../Main';
import { useNavigate } from 'react-router-dom';
import './Home.scss';
import { LeftBar } from './LeftBar';
import { RightBar } from './RightBar';




const Main = memo(() => {
  console.log("Main");
  const [s, setS] = useState("string");
  const ContextInfo = useContext(ResourceContext);
  let navigate = useNavigate();

  const getData = async () => {
    console.log(await ContextInfo.FService.getUserData("GB2P9sZQjsY9sxOKxHdYa3nxrtu2"));
  }

  const pageClick = () => {
    navigate("/RouterApp");
  }

  return (
    <div className="MiddleContainer">
      
      <div className="MiddleTopBar"></div>

      <div className="Middle">
        <button onClick={getData}>getData</button>
        <br></br>
        <button onClick={pageClick}>画面遷移</button>
        <div className="redArea"></div>
        <MyComponent name={s} setName={setS}></MyComponent>
      </div>
      
    </div>
  );
})

function Home() {
  console.log("Home starts")

  const [settingBarIsActive, setSettingBarIsActive] = useState<boolean>(false);
  const [isfoucus, setIsfoucus] = useState<boolean>(false);


  const userSettingBarHandle = () => {
    if (settingBarIsActive && !isfoucus) {
      console.log("settingBarIsActive");
      setSettingBarIsActive(!settingBarIsActive);
    }
  };


  return (
    <div className='containers' onClick={userSettingBarHandle}>
      <div className="Body">
        <LeftBar settingBarIsActive={settingBarIsActive} setSettingBarIsActive={setSettingBarIsActive} setIsfoucus={setIsfoucus} />
        <Main />
        <RightBar/>
      </div>
    </div>
  );
}

export default Home;




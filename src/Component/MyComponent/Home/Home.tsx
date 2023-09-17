import { Dispatch, memo, useContext, useState } from 'react';
import MyComponent from './MyComponent/MyComponent';
import { ResourceContext } from '../../../Main';
import { AuthService } from '../../../Service/AuthService';
import { useNavigate } from 'react-router-dom';
import './Home.scss';
import { IconWithText, IconWithTextProps } from '../../Tools/IconWithText';
import ReactIcon from '../../Tools/ReactIcon';

interface ILeftBarPorps {
  settingBarIsActive: boolean;
  setSettingBarIsActive: Dispatch<React.SetStateAction<boolean>>
  setIsfoucus: Dispatch<React.SetStateAction<boolean>>
}

const LeftBar = memo((props: ILeftBarPorps) => {
  const ContextInfo = useContext(ResourceContext);
  console.log("LeftBar")
  //左側メンニューバーの選択項目
  function LeftBarItem() {
    const barItems: IconWithTextProps[] = [
      {
        IconAttr: {
          icon: "AiTwotoneHome",
          module: "fa",
          size: 30,
          color: '#ccc'
        }, Text: "ホーム"
      },
      {
        IconAttr: {
          icon: "FaSearch",
          module: "fa",
          size: 30,
          color: '#ccc'
        }, Text: "検索"
      },
      {
        IconAttr: {
          icon: "FaUserAlt",
          module: "fa",
          size: 30,
          color: '#ccc'
        }, Text: "プロフィール"
      },
      {
        IconAttr: {
          icon: "AiFillSetting",
          module: "ai",
          size: 30,
          color: '#ccc'
        }, Text: "設定"
      }
    ];

    return (
      <div className="LeftBarItem">
        {
          barItems.map((data) => {
            return <div key={data.Text} className="itemButton" onClick={() => { console.log(data.Text) }}>
              <IconWithText IconAttr={data.IconAttr} Text={data.Text} />
            </div>
          })
        }
      </div>
    );
  }

  return (
    <>
      <div className="leftBar">
        <div className="barItem">
          <IconWithText IconAttr={{ icon: "FaKiwiBird", module: "fa", size: 50, color: '#ccc' }} Text={"Nodon"} />
          <LeftBarItem />
          <div className="createButton" onClick={() => { console.log("新規投稿") }}>
            <div>{"新規投稿"}</div>
          </div>
        </div>

        <div className="userBar" onClick={() => {
          props.setSettingBarIsActive(!props.settingBarIsActive);
        }}>
          <ReactIcon icon={'BiUserCircle'} module={'bi'} size={45} />
          <div className="userTextBar">
            <div className="userText">{ContextInfo.currentUser.name ? ContextInfo.currentUser.name :
              ContextInfo.currentUser.email.slice(0, ContextInfo.currentUser.email.indexOf("@"))}
            </div>
            <div className="userEmail">
              {ContextInfo.currentUser.email}
            </div>
          </div>
          <ReactIcon icon={'AiOutlineEllipsis'} module={'Ai'} size={25} />
        </div>
      </div>


      {props.settingBarIsActive ?
        <div className="userSettingBarActive"
          onMouseEnter={() => { props.setIsfoucus(true); }}
          onMouseLeave={() => { props.setIsfoucus(false); }}
        >
          <div className="logout" onClick={() => { console.log("プロフィール設定") }}>
            <IconWithText IconAttr={{
              icon: "TbUserEdit",
              module: "tb",
              size: 30,
              color: '#ccc'
            }} Text={"プロフィール設定"} />
          </div>
          <div className="logout" onClick={() => { console.log("ログアウト") }}>
            <IconWithText IconAttr={{
              icon: "BiLogOut",
              module: "bi",
              size: 30,
              color: '#ccc'
            }} Text={"ログアウト"} />
          </div>
        </div>
        : <div className="userSettingBarUnActive" />
      }
    </>
  );
})


const Main = memo(() => {
  console.log("Main");
  const [s, setS] = useState("string");
  const ContextInfo = useContext(ResourceContext);
  let navigate = useNavigate();

  const getData = async () => {
    console.log(await ContextInfo.FService.getUserData("GB2P9sZQjsY9sxOKxHdYa3nxrtu2"));
  }

  //ログアウト
  const logout = async () => {
    new AuthService().signOut();
  }

  const pageClick = () => {
    navigate("/RouterApp");
  }
  return (
    <div className="MiddleContainer">
      <div className="MiddleTopBar"></div>
      <div className="Middle">
        <button onClick={logout}>logout</button>
        <br></br>
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
        <div className="rightbar" />
      </div>
    </div>
  );
}

export default Home;




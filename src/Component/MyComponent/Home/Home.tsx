import { useContext, useState } from 'react';
import MyComponent from './MyComponent/MyComponent';
import { ResourceContext } from '../../../Main';
import { AuthService } from '../../../Service/AuthService';
import { useNavigate } from 'react-router-dom';
import './Home.scss';
import { IconWithText, IconWithTextProps } from '../../Tools/IconWithText';
import ReactIcon from '../../Tools/ReactIcon';

function Home() {
  console.log("Home starts")
  const [s, setS] = useState("string");
  const ContextInfo = useContext(ResourceContext)
  let navigate = useNavigate();

  console.log("Home useEffect")


  const getData = async () => {
    ContextInfo.FService.getData();
  }

  const logout = async () => {
    new AuthService().signOut();
  }

  const pageClick = () => {
    navigate("/RouterApp");
  }

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
            return <div key={data.Text} className="itemButton"> 
              <IconWithText IconAttr={data.IconAttr} Text={data.Text} />
            </div>
          })
        }
      </div>
    );
  }

  return (
    <div className='containers'>
      <div className="Body">

        <div className="leftBar">
          <div className="barItem">
            <IconWithText IconAttr={{ icon: "FaKiwiBird", module: "fa", size: 50, color: '#ccc' }} Text={"Nodon"} />
            <LeftBarItem />
            <div className="createButton">
              <div>{"新規投稿"}</div>
            </div>
          </div>

          <div className="userBar">
            <ReactIcon icon={'BiUserCircle'} module={'bi'} size={45} />
            <div className="userTextBar">
              <div className="userText">{ContextInfo.currentUser.name ? ContextInfo.currentUser.name :
                ContextInfo.currentUser.email.slice(0, ContextInfo.currentUser.email.indexOf("@"))}
              </div>
              <div className="userEmail">
                {ContextInfo.currentUser.email}
              </div>
            </div>
          </div>
        </div>

        <div className="MiddleContainer">
          <div className="MiddleTopBar"></div>
          <div className="Middle">
            <button onClick={logout}>logout</button>
            <br></br>
            <br></br>
            <button onClick={getData}>getData</button>
            <br></br>
            <br></br>
            <button onClick={pageClick}>画面遷移</button>
            <div className="redArea"></div>
            <MyComponent name={s} setName={setS}></MyComponent>
          </div>
        </div>
        <div className="rightbar" />
      </div>
    </div>
  );
}

export default Home;

import { useContext, useEffect, useMemo, useState } from 'react';
import MyComponent from './MyComponent/MyComponent';
import { ResourceContext } from '../../../Main';
import { AuthService } from '../../../Service/AuthService';
import { useNavigate } from 'react-router-dom';
import './Home.scss';
import { IconWithText, IconWithTextProps } from '../../Tools/IconWithText';





function Home() {
  console.log("Home starts")
  const [s, setS] = useState("string");
  const ContextInfo = useContext(ResourceContext)
  let navigate = useNavigate();

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

  const pageClick = () => {
    navigate("/RouterApp");
  }

  const leftBarItem = useMemo(() => {
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
            return <IconWithText key={data.Text} IconAttr={data.IconAttr} Text={data.Text} />
          })
        }
      </div>
    );
  }, []);

  return (
    <div className='Containers'>
      <div className="Body">
        <div className="leftBar">
          <IconWithText IconAttr={{ icon: "FaKiwiBird", module: "fa", size: 50, color:'#ccc'}} Text={"Nodon"} />
          {leftBarItem}
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

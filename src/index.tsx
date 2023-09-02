import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import AppConfig from './AppConfig';
import { UserComponent } from './UserComponent/UserComponent';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <UserComponent />
);

reportWebVitals();

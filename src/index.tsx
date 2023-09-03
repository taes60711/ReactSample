import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { UserComponent } from './UserComponent';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <UserComponent />
);

reportWebVitals();

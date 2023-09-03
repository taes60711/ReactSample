import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Main } from './Main';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Main />
);

reportWebVitals();

import './App.css';
import Dashboard from "./components/Dashboard";
import {BrowserRouter as Router} from "react-router-dom";
import NoInternet from './components/no-internet/NoInternet';

function App() {
  return (
    <div className="App">
        <Router>
          {!navigator.onLine && <NoInternet />}
         { navigator.onLine && <Dashboard />}

        </Router>
    </div>
  );
}

export default App;

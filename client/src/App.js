import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Landing } from "./components/landing/landing";
import { Home } from "./components/home/home";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path ="/">
          <Landing/>
        </Route>,
        <Route path ="/home">
          <Home/>
        </Route>
        <Route>

        </Route>
      </Switch>
    </div>
  );
}

export default App;

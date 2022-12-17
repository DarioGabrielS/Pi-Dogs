import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Landing } from "./components/landing/landing";
import { Home } from "./components/home/home";
import { Form } from "./components/form/form";

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
        <Route path ="/create">
          <Form />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

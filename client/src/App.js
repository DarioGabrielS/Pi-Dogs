import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Landing } from "./components/landing/landing";
import { Home } from "./components/home/home";
import { Form } from "./components/form/form";
import { Paginado } from "./components/paginado/paginado";

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
        <Route path ="/paginado">
          <Paginado />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

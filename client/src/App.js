import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Landing } from "./components/landing/landing";
import { Home } from "./components/home/home";
import { Form } from "./components/form/form";
import { Paginado } from "./components/paginado/paginado";
import { NavBar } from "./components/NavBar/navBar";
import { Details } from "./components/details/details";

function App() {
  return (
    <div className="App">
      <NavBar />
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
        <Route path ="/breeds/:id">
          <Details />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

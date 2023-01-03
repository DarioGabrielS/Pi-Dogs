import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Landing } from "./components/landing/landing";
import { Home } from "./components/home/home";
import { Form } from "./components/form/form";
import { Paginado } from "./components/paginado/paginado";
import { NavBar } from "./components/NavBar/navBar";
import { Details } from "./components/details/details";
import {NotFound} from "./components/notFound/notFound"

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path ="/">
          <Landing/>
        </Route>,
        <Route path ="/home">
          <NavBar />
          <Home/>
        </Route>
        <Route path ="/create">
          <NavBar />
          <Form />
        </Route>
        <Route path ="/paginado">
          <Paginado />
        </Route>
        <Route path ="/breeds/:id">
          <NavBar />
          <Details />
        </Route>
        <Route path="*">
            <NotFound />
          </Route>
      </Switch>
    </div>
  );
}

export default App;

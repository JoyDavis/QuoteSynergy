import Navbar from "./Navbar";
import Home from "./Home";
import Openai from "./Openai";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom/cjs/react-router-dom.min";
import Create from "./Create";
import NotFound from "./NotFound";
import QuotesPage from './QuotesPage';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <div className="content">
        <Switch>
          <Route exact path = "/">
            <Home />
          </Route>
          <Route path = "/create">
            <Create />
          </Route>
          <Route path="/quotes">
            <QuotesPage />
          </Route>
          <Route path = "/openai">
            <Openai/>
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
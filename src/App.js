import Home from './pages/Home';
import About from './pages/About'
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

function App() {
  return (
       <div>
      <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Redirect to="/" />
        </Switch>
       </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

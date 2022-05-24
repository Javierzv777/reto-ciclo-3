import './App.css';
import Home from './componentes/home'
import Games from './componentes/games'
import Navbar from './componentes/navbar'
import {Switch,Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <h1>Henry Videogames</h1>
      <Navbar/>
          <Switch>
              <Route path='/home'>
                <Home></Home>
              </Route>
              <Route path='/videogame'>
                <Games/>
              </Route>
              <Route path='/genre'>

              </Route>
          </Switch>
      
    </div>
  );
}

export default App;

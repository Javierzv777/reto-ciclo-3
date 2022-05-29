import './App.css';
import Home from './componentes/home'
import Navbar from './componentes/navbar'
import {Switch,Route} from 'react-router-dom'
import ShowGame from './componentes/showGame';
import ShowGames from './componentes/showGames';
import NavbarGames from './componentes/navbarGames';
import Platforms from './componentes/platforms';
import Genres from './componentes/genres';
import Landing from './componentes/landing';
import Flag from './componentes/flag'
import logo from './videogame.png'

function App() {
  return (
    <div className="App">
      <Landing/>
      <h1>Henry Videogames</h1>
      <Navbar/>
      <Flag/>
          <Switch>
              <Route path='/home'>
                <Home></Home>
              </Route>
              <Route  path='/videogame/'>
                <NavbarGames/>
              </Route>
              <Route exact path='/videogame/detail'>
                <ShowGame/>
              </Route>
              <Route path='/videogames'>
                <ShowGames/>
              </Route>
              <Route path='/genres'>
                <Genres/>
              </Route>
              <Route path='/platforms'>
                <Platforms/>
              </Route>

          </Switch>
      
    </div>
  );
}

export default App;

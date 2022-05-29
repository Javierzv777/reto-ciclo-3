import './App.css';
import Home from './componentes/home'
import MyGames from './componentes/myGames'
import Navbar from './componentes/navbar'
import {Switch,Route} from 'react-router-dom'
import ShowGame from './componentes/showGame';
import ShowGames from './componentes/showGames';
import Update from './componentes/update';
import CreateGame from './componentes/createGame'
import NavbarGames from './componentes/navbarGames';
import Platforms from './componentes/platforms';
import Genres from './componentes/genres';


function App() {
  return (
    <div className="App">
      <h1>Henry Videogames</h1>
      <Navbar/>
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
              <Route exact path='/videogame/create'>
                <CreateGame/>
              </Route>
              <Route exact path='/videogame/update'>
                <Update/>
              </Route>
              <Route path='/videogames'>
                <ShowGames/>
              </Route>
              <Route exact path='/videogame/myGames'>
                <MyGames/>
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

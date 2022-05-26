import './App.css';
import Home from './componentes/home'
import MyGames from './componentes/myGames'
import Navbar from './componentes/navbar'
import {Switch,Route} from 'react-router-dom'
import ShowGame from './componentes/showGame';
import ShowGames from './componentes/showGames';


function App() {
  return (
    <div className="App">
      <h1>Henry Videogames</h1>
      <Navbar/>
          <Switch>
              <Route path='/home'>
                <Home></Home>
              </Route>
              <Route exact path='/videogame/detail'>
                <ShowGame/>
              </Route>
              <Route path='/videogames'>
                <ShowGames/>
              </Route>
              <Route exact path='/videogame'>
                <MyGames/>
              </Route>
              <Route path='/genres'>
              </Route>
              

          </Switch>
      
    </div>
  );
}

export default App;


import navGamesStyle from './navbarGames.module.css';
import { NavLink,Route } from 'react-router-dom'
import MyGames from './myGames';
import Update from './update';
import CreateGame from './createGame';


function NavbarGames(props){
    return (
            <div className={navGamesStyle.container}>
                <div className={navGamesStyle.containerNav}>
                    {/* <NavLink to='/videogame/myGames' 
                    activeStyle={{
                        fontWeight: "bold",
                        color: "red",
                        fontSize:"x-large"
                    }}>
                        <span className={navGamesStyle.link}>
                            Mis juegos
                        </span>
                    </NavLink> */}
                    <NavLink 
                    to='/videogame/create' 
                    activeStyle={{
                        fontWeight: "bold",
                        color: "red",
                        fontSize:"x-large"
                    }}>
                        <span className={navGamesStyle.link}>
                            Add Game
                        </span>
                    </NavLink>
                    <NavLink
                        to="/videogame/myGames"
                        className={isActive =>
                            "nav-link" + (!isActive ? " unselected" : "")
                        }
                        activeStyle={{
                            fontWeight: "bold",
                            color: "red"
                        }}
                        >
                    </NavLink>
                </div>    
                <Route exact path='/videogame/myGames'>
                    <MyGames/>
                </Route>
                
                <Route exact path='/videogame/create'>
                    <CreateGame/>
                </Route>
                <Route exact path='/videogame/update'>
                    <Update/>
                </Route>
            </div>
            )
    
}

export default NavbarGames
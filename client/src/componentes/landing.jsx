
import LandingStyle from './landing.module.css';
import logo from './../videogame.png'
import {useState} from 'react'

function Landing(props){
    const [display, setDisplay]=useState({flag:true})
    const toggle=()=>{
        setDisplay({flag:true?false:true})
    }
    return (
        <div>
            {display.flag&&(
              <div className={LandingStyle.container}>
              <div className={LandingStyle.logo}>
                  <img src={logo} class='App-logo' alt='logo'> 
                  </img>
                  <div className={LandingStyle.lista}>
                      <ul>
                          <li>Encuentra más de 500.000 juegos</li>
                          <li>Elabora tu propio catálogo de juegos</li>
                          <li>Crea tus propios juegos</li>
                      </ul>
                  </div>
                  <span onClick={()=>toggle()}
                      className={LandingStyle.button}
                  >comenzar
                  </span>
              </div>   
          </div>  
            )}
        </div>
            
            )
    
}

export default Landing
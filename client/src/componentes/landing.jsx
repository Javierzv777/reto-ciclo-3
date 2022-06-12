
import LandingStyle from './landing.module.css';
import logo from './../videogame.png'
import {useState} from 'react'
import {getGames, startLoading, setShowGames} from '../actions/actions'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'

function Landing(props){
    let history = useHistory()
    const dispatch = useDispatch()
    const [display, setDisplay] = useState({flag:true})
    const toggle = () => {
        let payload={
            data:''
        }
        dispatch(getGames(payload))
        dispatch(startLoading())
        dispatch(setShowGames([]))
        history.push("/videogames")
        setDisplay({flag:true?false:true})
    }
    return (
        <div>
            {display.flag&&(
              <div className={LandingStyle.container}>
              <div className={LandingStyle.logo}>
                  <img src={logo} className={'App-logo'} alt='logo'> 
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
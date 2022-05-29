
import LandingStyle from './landing.module.css';
import logo from './../videogame.png'

function Landing(props){
    return (
            <div className={LandingStyle.container}>
                <div className={LandingStyle.logo}>
                    <img src={logo} class='App-logo' alt='logo'> 
                    </img>
                    <div className={LandingStyle.lista}>
                        <ul>
                            <ol>Encuentra más de 500.000 juegos</ol>
                            <ol>Elabora tu propio catálogo de juegos</ol>
                            <ol>Crea tus propios juegos</ol>
                        </ul>
                    </div>
                    <span className={LandingStyle.button}
                    >comenzar</span>
                </div>   
            </div>
            )
    
}

export default Landing
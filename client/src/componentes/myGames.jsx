import myGamesStyle from './myGames.module.css';
import {connect} from 'react-redux'
import {getGame, deleteGame, saveGame} from '../actions/actions'
import { useHistory} from 'react-router-dom'
// import SearchBar from './searchBar';
// import { Dispatch } from 'react';

function MyGames(props) {

 const history=useHistory()

  const handleOnClick=(id)=>{
    props.getGame(id)
    history.push("/videogame/detail")
  }
  const handleDelete=(id,name)=>{
    props.deleteGame(id)
  }
  const handleSave=(id,i)=>{
    props.saveGame(id,i)
  }
    return (

        
        <div className={myGamesStyle.games}>
            {props.games[0]&&(<div className={myGamesStyle.title}>Lista de Videojuegos</div>)}
            <div className={myGamesStyle.container}>
            {props.games.map((e,i)=>{
                return(e.id.length) &&(
                    <div key={i}>
                      <div className={myGamesStyle.card} 
                        onClick={()=>handleOnClick(e.id)}>
                        <div className={myGamesStyle.subtitle}>
                          <span>{e.name}</span>
                        </div>
                        <img className={myGamesStyle.image} src={e.image} alt={e.name}>
                        </img>
                        <span>{e.description}</span>
                      </div>
                      <div>
                        {e.id&&e.id.length&&(<button onClick={()=> handleDelete(e.id,e.name)}>
                          Eliminar
                        </button>)}
                        {e.id&&!e.id.length&&(<button onClick={()=> handleSave(e.id,i)}>
                          Guardar
                        </button>)}
                      </div>
                      
                    </div>
                )
            })}
            </div>
        </div>      
    )

}

export function mapStateToProps(state) {
    return {
      games: state.games,
      game: state.game,
      saved: state.savedGames
    };
  }
  
  export function mapDispatchToProps(dispatch) {
    return {
      deleteGame:(id)=>dispatch(deleteGame(id)),
      getGame: (m) =>dispatch(getGame(m)),
      saveGame: (id)=>dispatch(saveGame(id))
    };
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(MyGames)
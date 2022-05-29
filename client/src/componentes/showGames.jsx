import GamesStyle from './showGames.module.css';
import {connect} from 'react-redux'
import {getGame,saveGame,deleteGame, clearList} from '../actions/actions'
import { useHistory} from 'react-router-dom'




function ShowGames(props) {


  let history=useHistory()

  const handleOnClick=(id)=>{
    props.getGame(id)
    history.push("/videogame/detail")
  }
  const handleDelete=(id,name)=>{
    props.deleteGame(id)
  }
  const handleSave=(id)=>{
    props.saveGame(id)
  }

   
    return (
        <div className={GamesStyle.games}>
            {props.games[0]&&(<div className={GamesStyle.title}>Lista de Videojuegos</div>)}
            <div className={GamesStyle.container}>
            {props.games.map((e,i)=>{
                return(!props.saved.includes(e.name)) &&(
                    <div key={i}>
                      <div className={GamesStyle.card} 
                        >
                        <div className={GamesStyle.subtitle}>
                          <span>{e.name}</span>
                        </div>
                        <img onClick={()=>handleOnClick(e.id)}
                        className={GamesStyle.image} src={e.image} alt={e.name}>
                        </img>
                       
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
      saveGame: (id)=>dispatch(saveGame(id)),
      clearList: ()=>dispatch(clearList())
    };
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(ShowGames)
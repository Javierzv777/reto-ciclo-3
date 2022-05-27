import myGamesStyle from './myGames.module.css';
import {connect} from 'react-redux'
import {getGame, deleteGame, saveGame,getGames} from '../actions/actions'
import { useHistory} from 'react-router-dom'
import SearchBar from './searchBar';



function MyGames(props) {

 const history=useHistory()

  const handleOnClick=(id)=>{
    props.getGame(id)
    history.push("/videogame/detail")
  }
  const handleDelete=(id,name)=>{
    props.deleteGame(id)
  }
  const handleUpdate=(id)=>{

    history.push("/videogame/Update")
  }
  const handleSubmit=function(gameName){
    props.getGames(gameName)
   
  }
    return (

        <div className={myGamesStyle.container}>
          <span className={myGamesStyle.searchBar}>
            <SearchBar
                handleSubmit={handleSubmit}
                searchButton={'Buscar'} 
                placeHolder={'...Buscar Juegos en db'}
            />
         </span>


          <div className={myGamesStyle.games}>
              {props.saved.length>0&&(<div className={myGamesStyle.title}>Lista de Videojuegos</div>)}
              <div className={myGamesStyle.containerCards}>
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
                          {e.id&&e.id.length&&(
                          <div>
                            <button onClick={()=> handleDelete(e.id,e.name)}>
                              Eliminar
                            </button>
                            <button onClick={()=> handleUpdate(e.id,e.name)}>
                              Editar
                            </button>

                          </div>
                          )}
                          
                        </div>
                        
                      </div>
                  )
              })}
              </div>
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
      getGames: (id)=>dispatch(getGames(id))
    };
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(MyGames)
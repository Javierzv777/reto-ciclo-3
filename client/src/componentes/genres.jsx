import GenresStyle from './genres.module.css';
import {connect} from 'react-redux'
// import {getGame,saveGame,deleteGame, clearList} from '../actions/actions'
// import {getGenres} from '../actions/actions'
import {} from '../actions/actions'
import {Link} from 'react-router-dom'
import {getGenres} from '../actions/actions'





function Genres(props) {




//   const handleOnClick=(id)=>{
//     props.getGame(id)
//     history.push("/videogame/detail")
//   }
//   const handleDelete=(id,name)=>{
//     props.deleteGame(id)
//   }
//   const handleSave=(id)=>{
//     props.saveGame(id)
//   }

   
    return (
        <div className={GenresStyle.container}>
            {props.genres&&<div>Buscar Juegos por género</div>}
            
           {
             props.genres&&props.genres.map((e)=>{
                 

                 
                 return(
                    <div key={e.id}>
                        <Link onClick={()=>props.getGenres(e.id,e.name)} 
                        to='/videogame/myGames'  >
                            {e.name}
                        </Link>
                    </div>
                   
                 )
             })
           }
           
        </div>
    )

}

export function mapStateToProps(state) {
    return {
      genres: state.genres,
    };
  }
  
  export function mapDispatchToProps(dispatch) {
    return {
        getGenres:(id,name)=>dispatch(getGenres(id,name))
      
    };
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Genres)
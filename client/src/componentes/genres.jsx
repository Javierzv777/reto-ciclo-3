import GenresStyle from './genres.module.css';
import {connect} from 'react-redux'
// import {getGame,saveGame,deleteGame, clearList} from '../actions/actions'
// import {getGenres} from '../actions/actions'
import {} from '../actions/actions'
import {Link} from 'react-router-dom'
import {getGenres} from '../actions/actions'






function Genres(props) {





   
    return (
        <div >
            {props.genres&&<div className={GenresStyle.container}>Search saved games by genres</div>}
            
           {
             props.genres&&props.genres.map((e)=>{
                 

                 
                 return(
                    <div key={e.id}>
                        <Link style={{fontSize:'20px'}}
                         onClick={()=>props.getGenres(e.id,e.name)} 
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
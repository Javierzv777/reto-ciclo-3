import GamesStyle from './showGames.module.css';
import {connect} from 'react-redux'
import {getMovie} from '../actions/actions'
import {useHistory} from 'react-router-dom'



function ShowGames(props) {

const history=useHistory()

  const handleOnClick=(id)=>{
    props.getMovie(id)
    history.push("/videogame/detail")
  }
   
    return (
        <div className={GamesStyle.games}>
            {props.movies[0]&&(<div className={GamesStyle.title}>Lista de Videojuegos</div>)}
            <div className={GamesStyle.container}>
            {props.movies.map(e=>{
                return(
                    <div className={GamesStyle.card} key={e.id}
                      onClick={()=>handleOnClick(e.id)}>
                       <div className={GamesStyle.subtitle}>
                        <span>{e.name}</span>
                       </div>
                       <img className={GamesStyle.image} src={e.image} alt={e.name}>
                       </img>
                       <span>{e.description}</span>
                    </div>
                )
            })}
            </div>
        </div>
    )

}

export function mapStateToProps(state) {
    return {
      movies: state.movies,
    };
  }
  
  export function mapDispatchToProps(dispatch) {
    return {
      getMovie: (m) =>dispatch(getMovie(m))
     
    };
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(ShowGames)
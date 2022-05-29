import PlatformsStyle from './platforms.module.css';
import {connect} from 'react-redux'
import { getPlatforms } from '../actions/actions';
import {} from '../actions/actions'
import {Link} from 'react-router-dom'





function Platforms(props) {




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
        <div className={PlatformsStyle.container}>
            {props.platforms&&<div>Buscar juegos por plataformas</div>}
            
           {
             props.platforms&&props.platforms.map((e)=>{
                 

                 
                 return(
                    <div key={e.id}>
                        <Link onClick={()=>props.getPlatforms(e.id,e.name)}
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
      platforms: state.platforms,
    };
  }
  
  export function mapDispatchToProps(dispatch) {
    return {
      getPlatforms:(id,name)=>dispatch(getPlatforms(id,name)),
    //   getGame: (m) =>dispatch(getGame(m)),
    //   saveGame: (id)=>dispatch(saveGame(id)),
      
    };
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Platforms)
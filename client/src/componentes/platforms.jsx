import PlatformsStyle from './platforms.module.css';
import {connect} from 'react-redux'
import { getPlatforms } from '../actions/actions';
import {} from '../actions/actions'
import {Link} from 'react-router-dom'





function Platforms(props) {





   
    return (
        <div >
            {props.platforms&&<div className={PlatformsStyle.container}>Search saved games by platforms</div>}
            
           {
             props.platforms&&props.platforms.map((e)=>{    
                 return(
                    <div key={e.id}>
                        <Link style={{fontSize:'20px'}}
                        onClick={()=>props.getPlatforms(e.id,e.name)}
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
import gameStyle from './showGame.module.css';
import {connect} from 'react-redux'
import React from 'react'
import { setGame } from '../actions/actions';

class ShowGame extends React.Component {
    constructor(props){
        super(props)
        this.state = { counter: 0 };

        
    }
   componentWillUnmount(){
       this.props.setGame(undefined)
   }
   

    render(){
            return (
            <div className={gameStyle.game}>
                
  
                <div> 
                    { this.props.game&&this.props.game.image&& <div>
                        <div className={gameStyle.title}>{this.props.game.name}
                        </div>
                        <span className={gameStyle.card}>
                            <img src={this.props.game&&this.props.game.image} 
                                    className={gameStyle.image}
                                    alt='imagen'>
                            </img>
                            <span>
                                <span className={gameStyle.rating}>
                                    Released: {this.props.game.released}
                                </span>
                                <div>
                                    Rating: {this.props.game.rating}
                                </div>
                            </span>
                        </span>
                        <span className={gameStyle.description}>
                            <span dangerouslySetInnerHTML={{__html: this.props.game.description}}> 
                            </span>
                            <div>
                                <span className={gameStyle.platforms}>
                                    <h5>Plataforms</h5>
                                    <ul>
                                        {this.props.game.platforms.map((e,i)=>{
                                            return(
                                                
                                                    <li key={i}>{e.name}</li>
                                            )
                                        })}
                                    </ul>
                                </span>
                                <span className={gameStyle.genres}>
                                    <h5>Genres</h5>
                                        <ul>                                            
                                            {this.props.game.genres.map((e,i)=>{
                                                return(
                                                    
                                                        <li key={i}>{e.name}</li>
                                                )
                                            })}
                                        </ul>
                                </span>
                            </div>
                        </span>
                        <button className={gameStyle.buttonBack} onClick={()=>this.props.history.goBack()}>
                            Back
                        </button>
                    </div>
                   
                    }
                    
                    
                </div>
                    
                
            </div>
        )

    }
}

export function mapStateToProps(state) {
    return {
      game: state.game,
    };
  }
  
  export function mapDispatchToProps(dispatch) {
    return {
        setGame:()=>dispatch(setGame())
    };
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(ShowGame)
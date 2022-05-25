import gameStyle from './showGame.module.css';
import {connect} from 'react-redux'
import React from 'react'
import { getMovie } from '../actions/actions';

class ShowGame extends React.Component {
    constructor(props){
        super(props)
        this.state = { counter: 0 };
        
     
    }
   componentWillUnmount(){
       this.props.getMovie(undefined)
   }
    // this.setState((state, props) => {
    //     return {counter: state.counter + props.step};
    //   });
    render(){
            return (
            <div className={gameStyle.game}>
                
                <div>{this.props.movie&&this.props.movie.name}</div>
                   <div> 
                
               { this.props.movie&&this.props.movie.image&& <img src={this.props.movie&&this.props.movie.image} 
                    className={gameStyle.image}
                    alt='imagen'></img>}
                
                
                   </div>
                    
                
            </div>
        )

    }
}

export function mapStateToProps(state) {
    return {
      movie: state.movie,
    };
  }
  
  export function mapDispatchToProps(dispatch) {
    return {
        getMovie:(m)=>dispatch(getMovie(m))
    };
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(ShowGame)
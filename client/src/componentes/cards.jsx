import React from 'React'
import cardsStyle from './cards.module.css';

class Cards extends React.Components {
constructor(props){
    super(props)
    this.state={}
    this.setState
}

Change(){
    this.setState((state, props) => {
        return {counter: state.counter + props.step};
      });
}

render(){
    return (
        <div></div>
    )
}

}
export default Cards
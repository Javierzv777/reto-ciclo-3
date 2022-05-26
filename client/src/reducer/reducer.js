
import {CREATE_GAME, UPDATE_GAME, GET_GAMES, GET_GAME, ADD_GAME, REMOVE_GAME} from './../actions/actions'

const initialState={
    games:[],
    platforms:[],
    game:undefined,
    genres:[],
    savedGames:[]
}

export  const reducer=(state=initialState, action)=>{
// console.log(action.payload)
    switch(action.type){
        case CREATE_GAME: return {...state, games:[...state.games,...action.payload]}
        case UPDATE_GAME: let games=state.games.filter(e => {return e.id!==action.payload.id});
        return {...state, games:[...games,action.payload]}
        case GET_GAMES: return {...state, games:[...action.payload]};
        case GET_GAME: return {...state, game:{...action.payload}};
        case ADD_GAME: return {...state, games:[action.payload,...state.games],savedGames:[...state.savedGames,action.payload.name]}
        case REMOVE_GAME: const foundGame= state.games.find(e=>e.id===action.payload) 
        return {...state, games: state.games.filter(e=>e.id!==action.payload), savedGames:state.savedGames.filter(e=>e!==foundGame.name) }
        default: return state;
    }

}
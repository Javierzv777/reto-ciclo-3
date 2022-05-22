import {CREATE_MOVIE, UPDATE_MOVIE, GET_MOVIES} from './../actions/actions'

const initialState={
    movies:[],
    platforms:[],
    movie:'',
    genres:{}
}

export  const reducer=(state=initialState, action)=>{

    switch(action){
        case CREATE_MOVIE: return {...state, movies:[...state.movies,...action.payload]}
        case UPDATE_MOVIE: let movies=state.movies.filter(e => {return e.id!==action.payload.id});
        return {...state, movies:[...movies,action.payload]}
        case GET_MOVIES: return {...state, movie:action.payload}
        default: return state;
    }

}
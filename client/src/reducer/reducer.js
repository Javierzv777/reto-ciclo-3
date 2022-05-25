import {CREATE_MOVIE, UPDATE_MOVIE, GET_MOVIES, GET_MOVIE} from './../actions/actions'

const initialState={
    movies:[],
    platforms:[],
    movie:undefined,
    genres:[]
}

export  const reducer=(state=initialState, action)=>{
// console.log(action.payload)
    switch(action.type){
        case CREATE_MOVIE: return {...state, movies:[...state.movies,...action.payload]}
        case UPDATE_MOVIE: let movies=state.movies.filter(e => {return e.id!==action.payload.id});
        return {...state, movies:[...movies,action.payload]}
        case GET_MOVIES: return {...state, movies:[...action.payload]};
        case GET_MOVIE: return {...state, movie:{...action.payload}};
        default: return state;
    }

}
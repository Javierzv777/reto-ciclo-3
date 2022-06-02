
import {SET_GAME,SEARCH_BY_GENRE,SEARCH_BY_PLATFORM,CREATE_GAME, UPDATE_GAME, GET_GAMES, GET_GAME, ADD_GAME, REMOVE_GAME, UPDATE_DETAILS,GET_CACHE_GAME, CLEAR_LIST, GET_PLATFORMS, GET_GENRES, START_LOADING, UPDATE_RATING} from './../actions/actions'

const initialState={
    games:[],
    platforms:[],
    cacheGame:undefined,
    game:undefined,
    genres:[],
    savedGames:[],
    flag:true,
    platform:undefined,
    genre:undefined,
    loadingFlag:false
}

function compare_lname( a, b )
  {
  if ( a.name.toLowerCase() < b.name.toLowerCase()){
    return -1;
  }
  if ( a.name.toLowerCase() > b.name.toLowerCase()){
    return 1;
  }
  return 0;
}
export  const reducer=(state=initialState, action)=>{
// console.log(action.payload)
    switch(action.type){
        case UPDATE_RATING:let ratings= action.payload.rating.reduce((a,i)=>a+i.score,0)/action.payload.rating.length
        ratings=isNaN(ratings)?0:ratings
        ratings=ratings.toFixed(2)
        // let foundGameToRate=state.games.find(g=>g.id===action.payload.id)
        state.games.forEach(g=>{
          if(g.id===action.payload.id){
            g.rating=ratings
          }
        })
        return {...state,games:[...state.games]}
        case START_LOADING:return {...state, loadingFlag:true}
        case GET_PLATFORMS: return {...state, platforms:[...action.payload]}
        case GET_GENRES: return {...state, genres:[...action.payload]}
        case CLEAR_LIST: return {...state, games:[]}
        case CREATE_GAME: return {...state, games:[...state.games,...action.payload]}
        case UPDATE_GAME: let games=state.games.filter((e) => e.id!==action.payload.id);
        return {...state, games:[...games,action.payload]}
        case SEARCH_BY_PLATFORM: return {...state, games:[...action.payload.data], flag:action.payload.data.length?false:true,platform:action.payload.name,genre:undefined }
        case SEARCH_BY_GENRE: return {...state, games:[...action.payload.data], flag:action.payload.data.length?false:true,genre:action.payload.name,platform:undefined }
        case GET_GAMES: 
        action.payload.query.sort(compare_lname) 
        return {...state, games:[...action.payload.query],savedGames:[...action.payload.list],flag:false,genre:undefined,platform:undefined, loadingFlag:false};
        case GET_GAME: let rating= action.payload.rating.reduce((a,i)=>a+i.score,0)/action.payload.rating.length
          rating=isNaN(rating)?0:rating
          return {...state, game:{...action.payload,rating},cacheGame:{...action.payload,rating}};
        case SET_GAME: return {...state, game:undefined}
        case ADD_GAME: return {...state, games:[action.payload,...state.games],savedGames:[...state.savedGames,action.payload.name]}
        case REMOVE_GAME: const foundGame= state.games.find(e=>e.id===action.payload) 
        return {...state, games: state.games.filter(e=>e.id!==action.payload), savedGames:state.savedGames.filter(e=>e!==foundGame.name) }
        case UPDATE_DETAILS: return {...state, game: {...action.payload}}
        case GET_CACHE_GAME: return {...state,game:{...state.cacheGame}}
        default: return state;
    }

}
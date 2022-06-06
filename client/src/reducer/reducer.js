
import {SET_PAGES,SET_GAMES,SET_GAME,SEARCH_BY_GENRE,SEARCH_BY_PLATFORM,CREATE_GAME, UPDATE_GAME, GET_GAMES, GET_GAME, ADD_GAME, REMOVE_GAME, UPDATE_DETAILS,GET_CACHE_GAME, CLEAR_LIST, GET_PLATFORMS, GET_GENRES, START_LOADING, UPDATE_RATING, SORT_BY_NAME, SORT_BY_RATING, REVERSE, SET_SHOW_GAMES} from './../actions/actions'
import { platformsList } from '../componentes/platformsList';
import {genresList} from '../componentes/genresList'

const initialState={
    games:[],
    platforms:platformsList,
    cacheGame:undefined,
    game:undefined,
    genres:genresList,
    savedGames:[],
    flag:true,
    platform:undefined,
    genre:undefined,
    loadingFlag:false,
    pages:'1',
    showGames:[]
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

    switch(action.type){
        case SET_SHOW_GAMES: return {...state, showGames:[...action.payload]}
        case SET_PAGES: return {...state,pages:action.payload }
        case REVERSE: return {...state, games:[...state.games.reverse()]}
        case SORT_BY_NAME: state.games.sort(compare_lname) 
          return {...state,games:[...state.games]}
        case SORT_BY_RATING: state.games.sort((e,i)=>e.rating-i.rating).reverse()
          return {...state, games:[...state.games]}
        case UPDATE_RATING:let ratings= action.payload.rating.reduce((a,i)=>a+i.score,0)/action.payload.rating.length
          ratings=isNaN(ratings)?0:ratings
          ratings=ratings.toFixed(2)
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
        case SEARCH_BY_PLATFORM: let platform=action.payload.data.map(e=>{return{...e,rating:e.score}})
          return {...state, games:[...platform], flag:action.payload.data.length?false:true,platform:action.payload.name,genre:undefined }
        case SEARCH_BY_GENRE: let genres=action.payload.data.map(e=>{return{...e,rating:e.score}}) 
          return {...state, games:[...genres], flag:action.payload.data.length?false:true,genre:action.payload.name,platform:undefined }
        case GET_GAMES: action.payload.query.sort(compare_lname) 
          return {...state, games:[...action.payload.query],savedGames:[...action.payload.list],flag:false,genre:undefined,platform:undefined, loadingFlag:false};
        case GET_GAME: let rating= action.payload.rating.reduce((a,i)=>a+i.score,0)/action.payload.rating.length
          rating=isNaN(rating)?0:rating.toFixed(2)
          return {...state, game:{...action.payload,rating},cacheGame:{...action.payload,rating}};
        case SET_GAME: return {...state, game:undefined}
        case SET_GAMES:return {...state, games:[]}
        case ADD_GAME: 
           let savedGames={name:'',id:''}
         state.games.forEach((e)=>{
          if(e.name===action.payload.name){
            savedGames.name=e.name;
            savedGames.id=e.id;
            e.id=action.payload.id
          }
        })
        return {...state, games:[...state.games],savedGames:[...state.savedGames,savedGames]}
        case REMOVE_GAME: 
        let foundGame=false
        state.games.forEach(e=>{
          if(e.id===action.payload.id){
            foundGame=state.savedGames.find(element=> element.name===e.name)
            if(foundGame){
              e.id=foundGame.id
              foundGame=foundGame.name
            }else{
             state.games=[...state.games.filter(f=>f.id!==e.id)] 
            }
            
            }
          }) 
        return {...state, games: [...state.games], savedGames:state.savedGames.filter(e=>e.name!==foundGame) }
      
        case UPDATE_DETAILS: return {...state, game: {...action.payload}}
        case GET_CACHE_GAME: return {...state,game:{...state.cacheGame}}
        default: return state;
    }

}
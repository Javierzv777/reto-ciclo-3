import axios from 'axios';
export const CREATE_MOVIE='CREATE_MOVIE'
export const UPDATE_MOVIE='UPDATE_MOVIE'
export const GET_MOVIES='GET_MOVIES'
export const GET_MOVIE='GET_MOVIE'


export function createMovie(payload){
    return{
        type: CREATE_MOVIE,
        payload
    }
}

export function updateMovie(payload){
    return{
        type: UPDATE_MOVIE,
        payload
    }
}

export  function getMovies(payload){
 
    if(!payload.data){
        return async function(dispatch){

            return axios.get('http://localhost:3001/videogames')
            .then((response)=>{
                dispatch({ type: GET_MOVIES, payload: response.data });
            })
            .catch(e=>console.log(e));
        }
        }
        return async function(dispatch){
            return axios.get(`http://localhost:3001/videogames/?name=${payload.data}`)
            .then((response)=>{
                dispatch({ type: GET_MOVIES, payload: response.data });
            })
            .catch(e=>console.log(e));
        }


}
export function getMovie(m){
    if(m){
        return async function(dispatch){
        
            return axios.get(`http://localhost:3001/videogame/${m}`)
                .then((response)=>{
                    dispatch({ type: GET_MOVIE, payload: response.data.element });
                
                })
                .catch(e=>console.log(e));
        }
    }
    return {
        type: GET_MOVIE, payload:m
    }
}
import axios from 'axios';
export const CREATE_GAME='CREATE_GAME'
export const UPDATE_GAME='UPDATE_GAME'
export const GET_GAMES='GET_GAMES'
export const GET_GAME='GET_GAME'
export const ADD_GAME='ADD_GAME'
export const REMOVE_GAME='REMOVE_GAME'


export function createGame(payload){
    return{
        type: CREATE_GAME,
        payload
    }
}

export function updateGame(payload){
    return{
        type: UPDATE_GAME,
        payload
    }
}

export  function getGames(payload){
 
    if(!payload.data){
        return async function(dispatch){

            return axios.get('http://localhost:3001/videogames')
            .then((response)=>{
                dispatch({ type: GET_GAMES, payload: response.data });
            })
            .catch(e=>console.log(e));
        }
        }
        return async function(dispatch){
            return axios.get(`http://localhost:3001/videogames/?name=${payload.data}`)
            .then((response)=>{
                dispatch({ type: GET_GAMES, payload: response.data });
            })
            .catch(e=>console.log(e));
        }


}
export function getGame(m){
    if(m){
        return async function(dispatch){
        
            return axios.get(`http://localhost:3001/videogame/${m}`)
                .then((response)=>{
                    dispatch({ type: GET_GAME, payload: response.data.element });
                
                })
                .catch(e=>console.log(e));
        }
    }
    return {
        type: GET_GAME, payload:m
    }
}
export function saveGame(id,i){
    return async function(dispatch){
        
        return axios.get(`http://localhost:3001/videogame/${id}`)
            .then((response)=>{
                const {name, description, released, image,rating,platforms,genres}=response.data.element
                axios.post('http://localhost:3001/videogame', {
                    name, description, released, image,rating,platforms,genres
                  }).then(response=> {
                      console.log(response.data.id)
                    //   dispatch({type:SAVE_GAME, payload:response.data.name})
                      axios.get(`http://localhost:3001/videogame/${response.data.id}`)
                      .then((response)=>{
                        console.log(response.data)
                        const {id,name, image}=response.data.element
                        dispatch({type:ADD_GAME, payload:{id,name,image,i}})
                      })
                  });
            })
            .catch(e=>console.log(e));
    }
}

export function deleteGame(id,name){
    return async function(dispatch){
        return axios.delete(`http://localhost:3001/videogame/${id}`)
        .then((e)=>{
            dispatch({type:REMOVE_GAME, payload:e.data.gameDeleted})
        } 
        )
    }
}
import axios from 'axios';
export const CREATE_GAME = 'CREATE_GAME'
export const UPDATE_GAME = 'UPDATE_GAME'
export const GET_GAMES = 'GET_GAMES'
export const GET_GAME = 'GET_GAME'
export const ADD_GAME = 'ADD_GAME'
export const REMOVE_GAME = 'REMOVE_GAME'
export const UPDATE_DETAILS = 'UPDATE_DETAILS'
export const GET_CACHE_GAME = 'GET_CACHE_GAME'
export const CLEAR_LIST = 'CLEAR_LIST'
export const GET_PLATFORMS = 'GET_PLATFORMS'
export const GET_GENRES = 'GET_GENRES'
export const SEARCH_BY_PLATFORM = 'SEARCH_BY_PLATFORM'
export const SEARCH_BY_GENRE = 'SEARCH_BY_GENRE'
export const START_LOADING='START_LOADING'
export const SET_GAME='SET_GAME'
export const UPDATE_RATING='UPDATE_RATING'


export function updateRating(id,rating){
    return async function(dispatch){
        if(id){
            return axios.post(`http://localhost:3001/score/?id=${id}&score=${rating}`)
            .then((response)=>{
                
                return axios.get(`http://localhost:3001/videogame/${id}`)
            })
            .then((response)=>{
                dispatch({type:UPDATE_RATING, payload:response.data.element})  
            })
        }
    }
}
export function setGame(){
    return {type:SET_GAME}
}
export function startLoading(){
    return {type:START_LOADING }
}
export function getPlatforms(id, name) {
    return async function (dispatch) {
        if (!id) {
            return axios.get(`http://localhost:3001/platforms/`,)
                .then((response) => {
                    dispatch({ type: GET_PLATFORMS, payload: response.data });
                })
                .catch(e => console.log(e.message));
        }
        if (id) {
            return axios.get(`http://localhost:3001/platforms/${id}`,)
                .then((response) => {
                    dispatch({ type: SEARCH_BY_PLATFORM, payload: { data: response.data, name } });
                })
                .catch(e => console.log(e.message));
        }
    }
}
export function getGenres(id, name) {
    return async function (dispatch) {
        if (!id) {
            return axios.get(`http://localhost:3001/genres/`,)
                .then((response) => {
                    dispatch({ type: GET_GENRES, payload: response.data });
                })
                .catch(e => console.log(e.message));

        }
        if (id) {
            return axios.get(`http://localhost:3001/genres/${id}`,)
                .then((response) => {
                    dispatch({ type: SEARCH_BY_GENRE, payload: { data: response.data, name } });
                })
                .catch(e => console.log("e.message"));
        }
    }
}
export function clearList() {
    return {
        type: CLEAR_LIST
    }
}
export function createGame(payload) {

    return async function (dispatch) {

        return axios.post(`http://localhost:3001/videogame/`, {
            ...payload
        })
            .then((response) => {
            })
            .catch(e => console.log(e));
    }

}

export function updateGame(payload, id) {

    return async function (dispatch) {

        return axios.put(`http://localhost:3001/videogame/${id}`, {
            ...payload
        })
            .then((response) => {
                dispatch({ type: UPDATE_GAME });
            })
            .catch(e => console.log(e));
    }
}


export function updateDetails(payload) {
    return {
        type: UPDATE_DETAILS,
        payload
    }
}
export function getCacheGame() {
    return {
        type: GET_CACHE_GAME
    }
}

export function getGames(payload) {

    if (!payload.data) {
        return async function (dispatch) {
            return axios.get('http://localhost:3001/videogames')
                .then((response) => {
                    dispatch({ type: GET_GAMES, payload: response.data });
                })
                .catch(e => console.log(e));
        }
    }
    return async function (dispatch) {
        return axios.get(`http://localhost:3001/videogames/?name=${payload.data}`)
            .then((response) => {
                dispatch({ type: GET_GAMES, payload: response.data });
            })
            .catch(e => console.log(e));
    }
}
export function getGame(m) {
    if (m) {
        return async function (dispatch) {

            return axios.get(`http://localhost:3001/videogame/${m}`)
                .then((response) => {
                    dispatch({ type: GET_GAME, payload: response.data.element });

                })
                .catch(e => console.log(e));
        }
    }
    return {
        type: GET_GAME, payload: m
    }
}
export function saveGame(id) {
    return async function (dispatch) {

        return axios.get(`http://localhost:3001/videogame/${id}`)
            .then((response) => {
                const { name, description, released, image, rating, platforms, genres } = response.data.element
                axios.post('http://localhost:3001/videogame', {
                    name, description, released, image, rating, platforms, genres
                }).then(response => {
                    axios.get(`http://localhost:3001/videogame/${response.data.id}`)
                        .then((response) => {

                            const { id, name, image,score } = response.data.element
                            dispatch({ type: ADD_GAME, payload: { id, name, image,rating:score } })
                        })
                });
            })
            .catch(e => console.log(e));
    }
}

export function deleteGame(id, name) {
    return async function (dispatch) {
        return axios.delete(`http://localhost:3001/videogame/${id}`)
            .then((e) => {
                dispatch({ type: REMOVE_GAME, payload: e.data.gameDeleted })
            }
            )
    }
}
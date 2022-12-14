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
export const SET_GAMES='SET_GAMES'
export const SORT_BY_NAME='SORT_BY_NAME'
export const SORT_BY_RATING='SORT_BY_RATING'
export const REVERSE='REVERSE'
export const SET_PAGES='SET_PAGES'
export const SET_SHOW_GAMES='SET_SHOW_GAMES'

export function setShowGames(arr){
    return {type: SET_SHOW_GAMES, payload: arr}
}
export function setPages(num){
    return {type: SET_PAGES, payload: num}
}
export function updatePlatforms(arr){
    return {type:GET_PLATFORMS,payload:[...arr] }
}
export function updateGenres(arr){
    return {type:GET_GENRES,payload:[...arr] }
}
export function reverseFn(){
    return{type:REVERSE}
}
export function sortByName(){
    return{type:SORT_BY_NAME}
}
export function sortByRating(){
    return{type:SORT_BY_RATING}
}
export function setGames(){
    return{type:SET_GAMES}
}
export function updateRating(id,rating){
    return async function(dispatch){
        if(id){
            return axios.post(`/score/?id=${id}&score=${rating}`)
            .then((response)=>{
                
                return axios.get(`/videogame/${id}`)
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
            return axios.get(`/platforms/`,)
                .then((response) => {
                    dispatch({ type: GET_PLATFORMS, payload: response.data });
                })
                .catch(e => console.log(e.message));
        }
        if (id) {
            return axios.get(`/platforms/${id}`,)
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
            return axios.get(`/genres/`,)
                .then((response) => {
                    dispatch({ type: GET_GENRES, payload: response.data });
                })
                .catch(e => console.log(e.message));

        }
        if (id) {
            return axios.get(`/genres/${id}`,)
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

        return axios.post(`/videogame/`, {
            ...payload
        })
        .then((response) => {console.log(response)
        })
        .catch(e => console.log(e));
    }

}

export function updateGame(payload, id) {

    return async function (dispatch) {

        return axios.put(`/videogame/${id}`, {
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
            return axios.get('/videogames')
                .then((response) => {
                    dispatch({ type: GET_GAMES, payload: response.data });
                })
                .catch(e => console.log(e));
        }
    }
    return async function (dispatch) {
        return axios.get(`/videogames/?name=${payload.data}`)
            .then((response) => {
                dispatch({ type: GET_GAMES, payload: response.data });
            })
            .catch(e => console.log(e));
    }
}
export function getGame(m) {
    if (m) {
        return async function (dispatch) {
            dispatch({type:"START_LOADING"})
            return axios.get(`/videogame/${m}`)
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

        return axios.get(`/videogame/${id}`)
            .then((response) => {
                const { name, description, released, image, rating, platforms, genres } = response.data.element
                axios.post('/videogame', {
                    name, description, released, image, rating, platforms, genres
                }).then(response => {
                    axios.get(`/videogame/${response.data.id}`)
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
        return axios.delete(`/videogame/${id}`)
            .then((e) => {
                dispatch({ type: REMOVE_GAME, payload: {id:e.data.gameDeleted,name} })
            }
            )
    }
}
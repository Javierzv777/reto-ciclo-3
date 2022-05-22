export const CREATE_MOVIE='CREATE_MOVIE'
export const UPDATE_MOVIE='UPDATE_MOVIE'
export const GET_MOVIES='GET_MOVIES'

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

export function getMovies(payload){
    return{
        type: GET_MOVIES,
        payload
    }
}
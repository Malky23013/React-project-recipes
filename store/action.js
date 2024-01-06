import axios from "axios";

export const SET_USERNAME = "SET_USERNAME";
export const ADD_USER = "ADD_USER";
export const EDIT_USER = "EDIT_USER";
export const SET_USER = "SET_USER"
export const SET_CAT = "SET_CAT";
export const GET_USER = "GET_USER";
export const LOAD = "LOAD";
export const SET_RECIPE = "SET_RECIPE";

export const SetUser = () => {
    return dispatch => {
        dispatch({ type: LOAD })
        axios.get("https://localhost:8080/api/recipe")
            .then(x => {
                setTimeout(() => { dispatch({ type: SET_USER, user: x }) }, 1000)

            })
    }
}

// export const SetUser = () => {
//     return dispatch => axios.post("https://jsonplaceholder.typicode.com/users")
//         .then(x => {
//             dispatch({ type: SET_USER, users: x.data })
//         })
// }
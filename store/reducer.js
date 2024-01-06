import * as actionsName from './action';
const initilaizeState = {
    user: null,
    // need to be null
    load: false,
    Cat:null,
    recipes: []
  }
  

const reducer = (state = initilaizeState, action) => {
    switch (action.type) {
        // case actionsName.ADD_USER:
        //     {
        //         const users = [...state.users]
        //         // action.newUser.id=state.count;
        //         users.push({ ...action.newUser, id: state.count })
        //         return {
        //             ...state,
        //             users,
        //             count: state.count + 1,
        //         }
        //     }
        case actionsName.SET_USER:
            {
                return {
                    ...state,
                    user: action.user,
                    load: false
                }
                break;
            }
            case actionsName.SET_CAT:
                {
                    return {
                        ...state,
                        Cat: action.Cat,
                        load: false
                    }
                    break;
                }  
        case actionsName.LOAD:
            {

                return {
                    ...state,
                    load: true,

                }
                break;
            }
            
        case actionsName.EDIT_USER:
            {
                const users = [...state.users]
                const findIndex = users.findIndex(x => x.id === action.userObj.id)
                users[findIndex] = action.userObj;
                return { ...state, users }
                break;
            }
            case actionsName.SET_RECIPE:{
                return {...state ,recipes:action.payload}
            }
        // case actionsName.DELETE_USER:
        //     {
        //         const users = state.users.filter(x => x.id !== action.userId)
        //         return { ...state, users }
        //         break;
        //     }
        default:

            return { ...state }
            break;
    }
}
export default reducer;

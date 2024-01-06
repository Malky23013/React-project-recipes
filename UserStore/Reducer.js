
const initialState = {

    user: null,
    recipes: [],
   SelectedCategory:null
}
const Reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SET_USER':
            {
                return {
                    ...state, user: action.payload
                }
            }
            break;
        case 'LOG_OUT':
            {
                return {
                    ...state,
                    user: null

                }
            }
            break;
        case 'GET_RECIPIES':
            {
                return {
                    ...state, recipes: action.payload
                }
            }
            break;
        case 'ADD_RECIPE':
            {
            return {
                ...state, recipes: [...state.recipes, action.toAdd]

            }
        }
        break;
        case 'SET_CATEGORY':
            {
                return {
                    ...state, SelectedCategory: action.payload
                }
            }
            break;
        
    default:
        return state; 
    }

}
export default Reducer;
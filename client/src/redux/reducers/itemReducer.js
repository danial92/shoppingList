const initialState = {
    items: [],
    loading: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_ITEMS':
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        case 'DELETE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            }
        case 'ADD_ITEM':
            return {
                ...state,
                items: [action.payload, ...state.items] // the order can be reverse like - [...state.items, action.payload]
            }
        case 'LOADING_ITEM':
            return {
                ...state,
                loading: true
            }
        default:
            return state // it is must to return state in default
    } 
}

export default reducer;
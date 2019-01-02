export default function addCity(state={data:[]},action){
    switch(action.type){
        case 'ADD_CITY':
        return{
                ...state,data:action.data
        }
    default:
        return state
    }
}
export default function deleteCity(state={data:[],
    loading:true},action){
    switch(action.type){
        case 'DELETE_CITY':
        return{
            ...state,
            data:action.data,
        }
        default:
            return state
    }
}
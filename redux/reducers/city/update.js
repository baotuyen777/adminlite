export default function updateCity(state={data:[],
    loading:true},action){
    switch(action.type){
        case 'UPDATE_CITY':
        return{
            ...state,
            data:action.data,

        }
        default:
            return state
    }
}
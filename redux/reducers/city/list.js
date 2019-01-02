export default function cityList(state={data:[],
    loading:true},action){
    switch(action.type){
        case 'GET_CITY':
        return {
            ...state,
            data:action.data,
            loading:false,
        };
        default:
            return state
    }
}

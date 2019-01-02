export default function cityDetail(state={data:[],
    loading:true},action){
    switch(action.type){
        case 'GET_CITY_DETAIL':
        return {
            ...state,
            data:action.data,
            loading:false,
        };
        default:
            return state
    }
}
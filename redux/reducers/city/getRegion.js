export default function getRegion(state={data:[]},action){
    switch(action.type){
        case 'GET_REGION':
            return{
                ...state,data:action.data
            }
        default:
            return state
    }
}
const initialState = {
    trips:[]
};

export default (state = initialState, action)=>{
    let trips = [...state.trips];

    switch(action.type){
        case 'ADD_TRIP':
            trips.push(action.payload.trip);
            return{...state, trips}
            break;
        case 'DEL_TRIP':
            trips = trips.filter(i=>i.id !=action.payload.trip.id);
            return {...state, trips};
            break;
    }
    return state;
}
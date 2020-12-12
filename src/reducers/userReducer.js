const initialState = {
    name:'',
    token:''
};

export default(state = initialState, action) =>{

    switch(action.type){
        case 'SET_NAME':
            return {...state, name:action.payload}
            break;
        case 'SET_TOKEN':
            return {...state, token:action.payload.token};
            break;
    }

    return state;
}
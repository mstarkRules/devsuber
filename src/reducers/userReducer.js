const initialState = {
    name:'',
    token:''
};

export default(state = initialState, action) =>{

    switch(action.type){
        case 'SET_NAME':
            return {...state, name:action.payload}
            break;
    }

    return state;
}
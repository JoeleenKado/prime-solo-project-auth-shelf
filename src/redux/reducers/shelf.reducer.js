const shelfReducer = (state = [], action) => { // in order to map we need to make sure that this is an array. Cannot map through an object
  switch (action.type) {
    case 'SET_SHELF':
      return action.payload;
    default:
      return state;
  }
};

export default shelfReducer;

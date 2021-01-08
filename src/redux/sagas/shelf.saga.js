import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchShelf() {
  try {
    const response = yield axios.get('/api/shelf');
    yield put({ type: 'SET_SHELF', payload: response.data });
  } catch (error) {
    console.log('Error with getting shelf data in saga:', error);
  }
}

function* sendShelf(action) {
  try {
    yield axios.post('/api/shelf', action.payload);
    yield fetchShelf();
  
  } catch (error) {
    console.error('Error with posting shelf data in saga');
  }
}

function* deleteItem(action) {
  console.log(action.payload);
  try {
    yield axios.delete(`/api/shelf/${action.payload.id}/${action.payload.user_id}`);
    yield fetchShelf();
    
  } catch (error) {
    console.error('Error with deleting shelf data in saga', error);
  }
}



function* shelfSaga() {
  yield takeLatest('FETCH_SHELF', fetchShelf);
  yield takeLatest('SEND_ITEM', sendShelf);
  yield takeLatest('DELETE_ITEM', deleteItem);

}


export default shelfSaga;

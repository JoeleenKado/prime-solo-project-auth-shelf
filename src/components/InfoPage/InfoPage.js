import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import './infoPage.css';

const InfoPage = () => {
  const initState = {
    description: '',
    image_url: '',
  };
  //state = initState; 
  // state = {
  //   description: '',
  //   image_url: '', 
  // }
  //setState is the same as doing this.setState()
  //state is the same as saying state 
  const [itemData, setState] = useState(initState);
  const dispatch = useDispatch();

  //this is the same as componentDidMount
  useEffect(() => {
    dispatch({ type: 'FETCH_SHELF' });
  }, []);

  // this line is the same as mapStateToProps thing 
  //const varName = find the redux state than pick what state you want with .reducer name from root reducer 
  const shelfData = useSelector((state) => state.shelf);

  const addItem = (e) => {
    e.preventDefault();
    dispatch({ type: 'SEND_ITEM', payload: itemData });
    //clears the state back to empty strings after submitting the form 
    setState(initState);
  };

  return (
    <div className={'root'}>
      <h1 className={'title'}>Shelf Page</h1>
      <form className={'form'} onSubmit={addItem}>
        <h2>Add Item</h2>
        <label htmlFor='description'>Descriptions</label>
        <input
          name='description'
          type='text'
          value={itemData.desc}
          onChange={(e) => setState({ ...itemData, desc: e.target.value })}
        ></input>
        <label htmlFor='image'>Image URL</label>
        <input
          name='image'
          type='text'
          value={itemData.imgURL}
          onChange={(e) => setState({ ...itemData, imgURL: e.target.value })}
        ></input>
        <button className={'btn'}>Submit</button>
      </form>
      <div className={'holder'}>
        {shelfData.map((info) => (
          <div key={info.id} className={'shelf'}>
            <h2>User ID: {info.user_id}</h2>
            <p>Description: {info.description}</p>
            <img src={info.image_url} alt={info.description}></img>
            <button onClick={() => dispatch({type : "DELETE_ITEM", payload : info})}>DELETE</button> 
            {/* left off here */}

          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoPage;
// import React from 'react';
// import { connect } from 'react-redux';
// import mapStoreToProps from '../../redux/mapStoreToProps';
// class InfoPage extends React.Component {
// componentDidMount() {
//   this.props.dispatch({type: 'FETCH_SHELF'})
// }
//    const dispatch = this.props.dispatch;
//    const shelfData = this.props.store.shelf;
//   render() {
//     return (
//       <div>
//         {JSON.stringify(this.props.store.shelf)}
//         <p>Info Page</p>
//          <button onClick={() => disptach({type:'DELETE_ITEM', payload: shelfData.id})}>DELETE</button>
//       </div>
//     )
//   }
// }

// //export default connect()(InfoPage);
// // const putReduxStateOnProps = (reduxState) => ({ reduxState });
// export default connect(mapStoreToProps)(InfoPage);

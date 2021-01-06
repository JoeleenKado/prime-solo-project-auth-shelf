import React from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import './infopage.css';

// const InfoPage = () => {
//   const initState = {
//     desc: '',
//     imgURL: '',
//   };

//   this is the same as setData = this.setState({ blah blah blah}) itemData = state,
//   const [itemData, setData] = useState(initState);
//   const dispatch = useDispatch();

//   this is the same as componentDidMount
//   useEffect(() => {
//     dispatch({ type: 'GET_SHELF' });
//   }, []);

//   this line is the same as mapsToStateProps thing 
//   const shelfData = useSelector((state) => state.shelf);

//   const addItem = (e) => {
//     e.preventDefault();
//     dispatch({ type: 'SEND_ITEM', payload: itemData });
//     setData(initState);
//   };

//   return (
//     <div className={'root'}>
//       <h1 className={'title'}>Shelf Page</h1>
//       <form className={'form'} onSubmit={addItem}>
//         <h2>Add Item</h2>
//         <label htmlFor='description'>Descriptions</label>
//         <input
//           name='description'
//           type='text'
//           value={itemData.desc}
//           onChange={(e) => setData({ ...itemData, desc: e.target.value })}
//         ></input>
//         <label htmlFor='image'>Image URL</label>
//         <input
//           name='image'
//           type='text'
//           value={itemData.imgURL}
//           onChange={(e) => setData({ ...itemData, imgURL: e.target.value })}
//         ></input>
//         <button className={'btn'}>Submit</button>
//       </form>
//       <div className={'holder'}>
//         {shelfData.map((info) => (
//           <div key={info.id} className={'shelf'}>
//             <h2>User ID: {info.user_id}</h2>
//             <p>Description: {info.description}</p>
//             <img src={info.image_url} alt={info.description}></img>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


class InfoPage extends React.Component {
componentDidMount() {
  this.props.dispatch({type: 'FETCH_SHELF'})
}

  render() {
    return (
      <div>
        {JSON.stringify(this.props.store.shelf)}
        <p>Info Page</p>
      </div>
    )
  }
}

//export default connect()(InfoPage);
// const putReduxStateOnProps = (reduxState) => ({ reduxState });
export default connect(mapStoreToProps)(InfoPage);

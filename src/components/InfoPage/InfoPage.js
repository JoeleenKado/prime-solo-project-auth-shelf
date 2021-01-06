import React from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'


// COME BACK TO LEARN HOOKS
// const InfoPage = () => (
//   <div>
//     <p>
//       Shelf Page
//     </p>
//   </div>
// );

// If you needed to add local state or other things,
// you can make it a class component like:


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

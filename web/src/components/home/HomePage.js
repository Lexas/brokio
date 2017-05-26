import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import * as operationsActions from '../../actions/operationsActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class HomePage extends React.Component {
  constructor(props, context){
    super(props, context);

    this.submitOperation = this.submitOperation.bind(this);
    this.updateUrlState = this.updateUrlState.bind(this);

    this.state = {
      url: '',
      url_dirty: false
    };
  }

  submitOperation(e){
    e.preventDefault();
    this.props.actions.postOperation(this.state.url)
      .then(data => {
        console.log("data", data);
      })
      .catch(error => {
        console.log("error", error);
      });
  }

  updateUrlState(e) {
    e.preventDefault();
    let targetId = e.target.id;

    switch(targetId) {
      case 'url':
        this.setState({ url_dirty: true, url: e.target.value });
        break;

      default:
        break;
    }
  }

  render () {
    return (
      <div className="jumbotron">
        <h1>Brok.io</h1>
        <p>Easier transactions, tune up your API</p>
        <hr/>
        <form className="form" onChange={this.updateUrlState} onSubmit={this.submitOperation}>
          <div className="form-group">
            <label htmlFor="url">URL:</label>
            <input type="text" className="form-control" id="url"/>
          </div>
          <div>
            <button type="submit" className="btn btn-default">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

HomePage.propTypes = {
  actions: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(operationsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

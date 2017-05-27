import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import * as operationsActions from '../../actions/operationsActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class HomePage extends React.Component {
  constructor(props, context){
    super(props, context);

    this.addOperationToTransaction = this.addOperationToTransaction.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addField = this.addField.bind(this);
    this.setOutputFields = this.setOutputFields.bind(this);
    this.setRequestBodyFields = this.setRequestBodyFields.bind(this);
    this.submitTransaction = this.submitTransaction.bind(this);

    this.state = {
      brokerName: '',
      transactionName: '',
      name: '',
      requestUrl: '',
      method: '',
      outputMap: [],
      requestBodyMap: [],
      operations: [],
      endpointUrl: ''
    };
  }

  addOperationToTransaction(e){
    e.preventDefault();
    console.log("Operation to be added:", this.state);
    let arrayOfOperations = this.state.operations;

    let operation = this.state;
    // the array of operations is part of the app state
    // so we remove the operations array, before pushing the acutal operation object
    delete operation.operations;
    delete operation.endpointUrl;

    arrayOfOperations.push(operation);

    this.setState({
      name: '',
      requestUrl: '',
      method: '',
      outputMap: [],
      requestBodyMap: [],
      operations: arrayOfOperations
    });
  }

  handleInputChange(e) {
    e.preventDefault();
    let newState = {};
    newState[e.target.id] = e.target.value;

    this.setState(newState);
  }

  setOutputFields(e, index) {
    e.preventDefault();

    let targetId = e.target.id;
    let value = e.target.value;
    let currentFields = this.state.outputMap;
    currentFields[index][targetId] = e.target.value;

    this.setState({
      outputMap: currentFields
    });
  }

  setRequestBodyFields(e, index) {
    e.preventDefault();

    let currentFields = this.state.requestBodyMap;
    currentFields[index][e.target.id] = e.target.value;

    this.setState({
      requestBodyMap: currentFields
    });
  }


  addField(e) {
    let targetArray= e.target.id;
    let newState = {};

    switch (targetArray) {
      case 'requestBodyMap':
        newState[targetArray] = this.state[targetArray].concat([{key: 'default', value: 'default'}]);
        break;

      case 'outputMap':
        newState[targetArray] = this.state[targetArray].concat([{value: 'default', key: 'default'}]);
        break;

      default:
        break;
    }

    this.setState(newState);
  }

  submitTransaction(e){
   e.preventDefault();
    this.props.actions.postOperation(this.state)
      .then(data => {
        console.log("data", data);
        this.setState({
          endpointUrl: data.endpointUrl
        });
      })
      .catch(error => {
        console.log("error", error);
      });
  }

  render () {
    return (
      <div className="jumbotron">
        <h1>Brok.io</h1>
        <p>Easier transactions, tune up your API</p>
        <hr/>
        <form className="form" onSubmit={this.addOperationToTransaction}>
          {/*This is the first component for the basic transaction */}
          <div className="form-group">
            <label htmlFor="brokerName">Broker name:</label>
            <input type="text"
                   onChange={this.handleInputChange}
                   value={this.state.brokerName}
                   className="form-control"
                   id="brokerName"/>
          </div>
          <div className="form-group">
            <label htmlFor="transactionName">Transaction name:</label>
            <input type="text"
                   onChange={this.handleInputChange}
                   value={this.state.transactionName}
                   className="form-control"
                   id="transactionName"/>
          </div>
          <hr/>
          {/* This is gonna be a component called Operations */}
          <h4>Operations</h4>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text"
                   onChange={this.handleInputChange}
                   value={this.state.name}
                   className="form-control"
                   id="name"/>
          </div>
          <div className="form-group">
            <label htmlFor="requestUrl">URL:</label>
            <input type="text"
                   onChange={this.handleInputChange}
                   value={this.state.requestUrl}
                   className="form-control"
                   id="requestUrl"/>
          </div>
          <div className="form-group">
            <label htmlFor="method">Method:</label>
            <input type="text"
                   onChange={this.handleInputChange}
                   value={this.state.method}
                   className="form-control"
                   id="method"/>
          </div>
          <div>
            <h5>Request Params &nbsp;<i onClick={this.addField} className="glyphicon glyphicon-plus" id="requestBodyMap"></i></h5>
            <br/>
            <table className="table table-bordered table-condensed" id="myDesiredResponse">
              <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
              </thead>
              <tbody>
              {this.state.requestBodyMap.map((field, index)=>
                <tr key={index}>
                  <td><input type="text" onChange={(e) => this.setRequestBodyFields(e, index)} id="key" className="form-control"/></td>
                  <td><input type="text" onChange={(e) => this.setRequestBodyFields(e, index)} id="value" className="form-control"/></td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
          <hr/>
          <div>
            <h5>Custom response &nbsp;<i onClick={this.addField} className="glyphicon glyphicon-plus" id="outputMap"></i></h5>
            <br/>
            <table className="table table-bordered table-condensed" id="myDesiredResponse">
              <thead>
              <tr>
                <th>Original field name</th>
                <th>Desired name</th>
              </tr>
              </thead>
              <tbody>
              {this.state.outputMap.map((field, index)=>
                <tr key={index}>
                  <td><input type="text" onChange={(e) => this.setOutputFields(e, index)} id="value" className="form-control"/></td>
                  <td><input type="text" onChange={(e) => this.setOutputFields(e, index)} id="key" className="form-control"/></td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
          <div>
            <button type="submit" className="btn btn-default">Add</button>
          </div>
        </form>
        <hr/>
        <div>
          <table className="table table-bordered table-condensed" id="currentOperations">
            <thead>
            <tr>
              <th>Current operations in transaction</th>
            </tr>
            </thead>
            <tbody>
            {this.state.operations.map((operation, index) =>
              <tr key={index}>
                <td>{operation.name}</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
        <div>
          <button type="submit" onClick={this.submitTransaction} className="btn btn-default">Submit transaction</button>
        </div>
        {this.state.endpointUrl &&
        <div>
          <h1>{this.state.endpointUrl}</h1>
        </div>}
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

// frontend/src/App.js

import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      activeItem: {
        dnasequence: "",
        forcererun: false
      },
      dnaSearchList: [],
      siteurl: "http://localhost:8000/"
    };
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    axios
      .get(this.state.siteurl + "api/SearchProteins/")
      .then(res => this.setState({ dnaSearchList: res.data }))
      .catch(err => console.log(err));
  };
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleSubmit = item => {
    this.toggle();
    if (item.forcererun)
    {
      this.handleDelete(item);
    }
    var postItem = { dnasequence: item.dnasequence }
    axios
      .post(this.state.siteurl + "api/SearchProteins/", postItem)
      .then(res => this.refreshList())
      .catch(err => console.log(err));
  };
  handleDelete = item => {
    axios
      .delete(this.state.siteurl + `api/SearchProteins/${item.dnasequence}/`)
      .then(res => this.refreshList())
      .catch(err => console.log(err));
  };
  createItem = () => {
    const item = { dnasequence: "", forcererun: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  renderItems = () => {
    const newItems = this.state.dnaSearchList;
    return newItems.map(item => (
      <li
        key={item.dnasequence}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={"dnasequence-match mr-2"}
          title={item.dnasequence}
        >
          DNA Sequence: {item.dnasequence} ||| Status: {item.status} ||| Match: {item.match}
        </span>
        <span>
          <button
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };
  render() {
    return (
      <main className="content">
        <h1 className="text-center my-4">DNA Protein Matching App</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-primary">
                  Match New Sequence
                </button>
              </div>
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}
export default App;
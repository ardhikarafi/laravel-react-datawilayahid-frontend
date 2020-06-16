import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super()

    // data provinsi disimpan di state.provinces
    this.state = {
      filter: '',
      provinces: [],
      regencies: [],
      districts: [],
      // villages: []
    }
  }
  componentDidMount() {
    // ajax call
    fetch('http://localhost:8000/api/province')
    .then(response => response.json())
    .then((json) => {
      this.setState({
        provinces: json.data,
      })
    })
    fetch('http://localhost:8000/api/regencies')
    .then(response => response.json())
    .then((json) => {
      this.setState({
        regencies: json.data
      })
    })
    fetch('http://localhost:8000/api/districts')
    .then(response => response.json())
    .then((json) => {
      this.setState({
        districts: json.data
      })
    })
    // fetch('http://localhost:8000/api/villages')
    // .then(response => response.json())
    // .then((json) => {
    //   this.setState({
    //     villages: json.data
    //   })
    // })
  }

  filter = () => {
    fetch('http://localhost:8000/api/get?filter=' + this.state.filter)
    .then(response => response.json())
    .then((json) => {
      this.setState({
        provinces: json.data
      })
    })
    fetch('http://localhost:8000/api/getkota?filter=' + this.state.filter)
    .then(response => response.json())
    .then((json) => {
      this.setState({
        regencies: json.data
      })
    })
    fetch('http://localhost:8000/api/getdistricts?filter=' + this.state.filter)
    .then(response => response.json())
    .then((json) => {
      this.setState({
        districts: json.data
      })
    })
    // fetch('http://localhost:8000/api/getvillages?filter=' + this.state.filter)
    // .then(response => response.json())
    // .then((json) => {
    //   this.setState({
    //     villages: json.data
    //   })
    // })
  }

  onChangeText = (event) => {
    this.setState({
      filter: event.target.value
    })
  }

  renderProvinces(item, index) {
    return <li key={index}>{item.name}</li>
  }
  renderRegencies(item, index) {
    return <li key={index}>{item.name}</li>
  }
  renderDistricts(item, index) {
    return <li key={index}>{item.name}</li>
  }
  // renderVillages(item, index) {
  //   return <li key={index}>{item.name}</li>
  // }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Indonesia</h2>
        </div>
        {/* --------------------------------------------- */}
        <p className="App-intro">
          Filter
        </p>
        <input type="text" value={this.state.filter} onChange={this.onChangeText} style={{marginBottom: 8}}/><br/>
        <button onClick={this.filter}>Saring</button>

        <div style={{display: 'flex', justifyContent: 'center', textAlign: 'left'}}>
          <h2>Provinsi</h2>
          <ol>
            { this.state.provinces.map(this.renderProvinces) }
          </ol>
          <h2>Kota</h2>
          <ol>
            { this.state.regencies.map(this.renderRegencies) }
          </ol>
          <h2>Distrik</h2>
          <ol>
            { this.state.districts.map(this.renderDistricts) }
          </ol>
          {/* <h2>Villages</h2>
          <ol>
            { this.state.villages.map(this.renderVillages) }
          </ol> */}
        </div>
      </div>
    );
  }
}

export default App;
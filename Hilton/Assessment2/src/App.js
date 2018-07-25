import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    background: 'lightgray'
  }
  enable = (e) =>{
    console.log(e.target.id);
    var elem = document.getElementsByClassName(e.target.id);
    console.log(elem);
    elem.style.backgroundColor = 'white';
  }
  render() {
    return (
    <div><div>
      <table>
        <tbody>
          <tr>
            <td>
              <div className="room"><b/>Room 1</div>
              <div className="adult">Adult</div>
              <div className="child">Children</div>
              <div className="select">
              <select className="selectAdult">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
              
              <select className="selectChild">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
              </div>
            </td>
            <td className="room2" style={{backgroundColor: this.state.background}}disabled>
              <div className="room"><input id="room2" type="checkbox"style={{float:"left"}} onClick={this.enable}/><b/>Room 2</div>
              <div className="adult">Adult</div>
              <div className="child">Children</div>
              <div className="select">
              <select className="selectAdult">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
              
              <select className="selectChild">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
              </div>
            </td>
            <td className="room3">
              <div className="room" disabled><input type="checkbox"style={{float:"left"}} id="room3"/><b/>Room 3</div>
              <div className="adult">Adult</div>
              <div className="child">Children</div>
              <div className="select">
              <select className="selectAdult">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            
              <select className="selectChild">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
              </div>
            </td>
            <td className="room4">
              <div className="room" disabled><input id="room4" type="checkbox"style={{float:"left"}}/><b/>Room 4</div>
              <div className="adult">Adult</div>
              <div className="child">Children</div>
              <div className="select">
              <select className="selectAdult">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
              
              <select className="selectChild">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <button style={{position: "absolute", top:"150px", left: "40px"}}>Submit</button>
    </div></div>);
      
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { remove_item, add_item } from '../action/app';

class App extends Component {
  constructor(props){
    super(props);
    this.state={};
  }

mouseOver = (obj) => {
  obj.hover  = true;
  this.forceUpdate();
}
mouseOut = (obj) => {
  setTimeout(
    function(){obj.hover = false;},1
  );
  this.forceUpdate();
}
onRemoveItem=(obj)=>{
    // let list = this.state.mylist.filter((item,index)=>{
    //   if(obj.title != item.title){
    //     return true;
    //   }
    // })
    // this.setState({mylist:list});
    // this.forceUpdate();
    this.props.dispatch(remove_item(obj));
};
onAddItem = (obj)=>{
    // let copy = Object.assign({},obj);
    // let list = JSON.parse(JSON.stringify(this.state.mylist));
    // list.push(copy);
    // let recomm = this.state.recommendations.filter((item,index)=>{
    //   if(obj.title != item.title){
    //     return true;
    //   }
    // })
    // this.setState({recommendations:recomm});
    // console.log(this.state.recommendations);
    // this.setState({mylist:list});
    // this.forceUpdate();
    this.props.dispatch(add_item(obj));
}

render() {
    return <div id="app">
    <header>
      <h1>TV Series</h1>
    </header>
    <table>
      <tbody>
      <tr><th id="mylist">My Lists</th></tr>
      <tr>
      {
            this.props.mylist.map((item,index)=>{
                return <td key={index}>
                        {item.title}
                    </td>
            })
        }
      </tr>
      <tr>
        {
            this.props.mylist.map((item,index)=>{
                return <td key={index}> 
                        <div onMouseOver={()=>this.mouseOver(item)} onMouseOut={()=>this.mouseOut(item)}>
                          {<img className="image" src={item.img}/>}<br/>
                          {item.hover ? (<button className="removeBtn" onClick={()=>this.onRemoveItem(item)}>Remove</button>) : null}
                        </div>
                    </td>
            })
        }
      </tr>
      <tr><th id="recom">Recommendations</th></tr>
      <tr>
      {
            this.props.recommendations.map((item,index)=>{
                return <td className="image" key={index}>
                        {item.title}
                    </td>
            })
        }
      </tr>
      <tr>
        {
            this.props.recommendations.map((item,index)=>{
                return <td key={index}>
                        {<img src={item.img} onMouseOver={()=>this.mouseOver(item)} onMouseOut={()=>this.mouseOut(item)}/>}<br/>
                        {item.hover ? (<button className="addBtn" onClick={()=>this.onAddItem(item)}>Add</button>) : null}
                    </td>
            })
        }
      </tr>
      </tbody>
    </table>
    </div>
  }
}
function mapStateToProps(state){
  return {
    mylist: state.mylist,
    recommendations: state.recommendations
  }
}
export default connect(mapStateToProps)(App);

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
    this.state={
      mylist: [

      {
      
      'title': 'Futurama',
      
      'id': 1,
       
      'img': 'http://cdn1.nflximg.net/webp/7621/3787621.webp',

      'hover':false
      
      },
      
      {
      
      'title': 'The Interview',
       
      'id': 2,
       
      'img': 'http://cdn1.nflximg.net/webp/1381/11971381.webp',

      'hover':false
      
      },
  
      {     
      
      'title': 'Gilmore Girls',
      
      'id': 3, 
      
      'img': 'http://cdn1.nflximg.net/webp/7451/11317451.webp',

      'hover':false
      
      }
      ],
      
      recommendations: [
      
      {
      
      'title': 'Family Guy',
      
      'id': 4,
      
      'img': 'http://cdn5.nflximg.net/webp/5815/2515815.webp',

      'hover':false

      },
       
      {

      'title': 'The Croods',
      
      'id': 5,
      
      'img': 'http://cdn3.nflximg.net/webp/2353/3862353.webp',

      'hover':false
      },
      
      {
      
      'title': 'Friends',
      
      'id': 6,
      
      'img': 'http://cdn0.nflximg.net/webp/3200/9163200.webp',

      'hover':false
      }
      
      ]
  };
}
mouseOver = (obj) => {
    this.setState(obj.hover = true);
}
mouseOut = () => {
    this.setState({hover: false});
}
onRemoveItem=(obj)=>{
    this.state.filter((item,index)=>{
      if(obj.title != item.title){
        return true;
      }
    })
};
render() {
    return <div>
    <table>
      <tbody>
      <tr><th>My Lists</th></tr>
      <tr>
      {
            this.state.mylist.map((item,index)=>{
                return <td>
                        {item.title}
                    </td>
            })
        }
      </tr>
      <tr>
        {
            this.state.mylist.map((item,index)=>{
                return <td>
                        {<img src={item.img} onMouseOver={item.mouseOver}/>}
                        {item.hover ? (<button onClick={()=>this.onRemoveItem(item)}>Remove</button>) : null}
                    </td>
            })
        }
      </tr>
      <tr><th>Recommendations</th></tr>
      <tr>
      {
            this.state.recommendations.map((item,index)=>{
                return <th>
                        {item.title}
                    </th>
            })
        }
      </tr>
      <tr>
        {
            this.state.recommendations.map((item,index)=>{
                return <td>
                        {<img src={item.img} onMouseOver={this.mouseOver}/>}
                        {this.state.hover ? (<button>Add</button>) : null}
                    </td>
            })
        }
      </tr>
      </tbody>
    </table>
    </div>
  }
}

export default App;

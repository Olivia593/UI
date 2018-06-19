import {remove_item,REMOVE_ITEM, add_item, ADD_ITEM} from '../action/app';
const initialAppState = {
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

function appReducer(state=initialAppState,actions){
    switch(actions.type){
        case REMOVE_ITEM:
        let list = state.mylist.filter((item,index)=>{
            if(actions.obj.title != item.title){
              return true;
            }
          })
        let item = Object.assign({},actions.obj);
        let newRecom = JSON.parse(JSON.stringify(state.recommendations));
        newRecom.push(item);
        return {
            mylist:list,
            recommendations: newRecom
        }  
        
        break;
        case ADD_ITEM:
        let copy = Object.assign({},actions.obj);
        let mylist = JSON.parse(JSON.stringify(state.mylist));
        mylist.push(copy);
        let recomm = state.recommendations.filter((item,index)=>{
        if(actions.obj.title != item.title){
            return true;
            }
        })
        return {
            mylist:mylist,
            recommendations:recomm
        }
        break;
        default:
            return state;
    }
}

export default appReducer;
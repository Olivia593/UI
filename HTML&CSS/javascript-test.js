var data = {
    kliij: 556,
    hyyj: {
      ggth: 22454,
      lokok: 123,
      lll: 444
    },
    dd: 44,
    ee: {
      efgt: 4550,
      cfr: 1155
    },
    gty: {
      ffs: 40909,
      nnn: 999,
      bbate: {
        abcdefg: 1211
      }
    }
  };

  /**
   * Write the body of `find()` such that the comparison below will be true.
    **/

  function find(value, target) {
    //write your logic here
    // console.log(target);
    for(var i in target){
        if(typeof(target[i]) == 'object'){
            var result = find(value,target[i]);
            // console.log(result);
            if(result){
                return result;
            }
        }else{
            if(target[i] == value){
                return i;
            }
        }
    }
  }
  console.log(find(1211,data));
  
//   find(1211, data) === 'abcdefg';

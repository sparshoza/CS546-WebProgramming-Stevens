export const questionOne = (arr) => {
  var i,sum=0;
  let x = true;
  for (i = 0; i < arr.length; i++) 
  {
    sum += (arr[i]*arr[i]*arr[i]);  
  }
  if (sum==1)
  {
    x = false;
  }
  else if(sum==2)
  {
      x = true;
  }
  else{
    for(i=2;i<=sum-1;i++){
      if(sum%i==0)
      {
        x = false;
        break;
      }
    }
  }  
  var objectQ1 = {
    [sum] : x //https://stackoverflow.com/questions/6084858/javascript-use-variable-as-object-name for how to pass a variable value as name
  };
    return objectQ1;
};

export const questionTwo = (numArray) => {
  var ans = [true]
  for(let i=0; i < numArray.length-1; i++) 
  {
    if(numArray[i] > numArray[i+1]) 
    {
      ans = [false,i,i+1];
      break;
    }
  }
  return ans; //return result
};

export const questionThree = (obj1, obj2) => {
  var obj1keys, obj2keys, x; 
  var newobject = {};
  obj1keys = Object.keys(obj1).sort()
  obj2keys = Object.keys(obj2).sort()
  if(obj1keys.length>=obj2keys.length){
    var length = obj1keys.length
    for(let i = 0; i< length; i++)
    {
      if(obj2keys.includes(obj1keys[i]) == true)
      {
        x = obj1keys[i]
        newobject[x] = true
      }
      else{
        x = obj1keys[i]
        newobject[x] = false
        }
    }
  }
    else{
      length = obj2keys.length
      for(let i = 0; i< length; i++)
      {
      if(obj1keys.includes(obj2keys[i]) == true)
      {
        x = obj2keys[i]
        newobject[x] = true
      }
      else{
        x = obj2keys[i]
        newobject[x] = false
        }
      }
    }
      return newobject;
  // // return; //return result
};

export const questionFour = (string) => {
  var split1
  var split2 = [];
  split1 = string.split('\n');
  for(var i = 0; i<split1.length; i++)
  {
      split2[i] = split1[i].split(',')
  }
  return split2; //return result
};

export const studentInfo = {
  firstName: 'Sparsh',
  lastName: 'Oza',
  studentId: '20016070'
};

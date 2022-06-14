export  function validate(input,arg) {

  if(arg==='description'&&!input[arg]){
    return '...Must have a description';
  }
  if(arg==='description'&&input[arg].length<200){
    return '...Must have 200 characters at least';
  }
  if(arg==='description'&&input[arg].length>200){
    return 'hidden';
  }
  
  
    if (!input[arg]) {
      return true;
    } else {
      return false;
    }  
   
  };
  
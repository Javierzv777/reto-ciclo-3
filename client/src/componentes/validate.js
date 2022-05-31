export  function validate(input,arg) {

  if(arg==='description'&&!input[arg]){
    return '...Debe tener una descripción';
  }
  if(arg==='description'&&input[arg].length<200){
    return '...La descripción debe tener al menos 200 caractere';
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
  
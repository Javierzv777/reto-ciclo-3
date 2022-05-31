
import createStyle from './createGame.module.css';
import {useState} from 'react';
import { createGame } from '../actions/actions';
import {connect} from 'react-redux';
import {validate} from './validate'
// this.dato3.push({value:''})
// this.dato3.splice(ind-1,1);


function CreateGame(props){
    const [content,setContent] =useState({
        name: '',
        image:'',
        description:'',
        platforms:[{name:''}],
        genres:[{name:''}]

     })
    const [alert, setAlert]=useState({
        name:true,
        image:true,
        description:'Debe tener una descripción',
        platforms:true,
        genres:true,
        redFlag:false,
        greenFlag:false
    })

    function handleOnClick(){
       
        if(alert.name===true||alert.image===true||alert.description!=='hidden'||alert.platforms===true||alert.genres===true){
            setAlert({...alert,redFlag:false})
            setAlert({...alert,redFlag:true})
        }else{
            props.createGame(content)
            .then(()=> setContent((oldState)=>({
                name: '',
            image:'',
            description:'',
            platforms:[{name:''}],
            genres:[{name:''}]
            })))
            setAlert({...alert,greenFlag:false})
            setAlert({...alert,greenFlag:true})
        }
    }
     function handleChange(e){
        setContent((oldState)=>({
            ...content,[e.target.name]:e.target.value
        }))
       setAlert({...alert,[e.target.name]:validate({
        ...content,[e.target.name]:e.target.value
       },e.target.name)})
    }

    function inputPlatforms(num){
        num&&setContent({...content,platforms:[...content.platforms,{name:'',}]})
        !num&&content.platforms.length>1&&setContent({...content,platforms:content.platforms.slice(0,-1)})
        // !num&&content.platforms.length===1&&setAlert({...alert,platforms:true})
    }
    function inputGenres(num){
        num&&setContent({...content,genres:[...content.genres,{name:'',}]})
        !num&&content.genres.length>1&&setContent({...content,genres:content.genres.slice(0,-1)})
        // !num&&content.genres.length===1&&setAlert({...alert,genres:true})
    }
    function handlePlatformsChange(e){
        const platforms = [...content.platforms];
        platforms[e.target.id][e.target.dataset.name] = e.target.value;
        setContent({...content,platforms:[...platforms]});
        setAlert({...alert,platforms:validate({
            ...content,platforms:e.target.value
           },'platforms')})
    }
    function handleGenresChange(e){
        const genres = [...content.genres];
        genres[e.target.id][e.target.dataset.name] = e.target.value;
        setContent({...content,genres:[...genres]});
        setAlert({...alert,genres:validate({
            ...content,genres:e.target.value
           },'genres')})
    }
    return (
            <div className={createStyle.container}>
            {alert.redFlag&&<div className={createStyle.redFlag}>
                Debe llenar todos los campos correctamente
            </div>}
            {alert.greenFlag&&<div className={createStyle.greenFlag}>
                Se ha creado un nuevo juego en la base de datos '
            </div>}
                <div className={createStyle.alert} style={alert.name?{visibility:'visible'}:{visibility:'hidden'}}>...debe tener un nombre</div>
                <div>
                    <span>Nombre: </span>
                    <input className={createStyle.input}
                        onChange={e=>handleChange(e)}
                        value={content.name}
                        name='name'
                        type="text"  placeholder='...nombre'/>
                </div>
                <div className={createStyle.alert} style={alert.image?{visibility:'visible'}:{visibility:'hidden'}}>...debe tener una imagen</div>
                <div>
                    <span>Imagen: </span>
                    <input className={createStyle.input}
                        value={content.image}
                        name='image'
                        onChange={e=>handleChange(e)}
                        type="text"  placeholder='...imagen'>
                  </input>    
                </div>
                <div className={createStyle.alert} style={alert.description!=='hidden'?{visibility:'visible'}:{visibility:'hidden'}}>{alert.description} </div>
                <div className={createStyle.description}>
                    <span className={createStyle.tagDescription} >Descripción: </span>   
                    <textarea className={createStyle.textarea} name="description" id="" cols="30" value={content.description} rows="10" placeholder='...descripción'
                        onChange={(e)=>handleChange(e)}
                        >
                    </textarea>
                </div>
                <div className={createStyle.inputPlatformsGenres}>                
                    <span  className={createStyle.inputPlatforms} >
                        <span>Plataformas: </span>
                        <button   onClick={()=>inputPlatforms(true)}>
                            +
                        </button>
                        <button   onClick={()=>inputPlatforms(false)}>
                            -
                        </button>
                        {content.platforms.map((e,i)=>{
                            return(
                                <div key={i}>
                                    <input
                                        type="text"
                                        name={`platforms-${i}`}
                                        id={i}
                                        data-name="name"
                                        value={e.name}
                                        onChange={(e)=>handlePlatformsChange(e)}
                                    />
                                </div>
                            )   
                        })}
                        <span className={createStyle.alert} style={alert.platforms?{visibility:'visible'}:{visibility:'hidden'}}>...debe tener al menos una plataformas</span>
                    </span>
                    <span className={createStyle.inputGenres} >                    
                        <span>Géneros: </span>
                        <button   onClick={()=>inputGenres(true)}>
                            +
                        </button>
                        <button   onClick={()=>inputGenres(false)}>
                            -
                        </button>
                    
                        {content.genres.map((e,i)=>{
                            return(
                                <div key={i}>
                                    <input
                                        type="text"
                                        name={`genres-${i}`}
                                        id={i}
                                        data-name="name"
                                        value={e.name}
                                        onChange={(e)=>handleGenresChange(e)}
                                    />
                                </div>
                            )   
                        })}
                         <span className={createStyle.alert} style={alert.genres?{visibility:'visible'}:{visibility:'hidden'}}>...debe tener al menos un género</span> 
                    </span>
                </div>    
                <span>
                    <button className={createStyle.submit} 
                        onClick={()=>handleOnClick()}
                        >
                        Crear
                    </button>
                </span>





                
            </div>
            )
    
}

export function mapStateToProps(state) {
    return {
      game: state.game,
    };
  }
  
  export function mapDispatchToProps(dispatch) {
    return {
        createGame:(g)=>dispatch(createGame(g))
    };
  }
  export default connect(mapStateToProps,mapDispatchToProps)(CreateGame)
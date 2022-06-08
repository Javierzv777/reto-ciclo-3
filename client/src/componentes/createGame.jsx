
import createStyle from './createGame.module.css';
import {useState, useEffect} from 'react';
import { createGame, getGenres, getPlatforms,updateGenres, updatePlatforms } from '../actions/actions';
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
        genres:[{name:''}],
        rating:[],
        released:''

     })
    const [alert, setAlert]=useState({
        name:true,
        image:false,
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
            .then(()=> {
                setContent((oldState)=>({
                    name: '',
                    image:'',
                    description:'',
                    platforms:[{name:''}],
                    genres:[{name:''}],
                    rating:[],
                    released:''
                }))
                setAlert(()=>({
                    name:true,
                    image:false,
                    description:'Debe tener una descripción',
                    platforms:true,
                    genres:true,
                    redFlag:false,
                    greenFlag:false
                }))
            })
            .then(()=>setAlert((oldAlert)=>{return {...oldAlert,greenFlag:true}}))
            
           
        }
    }
    useEffect(()=>{
        props.getGenres()
        props.getPlatforms()
    },[])
    function handleChangeReleased(e){
        setContent((oldState)=>({
            ...content,[e.target.name]:e.target.value
        }))
        
    }
     function handleChange(e){
        setContent((oldState)=>({
            ...content,[e.target.name]:e.target.value
        }))
        
       setAlert({...alert,[e.target.name]:validate({
        ...content,[e.target.name]:e.target.value
       },e.target.name)})
    }
    function handleChangeImage(e){
        setContent((oldState)=>({
            ...content,[e.target.name]:e.target.value
        }))
    }
    function handleOnChangeRating(e){
        setContent(()=>({
            ...content, [e.target.name]:[{score:e.target.value}]
        }))
    }
    function inputPlatforms(num){
        num&&setContent({...content,platforms:[...content.platforms,{name:'',}]})
        if(!num&&content.platforms.length>1){
            let aux=content.platforms[content.platforms.length-1].name
            if(aux){
                props.updatePlatforms([...props.platforms,{name:aux}])
            }
            setContent({...content,platforms:content.platforms.slice(0,-1)})
        }
    }
    function inputGenres(num){
        num&&setContent({...content,genres:[...content.genres,{name:'',}]})
        if(!num&&content.genres.length>1){
           
            let aux=content.genres[content.genres.length-1].name
            if(aux){
                props.updateGenres([...props.genres,{name:aux}])
            }
            setContent({...content,genres:content.genres.slice(0,-1)})
        }
        
    }
    function handlePlatformsChange(e){
        const platforms = [...content.platforms];
        let aux=content.platforms[e.target.id][e.target.dataset.name]
        props.updatePlatforms([...props.platforms.filter(platforms=>platforms.name!==e.target.value),{name:aux}])
        platforms[e.target.id][e.target.dataset.name] = e.target.value;
        setContent({...content,platforms:[...platforms]});
        setAlert({...alert,platforms:validate({
            ...content,platforms:e.target.value
           },'platforms')})
    }
    function handleGenresChange(e){
        const genres = [...content.genres];
        let aux=content.genres[e.target.id][e.target.dataset.name]
        props.updateGenres([...props.genres.filter(genre=>genre.name!==e.target.value),{name:aux}])
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
                        onChange={e=>handleChangeImage(e)}
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
                                <select  
                                 name={`platforms-${i}`}
                                 id={i}
                                 data-name="name"
                                 value={e.name} 
                                 onChange={(e)=>handlePlatformsChange(e)}>
                                
                                    <option disabled value=""  >__Plataformas
                                    </option>
                                    {[...props.platforms&&props.platforms.map((platforms,id)=>{
                                        return(<option key={id}
                                       
                                        
                                        >{platforms.name}
                                        </option>
                                        )
                                    })
                                    ,(<option key={props.platforms.length}
                                       
                                        
                                        >{e.name}
                                        </option>
                                        )]}
                                </select>
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
                                    <select  
                                     name={`genres-${i}`}
                                     id={i}
                                     data-name="name"
                                     value={e.name} 
                                     onChange={(e)=>handleGenresChange(e)}>
                                    
                                        <option disabled value=""  >__Géneros
                                        </option>
                                        {[...props.genres&&props.genres.map((genres,id)=>{
                                            return(<option key={id}
                                            >{genres.name}
                                            </option>
                                            )
                                        })
                                        ,(<option key={props.genres.length}
                                            >{e.name}
                                            </option>
                                            )]}
                                    </select>
                                </div>
                            )   
                        })}
                        
                         <span className={createStyle.alert} style={alert.genres?{visibility:'visible'}:{visibility:'hidden'}}>...debe tener al menos un género</span> 
                    </span>
                    <div className={createStyle.released}>
                        <label htmlFor="">lanzamiento:</label>
                        <div>
                            <input 
                            onChange={e=>handleChangeReleased(e)}
                            name='released'
                            value={content.released}
                            type="date" />
                        </div>
                    </div>
                    <div className={createStyle.starsRateInputs}>
                        <span>Rating:</span>
                        <div 
                        onChange={(e)=>handleOnChangeRating(e)}>
                            <label  >1.</label>
                            <input type="radio" value="1" name="rating" id="rate-5" />
                            <label  >2.</label>
                            <input type="radio" value="2" name="rating" id="rate-4" />
                            <label  >3.</label>
                            <input type="radio" value="3" name="rating" id="rate-3" />
                            <label  >4.</label>
                            <input type="radio" value="4" name="rating" id="rate-2" />
                            <label  >5.</label>
                            <input type="radio" value="5" name="rating" id="rate-1" />
                        </div>
                    </div>
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
      genres:state.genres,
      platforms:state.platforms
    };
  }
  
  export function mapDispatchToProps(dispatch) {
    return {
        createGame:(g)=>dispatch(createGame(g)),
        getGenres: (g)=>dispatch(getGenres(g)),
        getPlatforms: (p)=>dispatch(getPlatforms(p)),
        updateGenres:(arr)=>dispatch(updateGenres(arr)),
        updatePlatforms:(arr)=>dispatch(updatePlatforms(arr))
    };
  }
  export default connect(mapStateToProps,mapDispatchToProps)(CreateGame)
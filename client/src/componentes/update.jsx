
import updateStyle from './update.module.css';
import { updateDetails,getGame,getCacheGame,updateGame} from '../actions/actions';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom'
import {useState} from 'react'
import { validate } from './validate';


function Update(props){

    const [alert, setAlert]=useState({
        name:false,
        image:false,
        description:'hidden',
        platforms:false,
        genres:false,
        redFlag:false,
        greenFlag:false
    })

    let history=useHistory()
    function handleUpdate(){

        if(alert.name===true||alert.image===true||alert.description!=='hidden'||alert.platforms===true||alert.genres===true){
            
            setAlert({...alert,redFlag:false})
            setAlert({...alert,redFlag:true})

        }else{
            props.updateGame(props.game,props.game.id)
            setAlert({...alert,greenFlag:false})
            setAlert({...alert,greenFlag:true})
   
        }
    }
    function handleCancel(){
        props.getCache()
        
        history.goBack()
    }
    function handleChange(e){
        props.updateDetails({...props.game,[e.target.name]:e.target.value })

        setAlert({...alert,[e.target.name]:validate({
            ...props.game,[e.target.name]:e.target.value
           },e.target.name)})
    }

    function inputPlatforms(num){
        num&&props.updateDetails({...props.game,platforms:[...props.game.platforms,{name:''}]})
        !num&&props.game.platforms.length>1&&props.updateDetails({...props.game,platforms:props.game.platforms.slice(0,-1)})
    }
    function inputGenres(num){
        num&&props.updateDetails({...props.game,genres:[...props.game.genres,{name:''}]})
        !num&&props.game.genres.length>1&&props.updateDetails({...props.game,genres:props.game.genres.slice(0,-1)})
    }
    function handlePlatformsChange(e){
        const platforms = [...props.game.platforms];
        platforms[e.target.id][e.target.dataset.name] = e.target.value;
        props.updateDetails({...props.game,platforms:[...platforms]});
        // validate
        setAlert({...alert,platforms:validate({
            ...props.game,platforms:e.target.value
           },'platforms')})
    }
    function handleGenresChange(e){
        const genres = [...props.game.genres];
        genres[e.target.id][e.target.dataset.name] = e.target.value;
        props.updateDetails({...props.game,genres:[...genres]});
            // validate
        setAlert({...alert,genres:validate({
            ...props.game,genres:e.target.value
           },'genres')})
    }
    return (
        <div>

            {alert.redFlag&&<div className={updateStyle.redFlag}>
                Debe llenar todos los campos correctamente
            </div>}
            {alert.greenFlag&&<div className={updateStyle.greenFlag}>
                Se ha producido una actualización en '{props.game.name}'
            </div>}
            { props.game && ( <div className={updateStyle.container}>
                <div className={updateStyle.alert} style={alert.name?{visibility:'visible'}:{visibility:'hidden'}}>...debe tener un nombre</div>
                    
                    <div>
                        <span>Nombre: </span>
                        <input className={updateStyle.input}
                            onChange={e=>handleChange(e)}
                            value={props.game.name}
                            name='name'
                            type="text"  placeholder='...nombre'/>
                    </div>
                    <div className={updateStyle.alert} style={alert.image?{visibility:'visible'}:{visibility:'hidden'}}>...debe tener una imagen</div>
                    <div>
                        <span>Imagen: </span>
                        <input className={updateStyle.input}
                            value={props.game.image}
                            name='image'
                            onChange={e=>handleChange(e)}
                            type="text"  placeholder='...imagen'>
                    </input>    
                    </div>
                    <div className={updateStyle.alert} style={alert.description!=='hidden'?{visibility:'visible'}:{visibility:'hidden'}}>{alert.description} </div>
                    <div className={updateStyle.description}>
                        <span className={updateStyle.tagDescription} >Descripción: </span>   
                        <textarea className={updateStyle.textarea} name="description" id="" cols="30" value={props.game&&props.game.description&&props.game.description.replace(/<[^>]+>/g, '')} rows="10" placeholder='...descripción'
                           onChange={(e)=>handleChange(e)}
                            >
                        </textarea>
                    </div>
                    <span  className={updateStyle.inputPlatforms} >
                        <span>Plataformas: </span>
                        <button   onClick={()=>inputPlatforms(true)}>
                            +
                        </button>
                        <button   onClick={()=>inputPlatforms(false)}>
                            -
                        </button>
                    

                        {props.game&&props.game.platforms&&props.game.platforms.map((e,i)=>{
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
                        <span className={updateStyle.alert} style={alert.platforms?{visibility:'visible'}:{visibility:'hidden'}}>...debe tener al menos una plataformas</span>
                    </span>
                    <span className={updateStyle.inputGenres} >
                        <span>Géneros: </span>
                        <button   onClick={()=>inputGenres(true)}>
                            +
                        </button>
                        <button   onClick={()=>inputGenres(false)}>
                            -
                        </button>
                    
                        {props.game&&props.game.genres&&props.game.genres.map((e,i)=>{
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
                        <span className={updateStyle.alert} style={alert.genres?{visibility:'visible'}:{visibility:'hidden'}}>...debe tener al menos un género</span> 
                    </span>
                    <span className={updateStyle.submit} >
                        <div>
                            <button 
                                 className={updateStyle.button}
                                onClick={()=>handleUpdate()}
                                >
                                Actualizar
                            </button>
                        </div>
                        <div>
                            <button 
                                className={updateStyle.button}
                                onClick={()=>handleCancel()}
                                >
                                Cancelar
                            </button>
                        </div>
                    </span>
                </div>
            )}
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
        updateDetails:(g)=>dispatch(updateDetails(g)),
        getGame:(g)=>dispatch(getGame(g)),
        getCache:()=>dispatch(getCacheGame()),
        updateGame:(g,id)=>dispatch(updateGame(g,id))
    };
  }
  export default connect(mapStateToProps,mapDispatchToProps)(Update)
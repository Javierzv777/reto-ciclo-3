
import updateStyle from './update.module.css';
// import {useState} from 'react';
import { updateDetails,getGame,getCacheGame,updateGame} from '../actions/actions';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom'

// this.dato3.push({value:''})
// this.dato3.splice(ind-1,1);


function Update(props){
    // const [content,setContent] =useState({
    //     name: props.game&&props.game.name,
    //     image:props.game&&props.game.image,
    //     description:'',
    //     platformsInput:[],
    //     genresInput:[],
    //     platforms:[{value:''}],
    //     genres:[{value:''}]

    //  })
    let history=useHistory()
    function handleUpdate(){
        props.updateGame(props.game,props.game.id)
    }
    function handleCancel(){
        props.getCache()
        
        history.goBack()
    }
    function handleChange(e){
        props.updateDetails({...props.game,[e.target.name]:e.target.value })
    }

    function inputPlatforms(num){
        num&&props.updateDetails({...props.game,platforms:[...props.game.platforms,{name:''}]})
        !num&&props.updateDetails({...props.game,platforms:props.game.platforms.slice(0,-1)})
    }
    function inputGenres(num){
        num&&props.updateDetails({...props.game,genres:[...props.game.genres,{name:''}]})
        !num&&props.updateDetails({...props.game,genres:props.game.genres.slice(0,-1)})
    }
    function handlePlatformsChange(e){
        const platforms = [...props.game.platforms];
        platforms[e.target.id][e.target.dataset.name] = e.target.value;
        props.updateDetails({...props.game,platforms:[...platforms]});
    }
    function handleGenresChange(e){
        const genres = [...props.game.genres];
        genres[e.target.id][e.target.dataset.name] = e.target.value;
        props.updateDetails({...props.game,genres:[...genres]});
    }
    return (
        <div>
            { props.game && ( <div className={updateStyle.container}>
                    <div>
                        <span>Nombre: </span>
                        <input className={updateStyle.input}
                            onChange={e=>handleChange(e)}
                            value={props.game.name}
                            name='name'
                            type="text"  placeholder='...nombre'/>
                    </div>
                    <div>
                        <span>Imagen: </span>
                        <input className={updateStyle.input}
                            value={props.game.image}
                            name='image'
                            onChange={e=>handleChange(e)}
                            type="text"  placeholder='...imagen'>
                    </input>    
                    </div>
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
                    

                        {props.game.platforms.map((e,i)=>{
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
                    </span>
                    <span className={updateStyle.inputGenres} >
                        <span>Géneros: </span>
                        <button   onClick={()=>inputGenres(true)}>
                            +
                        </button>
                        <button   onClick={()=>inputGenres(false)}>
                            -
                        </button>
                    
                        {props.game.genres.map((e,i)=>{
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
                    </span>
                    <span className={updateStyle.submit} >
                        <div>
                            <button 
                                onClick={()=>handleUpdate()}
                                >
                                Actualizar
                            </button>
                        </div>
                        <div>
                            <button 
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
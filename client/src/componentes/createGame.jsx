
import createStyle from './createGame.module.css';
import {useState} from 'react';
import { createGame } from '../actions/actions';
import {connect} from 'react-redux';

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

    function handleOnClick(){
        props.createGame(content)
        .then(()=> setContent((oldState)=>({
            name: '',
        image:'',
        description:'',
        platforms:[{name:''}],
        genres:[{name:''}]
        })))
       
    }
    function handleChange(e){
        setContent((oldState)=>({
            ...content,[e.target.name]:e.target.value
        }))
    }

    function inputPlatforms(num){
        num&&setContent({...content,platforms:[...content.platforms,{name:'',}]})
        !num&&setContent({...content,platforms:content.platforms.slice(0,-1)})
    }
    function inputGenres(num){
        num&&setContent({...content,genres:[...content.genres,{name:'',}]})
        !num&&setContent({...content,genres:content.genres.slice(0,-1)})
    }
    function handlePlatformsChange(e){
        const platforms = [...content.platforms];
        platforms[e.target.id][e.target.dataset.name] = e.target.value;
        setContent({...content,platforms:[...platforms]});
    }
    function handleGenresChange(e){
        const genres = [...content.genres];
        genres[e.target.id][e.target.dataset.name] = e.target.value;
        setContent({...content,genres:[...genres]});
    }
    return (
            <div className={createStyle.container}>
                <div>

                    <span>Nombre: </span>
                    <input className={createStyle.input}
                        onChange={e=>handleChange(e)}
                        value={content.name}
                        name='name'
                        type="text"  placeholder='...nombre'/>
                        
                   
                </div>

                <div>
                    <span>Imagen: </span>
                    <input className={createStyle.input}
                        
                        name='image'
                        onChange={e=>handleChange(e)}
                        type="text"  placeholder='...imagen'>
                  </input>    
                </div>
                <div className={createStyle.description}>
                    <span className={createStyle.tagDescription} >Descripción: </span>   
                    <textarea className={createStyle.textarea} name="description" id="" cols="30" value={content.description} rows="10" placeholder='...descripción'
                        onChange={(e)=>handleChange(e)}
                        >
                    </textarea>
                </div>
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
                                       value={e.nombre}
                                    onChange={(e)=>handleGenresChange(e)}
                                />
                            </div>
                        )   
                    })}

                </span>
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
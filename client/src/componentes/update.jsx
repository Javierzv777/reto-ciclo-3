
import updateStyle from './update.module.css';
import {useState} from 'react'

// this.dato3.push({value:''})
// this.dato3.splice(ind-1,1);


function Update(props){
    const [content,setContent] =useState({
        name: '',
        image:'',
        description:'',
        platformsInput:[],
        genresInput:[],
        platforms:[{value:''}],
        genres:[{value:''}]

     })
    function handleOnClick(){

    }
    function handleChange(e){
        setContent((oldState)=>({
            ...content,[e.target.name]:e.target.value
        }))
    }
    // setState((prevState) => ({ 
    //     stateName: prevState.stateName + 1 
    //  }))
    function inputPlatforms(num){
        num&&setContent({...content,platforms:[...content.platforms,{value:''}]})
        !num&&setContent({...content,platforms:content.platforms.slice(0,-1)})
    }
    function inputGenres(num){
        num&&setContent({...content,genres:[...content.genres,{value:''}]})
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
            <div className={updateStyle.container}>
                <div>

                    <span>Nombre: </span>
                    <input className={updateStyle.input}
                        onChange={e=>handleChange(e)}
                        name='name'
                        type="text"  placeholder='...nombre'/>
                        
                   
                </div>

                <div>
                    <span>Imagen: </span>
                    <input className={updateStyle.input}
                        name='image'
                        onChange={e=>handleChange(e)}
                        type="text"  placeholder='...imagen'>
                  </input>    
                </div>
                <div className={updateStyle.description}>
                    <span className={updateStyle.tagDescription} >Descripción: </span>   
                    <textarea className={updateStyle.textarea} name="description" id="" cols="30" value={content.description} rows="10" placeholder='...descripción'
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
                <span className={updateStyle.inputGenres} >
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
                    <button className={updateStyle.submit} 
                        onClick={()=>handleOnClick()}
                        >
                        Actualizar
                    </button>
                </span>
                




                
            </div>
            )
    
}

export default Update
import searchBarStyle from './searchBar.module.css';
import {useState} from 'react'




function SearchBar(props){
    
    const [content,setContent] =useState({
       data: '',
    })

    const {handleSubmit}= props

    const handleChange= function (e){
        setContent({
           data : e.target.value
        })
     }
    const handleOnClick=(e)=>{
        handleSubmit(content,e)
    }
    return  (
            
            <div className={searchBarStyle.padding}>

                      <form action="" onSubmit={(e)=>handleOnClick(e)}>
                        <input className={searchBarStyle.input}
                            onChange={e=>handleChange(e)}
                            type="text"  placeholder={props.placeHolder}></input>
                        <button className={searchBarStyle.button} 
                            onClick={(e)=>handleOnClick(e)}
                            >
                                {props.searchButton}
                        </button>
                    </form> 


            </div>
            )
    
}

export default SearchBar
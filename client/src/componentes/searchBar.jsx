import searchBarStyle from './searchBar.module.css';
import {useState} from 'react'




function SearchBar(props){
    
    const [content,setContent] =useState({
       data: '',
    })

    const {handleSubmit}= props
    const handleChange= function (e){
        setContent({
           data:e.target.value
        })
     }
    const handleOnClick=()=>{
        handleSubmit(content)
    }
    return  (
            
            <div className={searchBarStyle.padding}>
                       
                    <input className={searchBarStyle.input}
                        onChange={e=>handleChange(e)}
                        type="text"  placeholder={props.placeHolder}></input>
                    <button className={searchBarStyle.button} 
                        onClick={()=>handleOnClick()}
                        >
                            {props.searchButton}
                    </button>


            </div>
            )
    
}

export default SearchBar
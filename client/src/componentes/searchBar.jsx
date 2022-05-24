import searchBarStyle from './searchBar.module.css';

function SearchBar(props){
    return  (
            
            <div className={searchBarStyle.padding}>
                <input className={searchBarStyle.input} type="text"  placeholder='...Buscar Juegos'></input>
                <span className={searchBarStyle.button} >Buscar</span>
                


            </div>
            )
    
}

export default SearchBar
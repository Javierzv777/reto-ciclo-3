import GamesStyle from './games.module.css';
import SearchBar from './searchBar';

function Detail(props) {
    return (
        <div className={GamesStyle.games}>
            <div className={GamesStyle.searchBar}>
            <SearchBar />
            </div>
            <div className={GamesStyle.searchBar}>
            <SearchBar />
            </div>
            <div className={GamesStyle.searchBar}>
            <SearchBar />
            </div>
        </div>
    )

}

export default Detail
import React, {useEffect, useState} from 'react';
import './App.css';
import Tmdb  from './tmdb';
import MovieRow from './components/movieRow/index';
import FeaturedMovie from './components/featuredMovie/index';
import Header from './components/header/index';


export default () => {

  const [movieList, setMovieList] = useState([]);
  const [FeaturedData, setFeaturesData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    const loadAll = async() =>{
        //Pegando a lista Total
        let list = await Tmdb.getHomeList();
        setMovieList(list);

        //pegando o featured
        let originals = list.filter(i=>i.slug === 'originals');
        let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
        let chosen = originals[0].items.results[randomChosen];
        let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
        setFeaturesData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(()=>{
    const scrollListener= () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    } 

    window.addEventListener('scroll', scrollListener);

    return () => {
    window.removeEventListener('scroll', scrollListener);

    }
  }, []);

  return (
    <div className="page">

      <Header black={blackHeader}/>

      {FeaturedData && 
      <FeaturedMovie item={FeaturedData}/>
      }

      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items} />
        )
        )}
      </section>

      <footer>
        Feito com carinho! <br />
        Direitos de imagem para Netflix <br />
        Dados pegos do site themoviedb.org
      </footer>
      
      {movieList.length <= 0 &&
        <div className='loading'>
          <img src='https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif' alt="Carregando" />
        </div>
      }

    </div>
  );
}

import React, {Component} from 'react';
import {render} from 'react-dom';
import { Router, Route, Switch, Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
const customHistory = createBrowserHistory()

import { Container, Row, Col, Button } from 'reactstrap';

import PokemonDetail from './PokemonDetail';
import Pokemon from './Pokemon';
import PokemonClass from '../PokemonClass';

export default class PokemonApp extends Component{

  constructor(props){
    super(props);
    this.state = {
      page: 0,
      species : [],
      fetched : false,
      loading : false,
      pokemon: {},
    };

   this.onLoadMore = this.onLoadMore.bind(this);
   this.handleOnClick = this.handleOnClick.bind(this);

  }
  
  componentWillMount(){
    this.setState({
      loading : true,
      page: 20,
    });
  }

  componentDidMount() {
    this.fetch();
  }

  onLoadMore () {
    this.fetch();
  }

  fetch() {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${this.state.page}`).then(res => res.json())
    .then(response => {
      this.setState(prevState => ({
        page: prevState.page + 20,
        species : response.results,
        loading : true,
        fetched : true,
      }));
    });
  }

  handleOnClick(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(res => res.json())
      .then(data => {
        const pokemon = new PokemonClass(data);
        this.setState(prevState => ({
          loading : true,
          fetched : true,
          pokemon,
        }));
        
      })
      .catch(err => console.log(err));
  }
  

  render(){
    const PokemonList = ({ handleOnClick }) => {
      
      const {fetched, loading, species} = this.state;
      let content;
      if(fetched){
        content = <Col>
        <div className="pokemon-list">{species.map((pokemon,index) => 
          <Link to={`/pokemon/${pokemon.name}`} key={pokemon.name} >
            <Pokemon key={pokemon.name} id={index+1} pokemon={pokemon} handleOnClick={this.handleOnClick}/>
          </Link>)}
        </div>
        <Button color="primary" onClick={this.onLoadMore}>Carregar Mais</Button>
        </Col>
      }else if(loading && !fetched){
          content = <div className="loader"></div>;
      }
      else{
        content = <div/>;
      }
      return  <div>
        {content}
      </div>;
    }

    return <div className="pokemonapp">
      <h1 className="display-3 text-center"> Lista Pokemons </h1>
      <Router history={customHistory}>
        <Switch>
          <Route exact path='/' component={PokemonList} handleOnClick={this.handleOnClick} />
          <Route exact path='/pokemon/:name' component={() => <PokemonDetail pokemon={this.state.pokemon}/>}/>
        </Switch>
      </Router>
    </div>;
  }
}
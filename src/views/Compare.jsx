import React, { Component } from 'react';

import _ from 'lodash';

import store from './../store';
import { startLoading, stopLoading } from './../actions';

import RadarStats from './../components/RadarStats';
import Card from './../components/Card';
import { PokemonService } from './../common/api.service';

export default class Compare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemonList: [],
            pokemonSelected: { name: '' },
            pokemonToCompare: [],
            selectedPokemonDetail: { stats: [], types: [] },
            limitData: 10, // limit pokemon data
            totalPower: 0
        }
    }

    // Looping get pokemon detail
    getPokemonList = () => {
        for (let i = 1; i <= this.state.limitData; i ++) {
            this.getPokemonDetail(i)
        }
    }

    // Get Pokemon detail by api pokedex
    getPokemonDetail = (id) => {
        // Set message for loading component
        store.dispatch(startLoading('Get Pokemon List . . .'));

        // Fetching data with axios
        PokemonService.pokemonDetail(id)
        .then((res) => { 
            this.setState({ 
                pokemonList: [
                    ...this.state.pokemonList,
                    { 
                        id: res.data.id,
                        name: res.data.name,
                        image: res.data.sprites.front_default,
                        base_experience: res.data.base_experience,
                        height: res.data.height,
                        weight: res.data.weight,
                        stats: {
                            hp: _.find(res.data.stats, ['stat.name', 'hp']).base_stat,
                            attack: _.find(res.data.stats, ['stat.name', 'attack']).base_stat,
                            defense: _.find(res.data.stats, ['stat.name', 'defense']).base_stat,
                            special_attack: _.find(res.data.stats, ['stat.name', 'special-attack']).base_stat,
                            special_defense: _.find(res.data.stats, ['stat.name', 'special-defense']).base_stat,
                            speed: _.find(res.data.stats, ['stat.name', 'speed']).base_stat,
                        },
                        types: _.map(res.data.types, (o) => { return o.type.name })
                    }
                ]
            }, () => {
                // condition when state of pokemon list reach the limit data
                if (this.state.pokemonList.length === this.state.limitData) {
                    // add power attribute by sum up all stats
                    const pokemonList = _.map(this.state.pokemonList, (o) => {
                        o.power = o.stats.hp + o.stats.attack + o.stats.special_attack + o.stats.defense + o.stats.special_defense + o.stats.speed;
                        
                        return o;
                    })
                    // Sorting state by name ascending
                    this.setState({ pokemonList: _.sortBy(pokemonList, 'name') })
                    // hide loading component
                    store.dispatch(stopLoading())
                }
            })
        })
    }

    componentDidMount () {
        this.getPokemonList();
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: _.find(this.state.pokemonList, ['name', e.target.value]) });
    }

    // add item to pokemonToCompare state by click Add to Compare button
    handleAddPokemon = () => {
        this.setState({ 
            pokemonToCompare: [...this.state.pokemonToCompare, this.state.pokemonSelected], 
            pokemonSelected: { name: ''},
            totalPower: this.state.totalPower + this.state.pokemonSelected.power
        })
    }

    // remove item from pokemonToCompare state by click Close button inside card's component
    handleRemovePokemon = (id) => {
        _.remove(this.state.pokemonToCompare, (pokemon) => { return pokemon.id === id })
        this.setState({ pokemonToCompare: this.state.pokemonToCompare })
    }

    render () {
        const { pokemonList, pokemonToCompare, pokemonSelected, totalPower } = this.state;

        return (
            <div className="content">
                <div className="row">
                    {/* Pokemon List */}
                    <div className="col-md-3">
                        <h4 className="card-title text-capitalize mt-4">Select Pokemon</h4>
                        <select name="pokemonSelected" value={pokemonSelected.name} className="form-control text-capitalize" onChange={this.handleChange}>
                            <option value="">Select</option>
                            {pokemonList.map((values, key) => 
                                <option key={key} value={values.name} disabled={_.find(pokemonToCompare, {name: values.name})}>{values.name}</option>
                            )}
                        </select>
                        <button className="btn btn-primary btn-block mt-2 mb-2" onClick={this.handleAddPokemon} disabled={pokemonSelected.name === '' || pokemonToCompare.length === 4}>Add to Compare</button>
                        <p>You can compare pokemon by their stats ability, it will give you information about win rate prediction.</p>
                        <p className="font-italic small">*max 4 pokemon</p>
                    </div>

                    {/* Display Chart */}
                    <div className="col-md-6">
                        <RadarStats datasets={pokemonToCompare} />
                    </div>
                    
                    {/* Win Rate Prediction */}
                    <div className="col-md-3">
                        <table className="table small table-striped mt-4">
                            <thead>
                                <tr>
                                    <th>Pokemon</th>
                                    <th>Power</th>
                                    <th>Win Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {_.orderBy(pokemonToCompare, ['power'], ['desc']).map((values, key) =>
                                    <tr key={key}>
                                        <td className="text-capitalize">{values.name}</td>
                                        <td>{values.power}</td>
                                        <td>{_.round(values.power / totalPower * 100)}%</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Selected Pokemon */}
                <div className="row">
                    {pokemonToCompare.map((values, key) =>
                        <Card key={key} isCloseAble={true} values={values} handleRemovePokemon={() => this.handleRemovePokemon(values.id)} />
                    )}
                </div>
            </div>
        )
    }
}
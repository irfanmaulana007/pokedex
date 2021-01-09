import React, { Component } from 'react';

import _ from 'lodash';

import store from '../store';
import { startLoading, stopLoading } from '../actions';

import { PokemonService } from '../common/api.service';
import Card from '../components/Card';
import ModalDetail from '../components/ModalDetail';

export default class Browse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limitDataList: [10, 20, 50, 100],
            limitData: 10, // initiate limit data
            pokemonList: [],
            pokemonFilteredList: [],
            selectedPokemonDetail: { stats: [], types: [] },
            typeList: [],
            selectedType: 'all',
            isModalShow: false
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
                this.setState({ pokemonFilteredList: this.state.pokemonList })
                // hide loading component if list of pokemon react the limit data
                if (this.state.pokemonList.length === this.state.limitData) { store.dispatch(stopLoading()) }
            })
        })
    }

    // Get list of type for filter
    getTypeList = () => {
        PokemonService.typeList()
        .then((res) => { this.setState({ typeList: _.sortBy(res.data.results, 'name') }) })
    }

    componentDidMount () {
        this.getPokemonList();
        this.getTypeList();
    }

    // Function for handling limit data
    handleChangeLimit = (e) => {
        this.setState({ pokemonList: [], limitData: parseInt(e.target.value), selectedType: 'all' }, () => {
            this.getPokemonList();
        })
    }

    handleChangeType = (e) => {
        const type = e.target.value;
        let pokemonList;

        this.setState({ selectedType: type, pokemonFilteredList: this.state.pokemonList }, () => {
            // if selected type is 'all', return default state
            if (type === 'all') {
                pokemonList = this.state.pokemonList;
            }
            else {
                // filter pokemon type with lodash
                pokemonList = _.filter(this.state.pokemonList, (o) => {
                    return _.includes(o.types, type)
                })
            }
    
            this.setState({ pokemonFilteredList: pokemonList })
        })
        
    }

    handleShowModal = (id) => {
        this.setState({
            // set selectedPokemonDetail state by user's click/select
            selectedPokemonDetail: _.find(this.state.pokemonList, {'id': id}),
            isModalShow: true
        });
    }
    handleCloseModal = () => { this.setState({ isModalShow: false }) }

    render () {
        const { limitDataList, limitData, pokemonFilteredList, selectedType, selectedPokemonDetail, typeList, isModalShow } = this.state;

        return (
            <div className="content">
                <div className="row">
                    <div className="col">
                        {/* Filter Type Component */}
                        <div className="form-group pull-right ml-3 mr-3">
                            <label htmlFor="">Filter Type</label>
                            <select name="selectedType" value={selectedType} className="form-control text-capitalize" onChange={this.handleChangeType}>
                                <option value="all">All</option>
                                {typeList.map((values, key) =>
                                    <option key={key} value={values.name}>{values.name}</option>
                                )}
                            </select>
                        </div>

                        {/* Limit Data Component */}
                        <div className="form-group pull-right ml-3 mr-3">
                            <label htmlFor="">Limit Data</label>
                            <select name="limitData" value={limitData} className="form-control" onChange={this.handleChangeLimit}>
                                {limitDataList.map((values, key) =>
                                    <option key={key} value={values}>{values}</option>
                                )}
                            </select>
                        </div>
                    </div>
                </div>
                
                {/* Pokemon List */}
                <div className="row">
                    {pokemonFilteredList.map((values, key) =>
                        <Card key={key} provideDetail={true} handleShowModal={this.handleShowModal} values={values} onClick={() => this.handleShowModal(values.id)} />
                    )}
                </div>
                
                {/* Modal Component to view pokemon's detail */}
                <ModalDetail selectedPokemonDetail={selectedPokemonDetail} isModalShow={isModalShow} handleCloseModal={this.handleCloseModal} />
            </div>
        )
    }
}
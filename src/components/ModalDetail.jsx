import React, { Component } from 'react';

import Skeleton from 'react-loading-skeleton';
import Modal from 'react-bootstrap/Modal';

import RadarStats from './RadarStats';

export default class ModalDetail extends Component {
    render () {
        return (
            <Modal id="modal" size="lg" show={this.props.isModalShow} onHide={this.props.handleCloseModal}>
                <Modal.Header closeButton className="border-0">
                    <Modal.Title className="text-capitalize">{this.props.selectedPokemonDetail.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6">
                            {/* write types of pokemon by looping */}
                            <div className="row">
                                {this.props.selectedPokemonDetail.types.map((values, key) =>
                                    <div key={key} className="col text-center">
                                        <span className="text-capitalize"><i className="fa fa-circle"></i> {values}</span>
                                    </div>
                                )}
                            </div>
                            <img className="card-img-top" src={this.props.selectedPokemonDetail.image} alt={this.props.selectedPokemonDetail.name} />
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col">
                                    <label className="small text-muted mb-0 text-capitalize">height</label>
                                    <h4>{this.props.selectedPokemonDetail.height || <Skeleton />} ft</h4>
                                </div>
                                <div className="col">
                                    <label className="small text-muted mb-0 text-capitalize">weight</label>
                                    <h4>{this.props.selectedPokemonDetail.weight || <Skeleton />} lbs</h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label className="small text-muted mb-0 text-capitalize">base experience</label>
                                    <h4>{this.props.selectedPokemonDetail.base_experience || <Skeleton />}</h4>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="small text-muted mb-0 text-capitalize">hp</label>
                                    <h4>{this.props.selectedPokemonDetail.stats.hp}</h4>
                                </div>
                                <div className="col-md-6">
                                    <label className="small text-muted mb-0 text-capitalize">speed</label>
                                    <h4>{this.props.selectedPokemonDetail.stats.speed}</h4>
                                </div>
                                <div className="col-md-6">
                                    <label className="small text-muted mb-0 text-capitalize">attack</label>
                                    <h4>{this.props.selectedPokemonDetail.stats.attack}</h4>
                                </div>
                                <div className="col-md-6">
                                    <label className="small text-muted mb-0 text-capitalize">special attack</label>
                                    <h4>{this.props.selectedPokemonDetail.stats.special_attack}</h4>
                                </div>
                                <div className="col-md-6">
                                    <label className="small text-muted mb-0 text-capitalize">defense</label>
                                    <h4>{this.props.selectedPokemonDetail.stats.defense}</h4>
                                </div>
                                <div className="col-md-6">
                                    <label className="small text-muted mb-0 text-capitalize">special defense</label>
                                    <h4>{this.props.selectedPokemonDetail.stats.special_defense}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {/* Chart Component */}
                            <RadarStats datasets={[this.props.selectedPokemonDetail]} />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}
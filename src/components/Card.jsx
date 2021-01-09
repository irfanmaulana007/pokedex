import React, { Component } from 'react';

import './Card.css';

export default class Card extends Component {
    render () {
        return (
            <div className="col-md-3 col-6 mt-4">
                <div className={`card ${(this.props.provideDetail) && 'cursor-pointer'}`} onClick={this.props.onClick}>
                    {/* Show close button if props.isCloseAble = true */}
                    { (this.props.isCloseAble) && <button className="btn btn-outline-danger btn-sm card-close" onClick={this.props.handleRemovePokemon}><i className="fa fa-times"></i></button> }
                    <img className="card-img-top" src={this.props.values.image} alt={this.props.values.name} />
                    <div className="card-body">
                        <h4 className="card-title text-capitalize">{this.props.values.name}</h4>
                    </div>
                </div>
            </div>
        )
    }
}
import React from 'react'
import Loader from 'react-loader-spinner'
import './Loaders.css'

class Loaders extends React.Component {
	render() {
		return (
			<div id="loaders" className={this.props.display}>
				<div className="loaders">
					<center>
				    	<Loader
				    		className="asdf"
				    		type="Puff"
				    		color="#337abd"
				    		height="100" 
				    		width="100"
				    	/>
					</center>
			    	<br/>
			    	<h6 className="text-white text-center">{this.props.message}</h6>
				</div>
			</div>
		)
	}
}

export default Loaders
import React from 'react';

export class SubComponent extends React.Component {
	render() {
		return (
			<p>{this.props.name}</p>
		);
	}
}

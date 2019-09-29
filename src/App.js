import React from 'react';
import people from './api/people';
import parser from 'fast-xml-parser';
import merge from 'deepmerge';
import axios from 'axios';
import filters from './filters/filters';

import ListPersons from './components/ListPersons';

class App extends React.Component {
	state = {
		sort: {
			fieldName: 'id',
			order: 'asc',
		},
	};

	componentDidMount() {
		// fetch xml and json data
		this.getData();
	}

	getData = async () => {
		axios.all([
			// json api with a 5 sec time delay
			people.get('/v2/5d8e76f631000059ca2b54db?mocky-delay=5000ms'),
			// xml api with 15 sec time delay
			people.get('/v2/5d8e72be31000058ca2b54d5?mocky-delay=15000ms'),
		])
			.then(response => {
				const json = response[0].data;
				const xml = parser.parse(response[1].data);
				return merge(json, xml.persons);
			})
			.then(response => this.setState({ ...response }));
	};

	render() {
		return (
			<div className="ui container" style={{ marginTop: '30px' }}>
				<div>
					<ListPersons persons={filters(this.state.person, this.state.sort)} />
				</div>
			</div>
		);
	}
}

export default App;

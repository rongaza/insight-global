import React from 'react';
import Spinner from './Spinner';
import faker from 'faker';

const ListPersons = props => {
	const renderPerson = () => {
		if (props.persons.length > 0) {
			return props.persons.map(person => {
				return (
					<div key={person.id} className="ui cards">
						<div className="card">
							<div className="content">
								<a href="/" className="right floated mini ui image">
									<img alt="avatar" src={faker.image.avatar()} />
								</a>
								<div className="header">
									{person.firstName} {person.lastName}
								</div>
								<div className="meta">Number: {person.id}</div>
								<div className="description">
									{person.firstName} is a {faker.name.jobTitle()}{' '}
									at {faker.company.companyName()}
								</div>
							</div>
						</div>
					</div>
				);
			});
		}
		return <Spinner message={'Loading list of names...'} />;
	};

	return <div>{renderPerson()}</div>;
};

export default ListPersons;

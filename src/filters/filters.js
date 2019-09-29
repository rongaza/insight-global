import _ from 'lodash';

export default (data, sort) => {
	return _.orderBy(data, [sort.fieldName], [sort.order]);
};

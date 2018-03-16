import { connect } from 'react-redux';

import { loadStudios } from 'actions';
import { getIsLoading, getSortedByPrice } from 'reducers';
import ReloadControl from 'components/ReloadControl';

const mapStateToProps = state => ({
  isVisible: !getIsLoading(state) && getSortedByPrice(state).length,
});

export default connect(mapStateToProps, {
  onReloadClick: loadStudios,
})(ReloadControl);

import { RotatingLines } from 'react-loader-spinner';
import PropTypes from 'prop-types';

import css from './Loader.module.css';

export const Loader = ({isLoading}) => {
    return (
        <div className={css.spiner}>
          <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="30"
              visible={isLoading}
          />
        </div>
    );
};

Loader.propTypes = {
    isLoading: PropTypes.bool.isRequired,
};
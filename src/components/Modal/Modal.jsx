import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

import css from './Modal.module.css';

ReactModal.setAppElement('#root');

export const ModalComponent = ({showModal, onRequestClose, imgLink, alt}) => {
    return (   
        <ReactModal 
           isOpen={showModal}
           onRequestClose={onRequestClose}
           className={css.modal}
           overlayClassName={css.overlay}
        >
          <img src={imgLink} alt={alt} />
        </ReactModal>
    );
};

ModalComponent.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  imgLink: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
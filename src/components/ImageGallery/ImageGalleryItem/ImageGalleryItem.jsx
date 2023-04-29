import PropTypes from 'prop-types';

import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({imgLink, alt, onClick, id}) => {
    return (
        <li
            onClick={onClick}
            className={css['gallery-item']}
        >
            <img src={imgLink} alt={alt} id={id}/>
        </li>
    );
};

ImageGalleryItem.propTypes = {
    imgLink: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
};
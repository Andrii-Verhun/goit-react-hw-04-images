import PropTypes from 'prop-types';

import css from './ImageGallery.module.css';

import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({images, onClick}) => {
    return (
        <ul className={css.gallery}>
            {images.map((el) => {
                return <ImageGalleryItem
                    key={el.id}
                    imgLink={el.webformatURL}
                    alt={el.tags}
                    id={el.id}
                    onClick={onClick}
                />
            })}
        </ul>
    );
};

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    })),
    onClick: PropTypes.func.isRequired,
};
import { useEffect, useState } from "react";
import Notiflix from 'notiflix';

import fetchImage from '../api/fetchImage';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from "./Loader/Loader";
import { ModalComponent } from "./Modal/Modal";

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImg, setModalImg] = useState({ src: '', alt: '' });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      if (query === '') return;
      try {
        const { data: { hits, totalHits } } = await fetchImage(query, page);
        const moreImages = [...images, ...hits];
        setImages(moreImages);
        setIsLoading(false);
        if (page === 1) { Notiflix.Notify.success(`${totalHits} results found for your query.`) };
      } catch (error) {
        console.log(error);
      }
    })();
  }, [query, page]);

  useEffect(() => {
    setTimeout(() => {
      window.scrollBy({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }, 1000);
  }, [images]);

  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    const { query: { value } } = evt.target;
    if (query !== value) {
      setImages([]);
      setQuery(value);
      setPage(1);
      setIsLoading(true);
      return;
    };
    Notiflix.Notify.info('You have already found images for this request');
  };

  const handleLoadMore = () => {
    setPage(page + 1);
    setIsLoading(true);
  };

  const handleOpenModal = ({ target: { id } }) => {
    const indexImg = images.findIndex((el) => el.id === Number(id));
    setModalImg({ src: images[indexImg].largeImageURL, alt: images[indexImg].tags });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Searchbar submit={handleOnSubmit} />
      {images && <ImageGallery images={images} onClick={handleOpenModal} />}
      <Loader isLoading={isLoading} />
      {(images.length !== 0) && <Button loadMore={handleLoadMore} />}
      <ModalComponent
        showModal={showModal}
        onRequestClose={handleCloseModal}
        imgLink={modalImg.src}
        alt={modalImg.alt}
      />
    </>
  );
};
import { Component } from "react";
import Notiflix from 'notiflix';

import fetchImage from '../api/fetchImage';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from "./Loader/Loader";
import { ModalComponent } from "./Modal/Modal";

export class App extends Component {
  state = {
    query: '',
    images: [],
    totalHits: null,
    page: 1,
    isLoading: false,
    showModal: false,
    modalImg: {
      src: '',
      alt: '',
    },
  };

  componentDidUpdate = async (_prevProps, prevState) => {
    const { query, page } = this.state;
    if (prevState.query !== this.state.query) {
      try {
        const { data } = await fetchImage(query);
        this.setState({
          images: data.hits,
          totalHits: data.totalHits,
          isLoading: false,
        });
        Notiflix.Notify.success(`${data.totalHits} results found for your query.`);
      } catch (error) {
        console.log(error);
      };
    };

    if ((prevState.page !== page) && (prevState.query === query)) {
      try {
        const { data: { hits } } = await fetchImage(query, page);
        this.setState((state) => {
          return {
            images: [...state.images, ...hits],
            isLoading: false,
          };
        });
      } catch (error) {
          console.log(error);
        }
    };

    if (this.state.images.length !== prevState.images.length) {
      setTimeout(() => {
        window.scrollBy({
          top: window.innerHeight,
          behavior: "smooth",
        });
      }, 1000);
    };
  };

  handleOnSubmit = (evt) => {
    evt.preventDefault();
    const { query } = evt.target;
    if (this.state.query !== query.value) {
      this.setState({ query: query.value, page: 1, isLoading: true });
      return;
    };
    Notiflix.Notify.info('You have already found images for this request');
  };

  handleLoadMore = () => {
    this.setState((state) => {
      return {
        page: (state.page + 1),
        isLoading: true,
      };
    });
    
  };

  handleOpenModal = ({target: {id}}) => {
    const indexImg = this.state.images.findIndex((el) => el.id === Number(id));
    this.setState((state) => {
      return {
        showModal: true,
        modalImg: {
          src: state.images[indexImg].largeImageURL,
          alt: state.images[indexImg].tags,
        },
      };
    });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <>
        <Searchbar submit={this.handleOnSubmit} />
        {this.state.images && <ImageGallery images={this.state.images} onClick={this.handleOpenModal} />}
        <Loader isLoading={this.state.isLoading} />
        {(this.state.images.length !== 0) && <Button loadMore={this.handleLoadMore} />}
        <ModalComponent
          showModal={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          imgLink={this.state.modalImg.src}
          alt={this.state.modalImg.alt}
        />
      </>
    );
  };
};
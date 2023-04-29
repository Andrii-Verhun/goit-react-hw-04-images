import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Search } from '../../image/search.svg';

import css from './Searchbar.module.css';

export const Searchbar = ({submit}) => {
    return (
        <header className={css.searchbar}>
            <form onSubmit={submit} className={css.form}>
                <button type="submit" className={css.button}>
                    <Search className={css['button-icon']} />
                </button>
                <input
                    className={css.input}
                    type="text"
                    name='query'
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    );
};

Searchbar.propTypes = {
    submit: PropTypes.func.isRequired,
};
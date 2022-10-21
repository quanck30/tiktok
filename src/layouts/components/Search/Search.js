import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleXmark,
    faSpinner
} from '@fortawesome/free-solid-svg-icons';

import * as searchService from '~/services/searchService';
import { useDebounce } from '~/hooks';
import { Wrapper as PopperWrapper } from '~/components/Popper'
import style from './Search.module.scss'
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
const cx = classNames.bind(style)



function Search() {
    const [searchResults, setSearchResults] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [showResult, setShowResult] = useState(true)
    const [loading, setLoading] = useState(false)

    const debounce = useDebounce(searchValue, 500)
    const inputRef = useRef()

    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResults([])
            return;
        }
        const fetchApi = async () => {
            setLoading(true)
            const result = await searchService.search(debounce)
            setSearchResults(result)
            setLoading(false)
        }
        fetchApi()

    }, [debounce])

    const handleClear = () => {
        setSearchValue('')
        setSearchResults([]);
        inputRef.current.focus()

    }
    const handleHideResult = () => {
        setShowResult(false)
    }
    const handleChange = (e) => {
        const searchValue = e.target.value
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue)
        }
    }
    return (
        //Tippy fix bug
        <div>
            <HeadlessTippy
                visible={showResult && searchResults.length > 0}
                interactive={true}
                render={attrs => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper >
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResults.map((result) => (
                                <AccountItem key={result.id} data={result} />
                            ))
                            }
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        type="text"
                        placeholder='Search accounts and videos'
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {searchValue && !loading &&
                        <button className={cx('clear')}
                            onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                    <button className={cx('search-btn')}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
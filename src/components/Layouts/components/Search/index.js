import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleXmark,
    faSpinner,
    faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

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

    const inputRef = useRef()

    useEffect(() => {
        if (!searchValue.trim()) {
            setSearchResults([])
            return;
        }
        setLoading(true)
        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(searchValue)}&type=less`)
            .then(res => res.json())
            .then(res => {
                setSearchResults(res.data)
                setLoading(false)
            })
            .catch(() => (
                setLoading(false)
            ))
    }, [searchValue])

    const handleClear = () => {
        setSearchValue('')
        setSearchResults([]);
        inputRef.current.focus()

    }
    const handleHideResult = () => {
        setShowResult(false)
    }
    return (
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
                    onChange={(e) => {
                        setSearchValue(e.target.value)
                    }}
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
    );
}

export default Search;
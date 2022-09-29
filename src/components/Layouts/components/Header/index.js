import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass, faPlus, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';


import { Wrapper as PropperWrapper } from '~/components/Popper'
import style from './Header.module.scss'
import images from '~/assets/images'
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu'
const cx = classNames.bind(style)
function Header() {
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        setTimeout(() => {
            setSearchResults([])
        }, 0);
    }, [])


    return <header className={cx('wrapper')}>
        <div className={cx('inner')}>

            <img src={images.logo} alt="tiktok" />

            <Tippy
                visible={searchResults.length > 0}
                interactive={true}
                render={attrs => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PropperWrapper >
                            <h4 className={cx('search-title')}>Accounts</h4>
                            <AccountItem />
                            <AccountItem />
                            <AccountItem />
                            <AccountItem />
                        </PropperWrapper>
                    </div>
                )}
            >
                <div className={cx('search')}>
                    <input type="text" placeholder='Search accounts and videos' spellCheck={false} />
                    <button className={cx('clear')}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                    <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                    <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </Tippy>
            <div className={cx('actions')}>
                <Button outlineBlack leftIcon={<FontAwesomeIcon icon={faPlus} />}>Upload</Button>
                <Button primary >Log in</Button>

                <Menu>
                    <button className={cx('more-btn')}>
                        <FontAwesomeIcon icon={faEllipsisVertical} ></FontAwesomeIcon>
                    </button>
                </Menu>
            </div>
        </div>
    </header >
}

export default Header; 
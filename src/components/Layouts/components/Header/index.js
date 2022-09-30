import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faKeyboard, faCircleQuestion, faEarthAsia, faSpinner, faMagnifyingGlass, faPlus, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';


import { Wrapper as PopperWrapper } from '~/components/Popper'
import style from './Header.module.scss'
import images from '~/assets/images'
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(style)


const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    title: 'English',
                    code: 'en',
                },
                {
                    // type: 'language',
                    title: 'Tiếng Việt',
                    code: 'vn',
                },
            ]
        }
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    }
]
function Header() {
    const [searchResults, setSearchResults] = useState([])
    const currentUser = true

    useEffect(() => {
        setTimeout(() => {
            setSearchResults([])
        }, 0);
    }, [])

    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                console.log(menuItem.type);
                break;
            default:
                console.log('default');
        }
    }
    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/feedback',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
        },
        {
            icon: <FontAwesomeIcon icon={faVideo} />,
            title: 'LIVE Studio',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
            title: 'Log out',

        }
    ]

    return <header className={cx('wrapper')}>
        <div className={cx('inner')}>

            <img src={images.logo} alt="tiktok" />

            <HeadlessTippy
                visible={searchResults.length > 0}
                interactive={true}
                render={attrs => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper >
                            <h4 className={cx('search-title')}>Accounts</h4>
                            <AccountItem />
                            <AccountItem />
                            <AccountItem />
                            <AccountItem />
                        </PopperWrapper>
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
            </HeadlessTippy>
            <div className={cx('actions')}>
                <Button outlineBlack leftIcon={<FontAwesomeIcon icon={faPlus} />}>Upload</Button>
                {currentUser ? (
                    <>
                        <Tippy
                            content="Messages"
                            placement='bottom'
                        >
                            <button className={cx('user-btn')}>
                                <FontAwesomeIcon icon={faTelegram} />
                            </button>
                        </Tippy>
                    </>
                ) : (
                    <>

                        <Button primary >Log in</Button>

                    </>
                )}
                <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                    {currentUser ? (
                        <img className={cx('user-avatar')}
                            src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/f89b316574f8f0ab300e20d4b7ff6a29~c5_100x100.jpeg?x-expires=1664672400&x-signature=ivcMl%2Ba7FdC%2BoSc4p%2FYyE5ouYgE%3D" alt="" />
                    ) : (
                        <button className={cx('more-btn')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} ></FontAwesomeIcon>
                        </button>
                    )}
                </Menu>
            </div>
        </div>
    </header >
}

export default Header; 
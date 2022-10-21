import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faEllipsisVertical
} from '@fortawesome/free-solid-svg-icons';
import style from './Header.module.scss'
import images from '~/assets/images'
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import {
    LanguageIcon,
    MessagesIcon,
    InboxIcon,
    FeedbackIcon,
    KeyboardIcon,
    ProfileIcon,
    CoinIcon,
    LiveIcon,
    SettingIcon,
    LogoutIcon
} from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';
import config from '~/config';
const cx = classNames.bind(style)


const MENU_ITEMS = [
    {
        icon: <LanguageIcon />,
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
        icon: <FeedbackIcon />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <KeyboardIcon />,
        title: 'Keyboard shortcuts',

    }
]
function Header() {

    const currentUser = true



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
            icon: <ProfileIcon />,
            title: 'View profile',
            to: '/profile',
        },
        {
            icon: <CoinIcon />,
            title: 'Get coins',
        },
        {
            icon: <LiveIcon />,
            title: 'LIVE Studio',
        },
        {
            icon: <SettingIcon />,
            title: 'Settings',
        },
        ...MENU_ITEMS,
        {
            icon: <LogoutIcon />,
            title: 'Log out',
            separate: true,
        }
    ]

    return <header className={cx('wrapper')}>
        <div className={cx('inner')}>

            <Link to={config.routes.home} className={cx('logo-link')}><img src={images.logo} alt="tiktok" /></Link>

            <Search />
            <div className={cx('actions')}>
                <Button outlineBlack leftIcon={<FontAwesomeIcon icon={faPlus} />}>Upload</Button>
                {currentUser ? (
                    <>
                        <Tippy
                            delay={[0, 100]}
                            content="Messages"
                            placement='bottom'
                        >
                            <button className={cx('user-btn')}>
                                <MessagesIcon />
                            </button>
                        </Tippy>
                        <Tippy
                            delay={[0, 100]}
                            content="Inbox"
                            placement='bottom'
                        >
                            <button className={cx('user-btn')}>
                                <InboxIcon />
                                <span className={cx('badge')}>12</span>
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
                        <Image
                            className={cx('user-avatar')}
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
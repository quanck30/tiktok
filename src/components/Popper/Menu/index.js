// import Tippy from "@tippyjs/react";
import Tippy from '@tippyjs/react/headless';
import classNames from "classnames/bind";

import styles from './Menu.module.scss';
import { Wrapper as PropperWrapper } from '~/components/Popper'
import MenuItem from './MenuItem';
import Header from './Header';
import { useState } from 'react';


const cx = classNames.bind(styles);

const defaultFn = () => { }

function Menu({ children, items = [], onChange = defaultFn }) {
    const [history, setHitory] = useState([{ data: items }])
    const current = history[history.length - 1]

    const renderItems = () => {

        return current.data.map((item, index) => {
            const isParrent = !!item.children
            if (isParrent) {

            }
            return <MenuItem key={index} data={item} onClick={() => {
                if (isParrent) {
                    setHitory(prev => [...prev, item.children])
                } else {
                    onChange(item)
                }
            }} />
        })
    }

    return (
        <Tippy
            offset={[10, 10]}
            interactive
            delay={[0, 500]}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex='-1' {...attrs}>
                    <PropperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && <Header title='Language' onBack={() => {
                            setHitory(prev => prev.slice(0, prev.length - 1))
                        }} />}
                        {renderItems()}
                    </PropperWrapper>
                </div>
            )
            }
            onHide={() => setHitory(prev => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    );
}

export default Menu;

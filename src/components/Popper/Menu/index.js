import classNames from "classnames/bind";
import styles from './Menu.module.scss';
import Tippy from '@tippyjs/react';

import { Wrapper as PropperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles)


function Menu({ children }) {
    return (
        <Tippy
            delay={[0, 100]}
            placement='bottom-end'
            render={attrs => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PropperWrapper >
                        <h2>List menu</h2>
                    </PropperWrapper>
                </div>
            )
            }
        >
            {children}
        </Tippy >
    );
}

export default Menu;
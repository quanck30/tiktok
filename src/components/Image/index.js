import classNames from "classnames";
import { forwardRef, useState } from "react"
import styles from './Image.module.scss'
import images from "~/assets/images";

const Image = forwardRef(({ src, className, fallback: customFallback = images.noImage, ...props }, ref) => {
    const [fallback, setFallback] = useState('')
    const hanldeError = () => {
        setFallback(customFallback)
    }
    return <img className={classNames(styles.wrapper, className)} ref={ref} src={fallback || src}{...props} onError={hanldeError} />

})

export default Image;
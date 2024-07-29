import styles from './LeftIntro.module.scss'
import { Context } from '@/app/components/ui/Context/Context';
import { Children, cloneElement, useContext } from 'react';


const LeftIntro = ({ children }) => {
    const { close } = useContext(Context);

    return (
        <div className={`${styles.leftIntro} ${close ? styles.close : ""}`}>
            {
                Children.map(children, (child) => {
                    return cloneElement(child);
                })
            }
        </div>
    )
}

export default LeftIntro;
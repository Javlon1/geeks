import * as React from "react";
import styles from "./AllIntro.module.scss";
import { Context } from "../Context/Context";

const AllIntro = ({ text }) => {
    const { close } = React.useContext(Context);

    return (
        <div className={`${styles.allIntro} ${close ? styles.close : ""}`}>
            <div className={styles.allIntro__items}>
                <div className={styles.allIntro__items__link}>
                    <h1>{text}</h1>
                </div>
            </div>
        </div>
    );
};

export default AllIntro;
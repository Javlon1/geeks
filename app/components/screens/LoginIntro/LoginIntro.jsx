import Image from 'next/image'
import styles from './LoginIntro.module.scss'
import { Context } from '@/app/components/ui/Context/Context';
import loginImage from "../../../../public/img/login-image.png";
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';


const LoginIntro = () => {
    const { lan } = useContext(Context);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const [form, setForm] = useState({
        phone: '',
        password: '',
        rememberMe: false,
    });

    const formatPhoneNumber = (number) => {
        let newValue = number.replace(/\D/g, '');

        if (!newValue.startsWith('998')) {
            newValue = '998' + newValue;
        }

        if (newValue.length > 12) {
            newValue = newValue.slice(0, 12);
        }

        if (newValue.length > 3) newValue = newValue.replace(/^(\d{3})(\d+)/, '$1 $2');
        if (newValue.length > 6) newValue = newValue.replace(/^(\d{3}) (\d{2})(\d+)/, '$1 $2 $3');
        if (newValue.length > 9) newValue = newValue.replace(/^(\d{3}) (\d{2}) (\d{3})(\d+)/, '$1 $2 $3 $4');
        if (newValue.length > 11) newValue = newValue.replace(/^(\d{3}) (\d{2}) (\d{3}) (\d{2})(\d+)/, '$1 $2 $3 $4 $5');

        return newValue.trim();
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === 'phone') {
            const formattedPhone = formatPhoneNumber(value);
            setForm((prevState) => ({ ...prevState, [name]: formattedPhone }));
        } else {
            setForm((prevState) => ({ ...prevState, [name]: type === 'checkbox' ? checked : value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Данные формы:', form);
        setForm({
            phone: '',
            password: '',
            rememberMe: false,
        });
        router.push('/');
    };

    return (
        <div className={styles.loginIntro}>
            <div className={styles.loginIntro__left}>
                <form className={styles.loginIntro__left__form} onSubmit={handleSubmit}>
                    <h3 className={styles.loginIntro__left__form__title}>Kirish</h3>
                    <label className={styles.loginIntro__left__form__label}>
                        <p>Telefon raqamingizni kiriting</p>
                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label className={styles.loginIntro__left__form__password}>
                        <p>Parolingizni kiriting</p>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            className={styles.btn}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <i className={`fa-solid fa-${!showPassword ? "eye" : "eye-slash"}`}></i>
                        </button>
                    </label>
                    <label className={styles.loginIntro__left__form__checkbox}>
                        <input
                            type="checkbox"
                            name="rememberMe"
                            checked={form.rememberMe}
                            onChange={handleChange}
                        />
                        <p>Meni eslab qoling</p>
                    </label>
                    <button className={styles.loginIntro__left__form__btn} type="submit">Kirish</button>
                </form>
            </div>
            <div className={styles.loginIntro__right}>
                <Image
                    src={loginImage}
                    alt='login image'
                />
            </div>
        </div>
    )
}

export default LoginIntro;
import styles from './footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p className={styles.copyright}>Copyright &copy; 2024 - <a href='/'>Contrain.se</a></p>
        </footer>
    );
} 
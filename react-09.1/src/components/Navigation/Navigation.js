import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => (
  <nav>
    <NavLink
      exact
      to="/"
      className={styles.link}
      activeClassName={styles.activeLink}
    >
      Home
    </NavLink>
    <NavLink
      to="/authors"
      className={styles.link}
      activeClassName={styles.activeLink}
    >
      Authors
    </NavLink>
    <NavLink
      to="/books"
      className={styles.link}
      activeClassName={styles.activeLink}
    >
      Books
    </NavLink>
  </nav>
);

export default Navigation;

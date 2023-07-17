import logo from '../../images/logo.svg';
import './styles.css';

const Header = () => {
  return (
    <header class='header'>
      <img class='header__logo' src={logo} alt='logo' />
      <h1 class='header__title'>React Cafe</h1>
    </header>
  );
};

export default Header;

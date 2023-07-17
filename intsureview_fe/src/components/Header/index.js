import logo from '../../images/logo.svg';
import './styles.css';

const Header = () => {
  return (
    <header className='header'>
      <img className='header__logo' src={logo} alt='logo' />
      <h1 className='header__title'>React Cafe</h1>
    </header>
  );
};

export default Header;

import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="custom-header py-2 px-3">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <div className="header-side-slot flex-shrink-0" aria-hidden="true" />
          <h1 className="store-title text-center mb-0 flex-grow-1">
            Grand Line Bazaar
          </h1>
          <div className="header-side-slot flex-shrink-0 d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-outline-light btn-sm align-self-center"
              onClick={toggleTheme}
              aria-label={
                theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
              }
              title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            >
              <i
                className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} me-1`}
                aria-hidden
              />
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

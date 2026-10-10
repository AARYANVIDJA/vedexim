import { useEffect, useRef, useState } from "react";

import { Link, useLocation } from "react-router-dom";

import "./Navbar.css";



function Navbar() {

  const location = useLocation();



  const [scrolled, setScrolled] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const [menuView, setMenuView] = useState("main");

  const [navbarHidden, setNavbarHidden] = useState(false);



  const lastScrollY = useRef(0);



  useEffect(() => {

    const handleScroll = () => {

      const currentScrollY = window.scrollY;



      setScrolled(currentScrollY > 40);



      // Keep navbar visible at the very top.

      if (currentScrollY <= 40) {

        setNavbarHidden(false);

        lastScrollY.current = currentScrollY;

        return;

      }



      // Scrolling down → hide navbar.

      if (currentScrollY > lastScrollY.current) {

        setNavbarHidden(true);

      }



      // Scrolling up → show navbar.

      else if (currentScrollY < lastScrollY.current) {

        setNavbarHidden(false);

      }



      lastScrollY.current = currentScrollY;

    };



    window.addEventListener("scroll", handleScroll, {

      passive: true,

    });



    handleScroll();



    return () => {

      window.removeEventListener("scroll", handleScroll);

    };

  }, []);



  // Keep the navbar visible while the menu/submenu is open.

  useEffect(() => {

    if (menuOpen) {

      setNavbarHidden(false);

    }

  }, [menuOpen]);



  useEffect(() => {

    document.body.classList.toggle(

      "menu-open",

      menuOpen

    );



    return () => {

      document.body.classList.remove(

        "menu-open"

      );

    };

  }, [menuOpen]);



  const closeMenu = () => {

    setMenuOpen(false);

    setMenuView("main");

  };



  const openProductsMenu = () => {

    setMenuView("collections");

  };



  const openWallTiles = () => {

    setMenuView("wall");

  };



  const openFloorTiles = () => {

    setMenuView("floor");

  };



  const goBack = () => {

    if (menuView === "wall" || menuView === "floor") {

      setMenuView("collections");

      return;

    }



    setMenuView("main");

  };



  return (

    <header

      className={`navbar ${

        scrolled ? "navbar-scrolled" : ""

      } ${

        location.pathname === "/products"

          ? "navbar-light-page"

          : ""

      } ${

        navbarHidden && !menuOpen ? "navbar-hidden" : ""

      }`}

    >



      {/* =================================================

          LEFT LOGO

      ================================================= */}



      <Link

        to="/"

        className="navbar-logo"

        onClick={closeMenu}

      >

        <img

          src="/images/logo/vedexim.png"

          alt="VED EXIM"

        />

      </Link>





      {/* =================================================

          MENU BUTTON

      ================================================= */}



      <button

        type="button"

        className={`menu-button ${

          menuOpen ? "menu-active" : ""

        }`}

        onClick={() => {

          setMenuOpen((prev) => {

            const next = !prev;



            if (!next) {

              setMenuView("main");

            }



            return next;

          });

        }}

        aria-label={

          menuOpen

            ? "Close navigation menu"

            : "Open navigation menu"

        }

        aria-expanded={menuOpen}

      >

        <span></span>

        <span></span>

      </button>





      {/* =================================================

          MENU PANEL

      ================================================= */}



      <div

        className={`menu-panel ${

          menuOpen ? "menu-open" : ""

        }`}

      >



        {/* =================================================

            MAIN MENU

        ================================================= */}



        {menuView === "main" && (

          <div

            className="menu-view menu-view-main"

          >



            <nav className="menu-nav">



              {/* HOME */}



              <Link

                to="/"

                onClick={closeMenu}

              >

                <span></span>

                Home

              </Link>





              {/* ABOUT */}



              <Link

                to="/about"

                onClick={closeMenu}

              >

                <span></span>

                About

              </Link>





              {/* COLLECTIONS */}



              <Link

                to="/collections"

                onClick={closeMenu}

              >

                <span></span>

                Collections

              </Link>





              {/* PRODUCTS */}



              <button

                type="button"

                className="menu-nav-product"

                onClick={openProductsMenu}

              >

                <span></span>

                Products

              </button>





              {/* PROCESS */}



              <Link

                to="/process"

                onClick={closeMenu}

              >

                <span></span>

                Our Process

              </Link>





              {/* CONTACT */}



              <Link

                to="/contact"

                onClick={closeMenu}

              >

                <span></span>

                Contact

              </Link>



              {/* DOWNLOAD CATALOGUE */}



              <a

                href="/catalogue.pdf"

                download="VED-EXIM-Catalogue.pdf"

                className="menu-catalogue-link"

                onClick={closeMenu}

              >

                <span></span>



                <div className="menu-catalogue-content">

                  <strong>Download Catalogue</strong>



                  <small>

                    PDF CATALOGUE

                    <b>↓</b>

                  </small>

                </div>

              </a>



            </nav>





            <div className="menu-footer">

              CERAMICS · SURFACES · SANITARYWARE

            </div>



          </div>

        )}





        {/* =================================================

            OUR COLLECTION

        ================================================= */}



        {menuView === "collections" && (

          <div

            className="menu-view menu-view-collections"

          >



            <div

              className="menu-submenu-header"

            >

              <button

                type="button"

                className="menu-back-button"

                onClick={goBack}

                aria-label="Back to main menu"

              >

                <span className="menu-back-arrow">

                  ←

                </span>



                <span className="menu-back-text">

                  <span>B</span>

                  <span>A</span>

                  <span>C</span>

                  <span>K</span>

                </span>

              </button>

            </div>





            <div className="menu-collection-list">



              <button

                type="button"

                className="menu-collection-item"

                onClick={openWallTiles}

              >

                <span className="menu-item-number">



                </span>



                <span className="menu-item-name">

                  Wall Tiles

                </span>

              </button>





              <button

                type="button"

                className="menu-collection-item"

                onClick={openFloorTiles}

              >

                <span className="menu-item-number">

                </span>



                <span className="menu-item-name">

                  Floor Tiles

                </span>

              </button>





              <Link

                to="/products?category=SANITARY%20WARE"

                className="menu-collection-item"

                onClick={closeMenu}

              >

                <span className="menu-item-number">

                </span>



                <span className="menu-item-name">

                  Sanitary Ware

                </span>

              </Link>



            </div>





            <div className="menu-footer">

              CERAMICS · SURFACES · SANITARYWARE

            </div>



          </div>

        )}





        {/* =================================================

            WALL TILES

        ================================================= */}



        {menuView === "wall" && (

          <div

            className="menu-view menu-view-sizes"

          >



            <div

              className="menu-submenu-header"

            >

              <button

                type="button"

                className="menu-back-button"

                onClick={goBack}

                aria-label="Back to collections"

              >

                <span className="menu-back-arrow">

                  ←

                </span>



                <span className="menu-back-text">

                  <span>B</span>

                  <span>A</span>

                  <span>C</span>

                  <span>K</span>

                </span>

              </button>



              <span>

                WALL TILES

              </span>

            </div>





            <div className="menu-size-list">



              <Link

                to="/products?category=WALL%20TILES&size=12%20X%2012"

                className="menu-size-item"

                onClick={closeMenu}

              >

                <span className="menu-item-number">

                </span>



                <span className="menu-item-name">

                  12 X 12

                </span>

              </Link>





              <Link

                to="/products?category=WALL%20TILES&size=16%20X%2016"

                className="menu-size-item"

                onClick={closeMenu}

              >

                <span className="menu-item-number">

                </span>



                <span className="menu-item-name">

                  16 X 16

                </span>

              </Link>
              
            </div>





            <div className="menu-footer">

              WALL TILES · CERAMIC SURFACES

            </div>



          </div>

        )}





        {/* =================================================

            FLOOR TILES

        ================================================= */}



        {menuView === "floor" && (

          <div

            className="menu-view menu-view-sizes"

          >



            <div

              className="menu-submenu-header"

            >

              <button

                type="button"

                className="menu-back-button"

                onClick={goBack}

                aria-label="Back to collections"

              >

                <span className="menu-back-arrow">

                  ←

                </span>



                <span className="menu-back-text">

                  <span>B</span>

                  <span>A</span>

                  <span>C</span>

                  <span>K</span>

                </span>

              </button>



              <span>

                FLOOR TILES

              </span>

            </div>





            <div className="menu-size-list">



              <Link

                to="/products?category=FLOOR%20TILES&size=12%20X%2012"

                className="menu-size-item"

                onClick={closeMenu}

              >

                <span className="menu-item-number">

                </span>



                <span className="menu-item-name">

                  12 X 12

                </span>

              </Link>





              <Link

                to="/products?category=FLOOR%20TILES&size=16%20X%2016"

                className="menu-size-item"

                onClick={closeMenu}

              >

                <span className="menu-item-number">

                </span>



                <span className="menu-item-name">

                  16 X 16

                </span>

              </Link>

            </div>





            <div className="menu-footer">

              FLOOR TILES · CERAMIC SURFACES

            </div>



          </div>

        )}



      </div>



    </header>

  );

}



export default Navbar;
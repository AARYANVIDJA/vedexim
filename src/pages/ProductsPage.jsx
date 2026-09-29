import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  useSearchParams,
} from "react-router-dom";
import "./ProductsPage.css";


/* =====================================================
   PRODUCT DATA
===================================================== */

const products = [
  {
    id: "01",
    category: "FLOOR TILES",
    size: "12 X 12",
    series: "MARBLE",
    surface: "POLISHED",
    name: "Mistero Nero",
    image: "/images/products/marble/marble-01.png",
  },

  {
    id: "02",
    category: "FLOOR TILES",
    size: "12 X 12",
    series: "MARBLE",
    surface: "POLISHED",
    name: "Marvel Verde",
    image: "/images/products/stone/stone-01.png",
  },

  {
    id: "03",
    category: "FLOOR TILES",
    size: "12 X 12",
    series: "MARBLE",
    surface: "HIGH GLOSS",
    name: "Marcacol Hg",
    image: "/images/products/terrazzo/terrazzo-01.png",
  },

  {
    id: "04",
    category: "FLOOR TILES",
    size: "12 X 12",
    series: "STONE",
    surface: "MATT",
    name: "Urban Stone",
    image: "/images/products/concrete/concrete-01.png",
  },

  {
    id: "05",
    category: "WALL TILES",
    size: "12 X 12",
    series: "STONE",
    surface: "MATT",
    name: "Limestone Grey",
    image: "/images/products/stone/stone-01.png",
  },

  {
    id: "13",
    category: "WALL TILES",
    size: "12 X 12",
    series: "STONE",
    surface: "MATT",
    name: "Limestone Classic",
    image: "/images/products/stone/stone-01.png",
  },

  {
    id: "14",
    category: "WALL TILES",
    size: "12 X 12",
    series: "STONE",
    surface: "MATT",
    name: "Stone Square",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=85",
  },

  {
    id: "06",
    category: "GVT",
    size: "12 X 12",
    series: "CONCRETE",
    surface: "MATT",
    name: "Architect Grey",
    image: "/images/products/concrete/concrete-01.png",
  },

  {
    id: "07",
    category: "FLOOR TILES",
    size: "16 X 16",
    series: "MARBLE",
    surface: "HIGH GLOSS",
    name: "Calacatta White",
    image: "/images/products/marble/marble-01.png",
  },

  {
    id: "08",
    category: "FLOOR TILES",
    size: "12 X 12",
    series: "TERRAZZO",
    surface: "MATT",
    name: "Terrazzo Classic",
    image: "/images/products/terrazzo/terrazzo-01.png",
  },

  {
    id: "09",
    category: "WALL TILES",
    size: "12 X 12",
    series: "MARBLE",
    surface: "GLOSSY",
    name: "Bianco Vein",
    image: "/images/products/marble/marble-01.png",
  },

  {
    id: "10",
    category: "FLOOR TILES",
    size: "12 X 12",
    series: "STONE",
    surface: "MATT",
    name: "Graphite Slate",
    image: "/images/products/stone/stone-01.png",
  },

  {
    id: "11",
    category: "FLOOR TILES",
    size: "16 X 16",
    series: "MARBLE",
    surface: "HIGH GLOSS",
    name: "Arabescato",
    image: "/images/products/marble/marble-01.png",
  },

  {
    id: "12",
    category: "FLOOR TILES",
    size: "12 X 12",
    series: "CONCRETE",
    surface: "MATT",
    name: "Raw Concrete",
    image: "/images/products/concrete/concrete-01.png",
  },
];


function getProductWhatsAppUrl(product) {
  const phoneNumber = "919909026328";
  const specs = [
    product.category && `Category: ${product.category}`,
    product.size && `Size: ${product.size}`,
    product.series && `Series: ${product.series}`,
    product.surface && `Surface: ${product.surface}`,
  ]
    .filter(Boolean)
    .join(" | ");

  const message = `Hello Ved Exim, I would like to inquire about *${product.name}* (${specs}).\n\nPlease share pricing, technical specifications, and catalogue details.`;
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

/* =====================================================
   FILTER OPTIONS
===================================================== */

const categories = [
  "ALL",
  "WALL TILES",
  "FLOOR TILES",
  "SANITARYWARE",
];

const sizes = [
  "ALL",
  "12 X 12",
  "16 X 16",
];



/* =====================================================
   PRODUCTS PAGE
===================================================== */

function ProductsPage() {
  const pageRef = useRef(null);
  const [searchParams] = useSearchParams();

  const categoryFromUrl =
    searchParams.get("category")?.toUpperCase() || "ALL";

  const sizeFromUrl =
    searchParams.get("size")?.toUpperCase() || "ALL";


  const [category, setCategory] =
    useState(categoryFromUrl);

  const [size, setSize] =
    useState(sizeFromUrl);



  const [currentPage, setCurrentPage] = useState(1);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  /* ===================================================
     SETTINGS
  =================================================== */

  const productsPerPage = 6;


  /* ===================================================
     SYNC CATEGORY + SIZE WITH URL
  =================================================== */

  useEffect(() => {
    const requestedCategory =
      searchParams.get("category")?.toUpperCase() || "ALL";

    const requestedSize =
      searchParams.get("size")?.toUpperCase() || "ALL";

    setCategory(requestedCategory);
    setSize(requestedSize);
    setCurrentPage(1);
  }, [searchParams]);

  /* ===================================================
     FILTER PRODUCTS
  =================================================== */

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        category === "ALL" ||
        product.category === category;

      const sizeMatch =
        size === "ALL" ||
        product.size === size;

      return categoryMatch && sizeMatch;
    });
  }, [category, size]);

  /* ===================================================
     PAGINATION
  =================================================== */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredProducts.length /
      productsPerPage
    )
  );

  const visibleProducts =
    filteredProducts.slice(
      (currentPage - 1) *
        productsPerPage,

      currentPage *
        productsPerPage
    );


  /* ===================================================
     RESET PAGE WHEN FILTER CHANGES
  =================================================== */

  useEffect(() => {
    setCurrentPage(1);
  }, [category, size]);

  /* ===================================================
     KEEP PAGE VALID
  =================================================== */

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [
    currentPage,
    totalPages,
  ]);


  /* ===================================================
     LOCK BODY WHEN LIGHTBOX IS OPEN
  =================================================== */

  useEffect(() => {
    document.body.style.overflow =
      selectedProduct
        ? "hidden"
        : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProduct]);


  /* ===================================================
     ESCAPE KEY
  =================================================== */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedProduct(null);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);


  /* ===================================================
     PAGE NAVIGATION
  =================================================== */

  const goToPage = (page) => {
    const safePage = Math.min(
      Math.max(page, 1),
      totalPages
    );

    setCurrentPage(safePage);

    const catalogue =
      document.getElementById(
        "product-catalogue"
      );

    if (catalogue) {
      catalogue.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };


  /* ===================================================
     CLEAR FILTERS
  =================================================== */

  const clearFilters = () => {
    setCategory("ALL");
    setSize("ALL");
    setCurrentPage(1);

    window.history.replaceState(
      {},
      "",
      window.location.pathname
    );
  };


  /* ===================================================
     RENDER
  =================================================== */

  return (
    <main className="products-catalogue-page" ref={pageRef}>

      {/* =================================================
          PRODUCT CATALOGUE
      ================================================= */}

      <section
        id="product-catalogue"
        className="products-catalogue-section"
      >


        {/* =================================================
            FILTER SECTION
        ================================================= */}

        <div className="products-catalogue-filters">


          {/* CATEGORY */}

          <div className="catalogue-filter">

            <label>
              Search By Category
            </label>

            <select
              value={category}
              onChange={(event) =>
                setCategory(
                  event.target.value
                )
              }
            >
              {categories.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item === "ALL"
                      ? "All Categories"
                      : item}
                  </option>
                )
              )}
            </select>

          </div>


          {/* SIZE */}

          <div className="catalogue-filter">

            <label>
              Search By Size
            </label>

            <select
              value={size}
              onChange={(event) =>
                setSize(
                  event.target.value
                )
              }
            >
              {sizes.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item === "ALL"
                      ? "All Sizes"
                      : item}
                  </option>
                )
              )}
            </select>

          </div>


        </div>


        {/* =================================================
            RESULT BAR
        ================================================= */}

        <section className="products-catalogue-result">

          <span>
            {filteredProducts.length} PRODUCTS
          </span>


          <button
            type="button"
            onClick={clearFilters}
          >
            CLEAR FILTERS
          </button>

        </section>


        {/* =================================================
            PRODUCT GRID
        ================================================= */}

        <section
          key={`products-page-${currentPage}`}
          className="products-catalogue-grid"
        >

          {visibleProducts.length > 0 ? (

            visibleProducts.map(
              (product) => (

                <article
                  className="catalogue-product-card"
                  key={product.id}
                >


                  {/* IMAGE */}

                  <button
                    type="button"
                    className="catalogue-product-image-button"
                    onClick={() =>
                      setSelectedProduct(
                        product
                      )
                    }
                    aria-label={
                      `Open ${product.name}`
                    }
                  >

                    <div
                      className="catalogue-product-image catalogue-white-tile-image"
                    >

                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                      />


                      <div
                        className="catalogue-image-overlay"
                      />


                      <span
                        className="catalogue-zoom"
                      >
                        OPEN IMAGE ↗
                      </span>

                    </div>

                  </button>


                  {/* PRODUCT INFORMATION */}

                  <div
                    className="catalogue-product-info"
                  >

                    <p>
                      {product.category}
                      {" - "}
                      {product.size}
                    </p>


                    <h2>
                      {product.name}
                    </h2>


                    <div className="catalogue-product-actions">
                      <a
                        href={getProductWhatsAppUrl(product)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="catalogue-whatsapp-btn"
                        onClick={(event) =>
                          event.stopPropagation()
                        }
                        aria-label={`Inquire about ${product.name} on WhatsApp`}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="15"
                          height="15"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.68 12.04 3.68C14.25 3.68 16.31 4.54 17.87 6.1C19.42 7.66 20.28 9.72 20.28 11.92C20.28 16.46 16.59 20.15 12.05 20.15ZM16.57 14.39C16.32 14.27 15.1 13.67 14.87 13.59C14.65 13.5 14.48 13.46 14.32 13.71C14.15 13.95 13.67 14.52 13.52 14.69C13.38 14.85 13.23 14.88 12.98 14.75C12.74 14.63 11.95 14.37 11.01 13.53C10.28 12.88 9.78 12.07 9.64 11.83C9.5 11.58 9.62 11.45 9.75 11.32C9.86 11.21 10 11.04 10.12 10.9C10.24 10.75 10.28 10.65 10.36 10.49C10.44 10.32 10.4 10.18 10.34 10.05C10.28 9.93 9.79 8.73 9.59 8.24C9.39 7.76 9.19 7.82 9.04 7.81H8.57C8.41 7.81 8.15 7.87 7.93 8.11C7.71 8.35 7.09 8.93 7.09 10.11C7.09 11.29 7.95 12.42 8.07 12.59C8.19 12.75 9.77 15.18 12.18 16.23C12.76 16.48 13.2 16.62 13.56 16.74C14.14 16.92 14.67 16.89 15.08 16.83C15.55 16.76 16.52 16.24 16.73 15.67C16.93 15.09 16.93 14.6 16.87 14.5C16.81 14.41 16.65 14.35 16.57 14.39Z"/>
                        </svg>
                        <span>Inquire on WhatsApp</span>
                      </a>
                    </div>

                  </div>

                </article>

              )
            )

          ) : (

            /* =================================================
               NO PRODUCTS
            ================================================= */

            <div className="catalogue-empty">

              <h2>
                No products found.
              </h2>

              <p>
                Try changing your filters.
              </p>


              <button
                type="button"
                onClick={clearFilters}
              >
                RESET FILTERS
              </button>

            </div>

          )}

        </section>


        {/* =================================================
            PAGINATION
        ================================================= */}

        {filteredProducts.length > 0 && (

          <section
            className="products-pagination"
          >


            {/* PREVIOUS */}

            <button
              type="button"
              className="pagination-arrow"
              onClick={() =>
                goToPage(
                  currentPage - 1
                )
              }
              disabled={
                currentPage === 1
              }
              aria-label="Previous page"
            >
              ←
            </button>


            {/* PAGE NUMBERS */}

            <div
              className="pagination-pages"
            >

              {Array.from(
                {
                  length: totalPages,
                },
                (_, index) =>
                  index + 1
              ).map(
                (page) => (

                  <button
                    type="button"
                    key={page}
                    className={
                      currentPage === page
                        ? "pagination-page active"
                        : "pagination-page"
                    }
                    onClick={() =>
                      goToPage(page)
                    }
                  >
                    {String(page)
                      .padStart(2, "0")}
                  </button>

                )
              )}

            </div>


            {/* NEXT */}

            <button
              type="button"
              className="pagination-arrow"
              onClick={() =>
                goToPage(
                  currentPage + 1
                )
              }
              disabled={
                currentPage === totalPages
              }
              aria-label="Next page"
            >
              →
            </button>

          </section>

        )}

      </section>


      {/* =================================================
          IMAGE LIGHTBOX
      ================================================= */}

      {selectedProduct && (

        <div
          className="catalogue-lightbox"
          onClick={() =>
            setSelectedProduct(null)
          }
        >


          {/* CLOSE BUTTON */}

          <button
            type="button"
            className="catalogue-lightbox-close"
            onClick={() =>
              setSelectedProduct(null)
            }
            aria-label="Close image"
          >
            ×
          </button>


          {/* LIGHTBOX CONTENT */}

          <div
            className="catalogue-lightbox-content"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <img
              src={selectedProduct.image}
              alt={
                selectedProduct.name
              }
            />


            <div
              className="catalogue-lightbox-caption"
            >

              <span>
                {selectedProduct.category}
                {" · "}
                {selectedProduct.size}
              </span>


              <strong>
                {selectedProduct.name}
              </strong>

              <a
                href={getProductWhatsAppUrl(selectedProduct)}
                target="_blank"
                rel="noopener noreferrer"
                className="catalogue-lightbox-whatsapp"
                aria-label={`Inquire about ${selectedProduct.name} on WhatsApp`}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="17"
                  height="17"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.68 12.04 3.68C14.25 3.68 16.31 4.54 17.87 6.1C19.42 7.66 20.28 9.72 20.28 11.92C20.28 16.46 16.59 20.15 12.05 20.15ZM16.57 14.39C16.32 14.27 15.1 13.67 14.87 13.59C14.65 13.5 14.48 13.46 14.32 13.71C14.15 13.95 13.67 14.52 13.52 14.69C13.38 14.85 13.23 14.88 12.98 14.75C12.74 14.63 11.95 14.37 11.01 13.53C10.28 12.88 9.78 12.07 9.64 11.83C9.5 11.58 9.62 11.45 9.75 11.32C9.86 11.21 10 11.04 10.12 10.9C10.24 10.75 10.28 10.65 10.36 10.49C10.44 10.32 10.4 10.18 10.34 10.05C10.28 9.93 9.79 8.73 9.59 8.24C9.39 7.76 9.19 7.82 9.04 7.81H8.57C8.41 7.81 8.15 7.87 7.93 8.11C7.71 8.35 7.09 8.93 7.09 10.11C7.09 11.29 7.95 12.42 8.07 12.59C8.19 12.75 9.77 15.18 12.18 16.23C12.76 16.48 13.2 16.62 13.56 16.74C14.14 16.92 14.67 16.89 15.08 16.83C15.55 16.76 16.52 16.24 16.73 15.67C16.93 15.09 16.93 14.6 16.87 14.5C16.81 14.41 16.65 14.35 16.57 14.39Z"/>
                </svg>
                <span>Inquire This Product on WhatsApp</span>
              </a>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}


export default ProductsPage;

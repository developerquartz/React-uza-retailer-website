import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { useSelector } from "react-redux";

import Homemenustrip from "./Homemenustrip";
import UserAuthCard from "./UserAuthCard";

// images
import Logo from "../../../src/assets/images/logo.png";
import ROUTES from "../../helpers/routesHelper";

const getCategoryList = ({ data, setChooseCategory, chooseCategoryRef }) =>
  data?.map((cat, key) => (
    <React.Fragment key={key}>
      <Button
        onClick={() => {
          setChooseCategory({
            catName: cat.catName,
            _id: cat._id,
          });
          if (chooseCategoryRef.current) {
            chooseCategoryRef.current.context.toggle();
          }
        }}
      >
        {cat.catName}
      </Button>
      {cat?.subcategories?.length
        ? getCategoryList({
          data: cat.subcategories,
          setChooseCategory,
          chooseCategoryRef,
        })
        : ""}
    </React.Fragment>
  ));

export default function Header() {
  const { isLoading, data } = useSelector((s) => s.categories.categories);
  const [chooseCategory, setChooseCategory] = useState({
    catName: "All categories",
    _id: "",
  });
  const [nav, setNav] = useState(false);
  const [scroll, setScroll] = useState(false);

  const chooseCategoryRef = useRef();

  const [search] = useSearchParams();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  useEffect(() => {
    if (!!search.get("category") && !!search.get("catName")) {
      setChooseCategory({
        catName: search.get("catName"),
        _id: search.get("category"),
      });
    }
  }, [search]);

  return (
    <>
      <section className={scroll ? "header-main  fixed-header" : "header-main"}>
        <Container>
          <div className="header">
            <nav className="navbar navbar-expand-lg">
              <div className="container p-0">
                <Link to={ROUTES.HOME} className="navbar-brand">
                  <img src={Logo} alt="logo" className="img-fluid" />
                </Link>
                <button
                  className={`navbar-toggler ${nav ? "" : "menu_click"}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={() => setNav(!nav)}
                >
                  <span className="bar"></span>
                  <span className="bar"></span>
                  <span className="bar"></span>
                </button>
                <div
                  className={
                    nav
                      ? "collapse navbar-collapse show"
                      : "collapse navbar-collapse"
                  }
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav scroll-menu ms-auto mb-2 mb-lg-0">
                    {/* <Button
                      onClick={() => setNav(false)}
                      className="close-menu"
                    >
                      <svg
                        aria-hidden="true"
                        role="img"
                        className="iconify iconify--gg"
                        width="28"
                        height="28"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#ffffff"
                          d="M6.225 4.811a1 1 0 0 0-1.414 1.414L10.586 12L4.81 17.775a1 1 0 1 0 1.414 1.414L12 13.414l5.775 5.775a1 1 0 0 0 1.414-1.414L13.414 12l5.775-5.775a1 1 0 0 0-1.414-1.414L12 10.586L6.225 4.81Z"
                        />
                      </svg>
                    </Button> */}
                  </ul>
                </div>
              </div>
            </nav>

            <div className="search_card_column">
              <Form action={ROUTES.PRODUCT_LISTING}>
                <div className="search_with_dropdonw">
                  <div className="dropdown_all_cat">
                    <UncontrolledDropdown>
                      <DropdownToggle ref={chooseCategoryRef}>
                        {chooseCategory.catName}
                        <span className="ms-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M12 14.975q-.2 0-.375-.062T11.3 14.7l-4.6-4.6q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275t.7.275t.275.7t-.275.7l-4.6 4.6q-.15.15-.325.213t-.375.062" /></svg>
                        </span>
                      </DropdownToggle>

                      <DropdownMenu className="category-list-menu">
                        <Button
                          onClick={() => {
                            setChooseCategory({
                              catName: "All Categories",
                              _id: "",
                            });
                            if (chooseCategoryRef.current) {
                              chooseCategoryRef.current.context.toggle();
                            }
                          }}
                        >
                          All Categories
                        </Button>
                        {data?.length
                          ? getCategoryList({
                            data,
                            setChooseCategory,
                            chooseCategoryRef,
                          })
                          : ""}
                      </DropdownMenu>
                    </UncontrolledDropdown>

                    <div className="dividerline_search"></div>

                    <div className="search_bar d-flex align-items-center">
                      <input
                        type="text"
                        id="search"
                        name="search"
                        placeholder="Search for Products Brands and more..."
                        defaultValue={search.get("search") || ""}
                      />
                      <input
                        type="hidden"
                        name="category"
                        value={chooseCategory._id}
                      />
                      <input
                        type="hidden"
                        name="catName"
                        value={chooseCategory.catName}
                      />
                    </div>
                  </div>
                  <button type="submit" className="search_button">
                    {searchicon}
                  </button>
                </div>
              </Form>
            </div>

            <UserAuthCard />
          </div>
        </Container>
        {/* <div className="search_card_column">
          <Form action={ROUTES.PRODUCT_LISTING}>
            <div className="search_with_dropdonw">
              <div className="dropdown_all_cat">
                <UncontrolledDropdown>
                  <DropdownToggle caret ref={chooseCategoryRef}>
                    {chooseCategory.catName}
                  </DropdownToggle>

                  <DropdownMenu className="category-list-menu">
                    <Button
                      onClick={() => {
                        setChooseCategory({
                          catName: "All Categories",
                          _id: "",
                        });
                        if (chooseCategoryRef.current) {
                          chooseCategoryRef.current.context.toggle();
                        }
                      }}
                    >
                      All Categories
                    </Button>
                    {data?.length
                      ? getCategoryList({
                        data,
                        setChooseCategory,
                        chooseCategoryRef,
                      })
                      : ""}
                  </DropdownMenu>
                </UncontrolledDropdown>

                <div className="dividerline_search"></div>

                <div className="search_bar d-flex align-items-center">
                  <input
                    type="text"
                    id="search"
                    name="search"
                    placeholder="Search for Products Brands and more..."
                    defaultValue={search.get("search") || ""}
                  />
                  <input
                    type="hidden"
                    name="category"
                    value={chooseCategory._id}
                  />
                  <input
                    type="hidden"
                    name="catName"
                    value={chooseCategory.catName}
                  />
                </div>
              </div>
              <button type="submit" className="search_button">
                {searchicon}
              </button>
            </div>
          </Form>
        </div> */}
      </section>

      <div className="menu_strip">
        <Homemenustrip />

        {/* {!pathname.includes("/all-categories") && <Homemenustrip />} */}
        {/* {pathname.includes("/all-categories") && <Categoriesstrip />} */}
      </div>
    </>
  );
}

const searchicon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 256 256"
  >
    <path
      fill="#fff"
      d="m228.24 219.76l-51.38-51.38a86.15 86.15 0 1 0-8.48 8.48l51.38 51.38a6 6 0 0 0 8.48-8.48M38 112a74 74 0 1 1 74 74a74.09 74.09 0 0 1-74-74"
    />
  </svg>
);

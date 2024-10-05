import React, { useEffect, useState } from "react";
import { Link, } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ROUTES from "../../../helpers/routesHelper";
import { apiGetCategories } from "../../../store/categories/actions";

// svg icon
import { Fashion } from "../../../assets/svg/index";
import imgone from "../../../assets/images/gursix.jpg";

export function Categories({ display, style = {} }) {
  const dispatch = useDispatch();
  const { data } = useSelector((s) => s.categories.categories);

  const [activeCategory, setActiveCategory] = useState("");
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);

  const handleMainMenuClick = (index) => {
    setIndex1(index);
    setIndex2(0);
    setActiveCategory(data[index]?.subcategories[0]?.catName || "");
  }

  const handleSubMenuClick = (index) => {
    setIndex2(index);
    setActiveCategory(data[index1]?.subcategories[index]?.catName || "");
  }

  useEffect(() => {
    dispatch(apiGetCategories({}));
  }, []);

  return (
    <>
      <div
        className="mega_menu_categorie text-start overflow-hidden"
        style={{ display, ...style }}
      >
        <div className="menu_inner_categories d-flex h-100">
          <ul>
            {data?.map((value, index) => (
              <li key={index} className={`${index1 === index ? "active" : ""} cursor-pointer`} onMouseEnter={() => handleMainMenuClick(index)}>
                <Link to={`${ROUTES.PRODUCT_LISTING}?skip=1&category=${value._id}`} className="d-flex align-items-center">
                  <div className="icon_set me-3">
                    {value?.catImage?.link ? (
                      <img src={value?.catImage?.link} height={20} width={20} />
                    ) : (
                      <Fashion />
                    )}
                  </div>
                  {value.catName}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="submenu">
            {data[index1]?.subcategories?.map((value, index) => (
              <li
                key={index}
                className={`${index2 === index ? "active" : ""} cursor-pointer`}
                onMouseEnter={() => handleSubMenuClick(index)}>
                <Link to={`${ROUTES.PRODUCT_LISTING}?skip=1&category=${value._id}`}>
                  {value.catName}
                </Link>
              </li>
            ))}
          </ul>

          {data[index1]?.subcategories[index2]?.subcategories?.length ? (
            <div className="whitebackground">
              <div className="carttitle_head d-flex align-item-center mb-3">
                <h4 className="m-0">{activeCategory}</h4>
                <span className="ms-3">{arrrowright}</span>
              </div>
              <ul className="submenu submenu_third_big w-100">
                {data[index1]?.subcategories[index2]?.subcategories?.map((value, index) => (
                  <li key={index} className="cursor-pointer">
                    <Link to={`${ROUTES.PRODUCT_LISTING}?skip=1&category=${value._id}`} className="text-center">
                      <div className="third_ul_img p-0">
                        <img
                          src={value?.catImage?.link || imgone}
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                      {value.catName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

const arrrowright = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 24 24"
  >
    <path
      fill="#f3b04c"
      d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m.2-9l-.9.9q-.275.275-.275.7t.275.7t.7.275t.7-.275l2.6-2.6q.3-.3.3-.7t-.3-.7l-2.6-2.6q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l.9.9H9q-.425 0-.712.288T8 12t.288.713T9 13z"
    />
  </svg>
);
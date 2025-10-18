import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productsOfCategory, setProductsOfCategory] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [sort, setSort] = useState("Default");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [productsData, setProductsData] = useState([]);

  const apiBase = "https://backend-gules-six-47.vercel.app/api";
  const productsURL = `${apiBase}/products`;
  const categoriesURL = `${apiBase}/categories`;

  
  useEffect(() => {
    setProductsData(productsOfCategory);
  }, [productsOfCategory]);

const getAllProducts = async () => {
  try {
  
    const { data: allProductsRes } = await axios.get(productsURL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const allProducts = allProductsRes.data;


    const categoriesResponse = await axios.get(categoriesURL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const categories = categoriesResponse.data.data;

    if (!Array.isArray(categories)) {
      console.error("Expected categories to be an array but got:", categories);
      return;
    }

  
    const categoryProducts = [];

    for (const category of categories) {
      try {
        const categoryRes = await axios.get(
          `${productsURL}/category/${category._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const productsInCategory = categoryRes.data.data;

        if (Array.isArray(productsInCategory)) {
          categoryProducts.push(...productsInCategory);
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          console.warn(`No products found for category: ${category.name}`);
        } else {
          console.error(
            `Error fetching products for category: ${category.name}`,
            err
          );
        }
      }
    }


    const combinedProducts = [...allProducts, ...categoryProducts];
    const uniqueProducts = Array.from(
      new Map(combinedProducts.map((p) => [p._id, p])).values()
    );

 
    setProducts(uniqueProducts);
    setProductsData(uniqueProducts);
  } catch (error) {
    console.error("Error fetching complete product list:", error);
  }
};



  const getCategoriesName = async () => {
    try {
      const { data } = await axios.get(categoriesURL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategoryName(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getProductsOfCategory = async (categoryId) => {
    try {
      const { data } = await axios.get(
        `${productsURL}/category/${categoryId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProductsOfCategory(data.data);
    } catch (error) {
      console.error("Error fetching category products:", error);
    }
  };

  const handelSortingData = (e) => {
    const value = e.target.value;
    const sortedProducts = [...products];

    switch (value) {
      case "Name(A-Z)":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Name(Z-A)":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Price(high:low)":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "Price(low:high)":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      default:
        getAllProducts();
        setSort("Default");
        return;
    }

    setSort(value);
    setProducts(sortedProducts);
  };

 
  useEffect(() => {
    getAllProducts();
    getCategoriesName();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        handelSortingData,
        sort,
        getCategoriesName,
        productsOfCategory,
        categoryName,
        getProductsOfCategory,
        token,
        setToken,
        productsData,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

import React, { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../../Apis/api";
import {
  Table,
  Button,
  Modal,
  Form,
  Spinner,
  Pagination,
} from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductsPanel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    discountId: "",
    rate: "",
    images: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem("token");

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const res = await getProducts(token, page);
      setProducts(res.data.data);
      setTotalPages(res.data.pages);
      setCurrentPage(page);
    } catch (error) {
      toast.error("Failed to load products!");
      console.error(error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, []);

  // eslint-disable-next-line no-unused-vars
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData({ ...formData, images: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      categoryId: "",
      discountId: "",
      rate: "",
      images: [],
    });
    setSelectedProduct(null);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "images") {
          for (let i = 0; i < formData.images.length; i++) {
            form.append("images", formData.images[i]);
          }
        } else {
          form.append(key, formData[key]);
        }
      });
      await addProduct(token, form);
      toast.success("Product added successfully!");
      setShowAddModal(false);
      fetchProducts(currentPage);
      resetForm();
    } catch (error) {
      toast.error("Failed to add product!");
      console.error("Add product error:", error);
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    if (!selectedProduct) return;
    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "images") {
          for (let i = 0; i < formData.images.length; i++) {
            form.append("images", formData.images[i]);
          }
        } else {
          form.append(key, formData[key]);
        }
      });
      await updateProduct(token, selectedProduct._id, form);
      toast.success("Product updated successfully!");
      setShowEditModal(false);
      fetchProducts(currentPage);
      resetForm();
    } catch (error) {
      toast.error("Failed to update product!");
      console.error("Edit product error:", error);
    }
  };

  const handleDeleteProduct = (id) => {
    toast.info(
      <div>
        <p>Are you sure you want to delete this product?</p>
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <Button
            size="sm"
            variant="danger"
            onClick={async () => {
              try {
                await deleteProduct(token, id);
                toast.dismiss();
                toast.success("Product deleted successfully!");
                if (products.length === 1 && currentPage > 1) {
                  fetchProducts(currentPage - 1);
                } else {
                  fetchProducts(currentPage);
                }
              } catch (error) {
                toast.error("Failed to delete product!");
                console.error("Delete product error:", error);
              }
            }}
          >
            Confirm
          </Button>
          <Button size="sm" variant="secondary" onClick={() => toast.dismiss()}>
            Cancel
          </Button>
        </div>
      </div>,
      { autoClose: false }
    );
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      stock: product.stock || "",
      categoryId: product.categoryId?._id || "",
      discountId: product.discountId?._id || "",
      rate: product.rate || "",
      images: [],
    });
    setShowEditModal(true);
  };

  const renderPagination = () => {
    let items = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
      items.push(
        <Pagination.Item key={1} onClick={() => fetchProducts(1)}>
          1
        </Pagination.Item>
      );
      if (startPage > 2) {
        items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
      }
    }

    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => fetchProducts(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
      }
      items.push(
        <Pagination.Item
          key={totalPages}
          onClick={() => fetchProducts(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    return (
      <Pagination
        className="justify-content-center mt-3"
        style={{ userSelect: "none" }}
      >
        <Pagination.Prev
          onClick={() => currentPage > 1 && fetchProducts(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {items}
        <Pagination.Next
          onClick={() =>
            currentPage < totalPages && fetchProducts(currentPage + 1)
          }
          disabled={currentPage === totalPages}
        />
      </Pagination>
    );
  };

  return (
    <div className="container-fluid mt-4 px-3 px-md-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mb-3">
        <h3>Products Management</h3>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          + Add Product
        </Button>
      </div>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <div className="table-container">
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Rate</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product._id}>
                      <td data-label="Name">{product.name}</td>
                      <td data-label="Description">{product.description}</td>
                      <td data-label="Price">{product.price}</td>
                      <td data-label="Stock">{product.stock}</td>
                      <td data-label="Rate">{product.rate}</td>
                      <td data-label="Actions" className="action-buttons">
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => openEditModal(product)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteProduct(product._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          {renderPagination()}
        </>
      )}
    </div>
  );
};

export default ProductsPanel;

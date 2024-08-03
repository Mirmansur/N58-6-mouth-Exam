import "../pages/Home.css";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { toast } from "react-toastify";
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/deled.svg";
import { HiPlusSm } from "react-icons/hi";
import { Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const API_URL = "https://66a9fe90613eced4eba71d31.mockapi.io/category";

const intialState = {
  id: null,
  name: "",
  code: "",
  brand: "",
  price: 0,
  priceInSale: 0,
};
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState(intialState);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
      toast.error();
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      id: product.id,
      name: product.name,
      code: product.code,
      brand: product.brand,
      price: product.price,
      priceInSale: product.priceInSale,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`${API_URL}/${formData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error();
      }
      toast.success();
      setShowModal(false);
      fetchProducts();
    } catch (error) {
      console.error(error);
      toast.error();
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const confirmed = window.confirm("Rostanham o'chirishni hohlaysizmi");
      if (confirmed) {
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error();
        }
        setProducts(products.filter((product) => product.id !== id));
        toast.success();
      } else {
        console.log("Deletion canceled by user");
      }
    } catch (error) {
      console.error(error);
      toast.error();
    } finally {
      setLoading(false);
    }
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.trim().toLowerCase());
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
  );

  let table = filteredProducts.map((product) => (
    <tr key={product.id}>
      <td className="td">{product.name}</td>
      <td className="td">{product.code}</td>
      <td className="td">{product.brand}</td>
      <td className="td"> {product.price}</td>
      <td className="td">{product.priceInSale}</td>
      <td>
        <Button variant="light" onClick={() => handleEdit(product)}>
          <img src={editIcon} alt="Edit" />
        </Button>{" "}
        <Button variant="light" onClick={() => handleDelete(product.id)}>
          <img src={deleteIcon} alt="Delete" />
        </Button>
      </td>
    </tr>
  ));

  return (
    <div className="Home">
      <div className="home-start">
        <h2>Товары</h2>
        <p>Главная / Товары</p>
      </div>
      {loading && (
        <h1>
          <Loading />
        </h1>
      )}
      <div className="home-main">
        <div className="main">
          <div className="main-start">
            <div className="header_row">
              <div className="start-h2">
                <h2>Все товары ({products.length})</h2>
              </div>
              <div className="start-input">
                <CiSearch className="search" />
                <input
                  type="text"
                  placeholder="Поиск по имя"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
          <div className="main-table"></div>
          <table className="tableALLL">
            <tr>
              <th className="th">Наименование</th>
              <th className="th">Код</th>
              <th className="th">Бренд</th>
              <th className="th">Цена</th>
              <th className="th">Цена со скидкой</th>
              <th className="th">Действия</th>
            </tr>
            {table}
          </table>
          <div className="main-finish"></div>
        </div>
      </div>

      <div className="home-finish">
        <Link to="/about">
          {" "}
          <Button>
            <HiPlusSm className="icons" />
            Новый товар
          </Button>
        </Link>
        <p>© Anymarket 2022</p>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formCode">
              <Form.Label>Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter article"
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formBrand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formDiscountedPrice">
              <Form.Label>priceInSale</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter priceInSale"
                value={formData.priceInSale}
                onChange={(e) =>
                  setFormData({ ...formData, priceInSale: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Изменения
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;

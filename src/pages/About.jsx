import { useState } from "react";
import { Button } from "react-bootstrap";
import "../pages/About.css";
import Loading from "./Loading";

const API_URL = "http://localhost:3000/products";

const About = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [code, setCode] = useState("");
  const [price, setPrice] = useState("");
  const [priceInSale, setPriceInSale] = useState("");
  const [loading, setLoading] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          brand,
          code,
          price: parseFloat(price),
          priceInSale: parseFloat(priceInSale),
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      setName("");
      setBrand("");
      setCode("");
      setPrice("");
      setPriceInSale("");

      alert("Maxsulot saqlandi");
    } catch (error) {
      console.error(error);
      alert();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="About">
      {loading && (
        <h1>
          <Loading />
        </h1>
      )}
      <div className="about-start">
        <h2>Новый товар</h2>
        <p>Главная / Товары / Новый товар</p>
      </div>
      <div className="about-main">
        <div className="about-one">
          <button>Основные</button>
        </div>
        <div className="about-two">
          <div className="two-start">
            <p>Название *</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="two-finish">
            <div className="brend">
              <p>Бренд *</p>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="cod">
              <p>Артикул производителя *</p>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="about-four">
          <div className="four-start">
            <p>Цена</p>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="four-finish">
            <p>Цена со скидкой</p>
            <input
              type="number"
              value={priceInSale}
              onChange={(e) => setPriceInSale(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="about-finish">
        <Button onClick={handleSubmit}>Сохранить</Button>
        <Button>Отмена</Button>
      </div>
    </div>
  );
};

export default About;

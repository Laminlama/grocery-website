import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  ProductItem,
  QuantityInput,
} from "../components";
import { useParams } from "react-router-dom";
import { addProductToTheCart } from "../features/cart/cartSlice";
import { useAppDispatch } from "../hooks";
import WithNumberInputWrapper from "../utils/withNumberInputWrapper";
import { formatCategoryName } from "../utils/formatCategoryName";
import toast from "react-hot-toast";

const SingleProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  // HOC instance
  const QuantityInputUpgrade = WithNumberInputWrapper(QuantityInput);

  // Function to generate a random price between $3 and $35
  const generatePrice = (): number => {
    return parseFloat((Math.random() * (35 - 3) + 3).toFixed(2));
  };

  // Fetch and update product data
  useEffect(() => {
    const fetchSingleProduct = async () => {
      const response = await fetch(`http://localhost:5000/products/${params.id}`);
      const data = await response.json();

      // Update the price of the single product
      setSingleProduct({
        ...data,
        price: generatePrice(),
      });
    };

    const fetchProducts = async () => {
      const response = await fetch("http://localhost:5000/products");
      const data = await response.json();

      // Update prices of all products
      const updatedProducts = data.map((product: Product) => ({
        ...product,
        price: generatePrice(),
      }));
      setProducts(updatedProducts);
    };

    fetchSingleProduct();
    fetchProducts();
  }, [params.id]);

  const handleAddToCart = () => {
    if (singleProduct) {
      dispatch(
        addProductToTheCart({
          id: singleProduct.id,
          image: singleProduct.image,
          title: singleProduct.title,
          category: singleProduct.category,
          price: singleProduct.price,
          quantity,
          popularity: singleProduct.popularity,
          stock: singleProduct.stock,
        })
      );
      toast.success("Product added to the cart");
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-5 max-[400px]:px-3">
      <div className="grid grid-cols-3 gap-x-8 max-lg:grid-cols-1">
        <div className="lg:col-span-2">
          <img
            src={`/src/assets/${singleProduct?.image}`}
            alt={singleProduct?.title}
          />
        </div>
        <div className="w-full flex flex-col gap-5 mt-9">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl">{singleProduct?.title}</h1>
            <div className="flex justify-between items-center">
              <p className="text-base text-secondaryBrown">
                {formatCategoryName(singleProduct?.category || "")}
              </p>
              <p className="text-base font-bold">
                ${singleProduct?.price?.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <QuantityInputUpgrade
              value={quantity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuantity(() => parseInt(e.target.value))
              }
            />
          </div>
          <div className="flex flex-col gap-3">
            <Button mode="brown" text="Add to cart" onClick={handleAddToCart} />
            <p className="text-secondaryBrown text-sm text-right">
              Delivery estimated on the Friday, July 26
            </p>
          </div>
          <div>
            <Dropdown dropdownTitle="Description">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </Dropdown>
            <Dropdown dropdownTitle="Product Details">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </Dropdown>
            <Dropdown dropdownTitle="Delivery Details">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </Dropdown>
          </div>
        </div>
      </div>

      {/* similar products */}
      <div>
        <h2 className="text-black/90 text-5xl mt-24 mb-12 text-center max-lg:text-4xl">
          Similar Products
        </h2>
        <div className="flex flex-wrap justify-between items-center gap-y-8 mt-12 max-xl:justify-start max-xl:gap-5">
          {products.slice(0, 3).map((product: Product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              category={product.category}
              price={product.price.toFixed(2)}
              popularity={product.popularity}
              stock={product.stock}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;

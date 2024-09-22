import { useLoaderData } from "react-router-dom";
import { bookLoader } from "../loaders/bookLoader";
import Banner from "../components/banner";
import Product from "../components/product";
import ProductList from "../components/product-list";
import { useBasket } from "../hooks/useBasket";

export default function Home() {
  const data = useLoaderData() as Awaited<ReturnType<typeof bookLoader>>;
  const { handleAddToBasket } = useBasket();
  return (
    <div>
      <Banner />
      <ProductList>
        {data.map((product) => {
          return (
            <Product
              key={product.sku}
              product={product}
              addToBasket={handleAddToBasket}
            />
          );
        })}
      </ProductList>
    </div>
  );
}

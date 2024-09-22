import { useLoaderData } from "react-router-dom";
import { bookLoader } from "../loaders/bookLoader";
import Banner from "../components/banner";
import Product from "../components/product";
import ProductList from "../components/product-list";

export default function Home() {
  const data = useLoaderData() as Awaited<ReturnType<typeof bookLoader>>;
  return (
    <div>
      <Banner />
      <ProductList>
        {data.map(({ name, sku, price }) => {
          return <Product key={sku} name={name} sku={sku} price={price} />;
        })}
      </ProductList>
    </div>
  );
}

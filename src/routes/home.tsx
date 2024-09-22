import { useLoaderData } from "react-router-dom";
import { bookLoader } from "../loaders/bookLoader";

export default function Home() {
  const data = useLoaderData() as Awaited<ReturnType<typeof bookLoader>>;
  return (
    <div>
      {data.map(({ name, sku, price }) => {
        return (
          <div key={sku}>
            <div>{name}</div>
            <div>{price}</div>
          </div>
        );
      })}
    </div>
  );
}

import "./product-list.css";

interface ProductListProps {
  children: React.ReactNode;
}

export default function ProductList({ children }: ProductListProps) {
  return <div className="products">{children}</div>;
}

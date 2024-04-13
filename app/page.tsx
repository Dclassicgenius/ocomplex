import CardList from "@/components/CardList/CardList";
import ProductCard from "@/components/Cards/ProductCard";
import { getProducts } from "@/lib/actions/product.actions";
export default async function Home() {
  const data = await getProducts(1);
  const products = data?.products ?? [];
  return (
    <main className="min-h-screen max-w-[1300px] mx-auto">
      <div className="p-7 grid gap-4">
        <div className="">
          <ProductCard products={products} />
        </div>

        <CardList />
      </div>
    </main>
  );
}

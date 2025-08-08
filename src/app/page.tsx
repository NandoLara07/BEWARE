import { desc } from "drizzle-orm";
import Image from "next/image";

import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import Partners from "@/components/common/partners";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });

  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });

  const categories = await db.query.categoryTable.findMany({});
  return (
    <>
      <Header />
      <div className="space-y-6">
        {/* Banner Mobile */}
        <div className="block px-5 sm:hidden">
          <Image
            src="/banner-01.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        {/* Banner Desktop */}
        <div className="hidden px-6 sm:block">
          <Image
            src="/banner-01-desktop.png" // imagem horizontal (desktop)
            alt="Leve uma vida com estilo"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        <Partners />

        <ProductList title="Mais vendidos" products={products} />

        <div className="px-5">
          <CategorySelector categories={categories} />
        </div>

        <div className="block px-5 sm:hidden">
          {/* Banner Mobile */}
          <Image
            src="/banner-02.png"
            alt="Seja Autêntico"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        {/* Banner Desktop */}
        <div className="hidden px-6 sm:block">
          <Image
            src="/banner-02-desktop.png" // imagem horizontal (desktop)
            alt="Leve uma vida com estilo"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        <ProductList title="Novos produtos" products={newlyCreatedProducts} />

        <Footer />
      </div>
    </>
  );
};

export default Home;

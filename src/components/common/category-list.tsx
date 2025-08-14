import Link from "next/link";

const CategoryList = () => {
  return (
    <>
      <div className="flex flex-col">
        <Link href="/category/camisetas">
          <p className="font-medium">Camisetas</p>
        </Link>
        <Link href="/category/bermuda-shorts" className="mt-3">
          <p className="font-medium">Bermuda & Shorts</p>
        </Link>
        <Link href="/category/calas" className="mt-3">
          <p className="font-medium">Calças</p>
        </Link>
        <Link href="/category/jaquetas-moletons" className="mt-3">
          <p className="font-medium">Jaquetas & Moletons</p>
        </Link>
        <Link href="/category/tnis" className="mt-3">
          <p className="font-medium">Tênis</p>
        </Link>
        <Link href="/category/acessrios" className="mt-3">
          <p className="font-medium">Acessórios</p>
        </Link>
      </div>
    </>
  );
};

export default CategoryList;

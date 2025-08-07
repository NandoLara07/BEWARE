import Image from "next/image";

import { Button } from "../ui/button";

const Partners = () => {
  return (
    <div className="space-y-6">
      <h3 className="px-5 font-semibold">Marcas parceiras</h3>
      <div className="flex w-full gap-6 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        <div className="flex flex-col items-center gap-y-2">
          <Button
            variant="outline"
            size="icon"
            className="pointer-events-none flex h-20 w-20 items-center justify-center rounded-3xl"
          >
            <Image src="/partners/Nike.svg" alt="Nike" width={32} height={32} />
          </Button>
          <p className="font-poppins text-[12px] leading-[115%] font-medium tracking-[0px] text-black">
            Nike
          </p>
        </div>

        <div className="flex flex-col items-center gap-y-2">
          <Button
            variant="outline"
            size="icon"
            className="pointer-events-none flex h-20 w-20 items-center justify-center rounded-3xl"
          >
            <Image
              src="/partners/Adidas.svg"
              alt="Adidas"
              width={32}
              height={32}
            />
          </Button>
          <p className="font-poppins text-[12px] leading-[115%] font-medium tracking-[0px] text-black">
            Adidas
          </p>
        </div>

        <div className="flex flex-col items-center gap-y-2">
          <Button
            variant="outline"
            size="icon"
            className="pointer-events-none flex h-20 w-20 items-center justify-center rounded-3xl"
          >
            <Image src="/partners/Puma.svg" alt="Puma" width={32} height={32} />
          </Button>
          <p className="font-poppins text-[12px] leading-[115%] font-medium tracking-[0px] text-black">
            Puma
          </p>
        </div>

        <div className="flex flex-col items-center gap-y-2">
          <Button
            variant="outline"
            size="icon"
            className="pointer-events-none flex h-20 w-20 items-center justify-center rounded-3xl"
          >
            <Image
              src="/partners/New Balance.svg"
              alt="New Balance"
              width={32}
              height={32}
            />
          </Button>
          <p className="w-20 truncate text-center text-[12px] leading-[115%] font-medium tracking-[0px] text-black">
            New Balance
          </p>
        </div>

        <div className="flex flex-col items-center gap-y-2">
          <Button
            variant="outline"
            size="icon"
            className="pointer-events-none flex h-20 w-20 items-center justify-center rounded-3xl"
          >
            <Image
              src="/partners/Converse.svg"
              alt="Converse"
              width={32}
              height={32}
            />
          </Button>
          <p className="w-20 truncate text-center text-[12px] leading-[115%] font-medium tracking-[0px] text-black">
            Converse
          </p>
        </div>

        <div className="flex flex-col items-center gap-y-2">
          <Button
            variant="outline"
            size="icon"
            className="pointer-events-none flex h-20 w-20 items-center justify-center rounded-3xl"
          >
            <Image src="/partners/Polo.svg" alt="Polo" width={32} height={32} />
          </Button>
          <p className="w-20 truncate text-center text-[12px] leading-[115%] font-medium tracking-[0px] text-black">
            Polo
          </p>
        </div>

        <div className="flex flex-col items-center gap-y-2">
          <Button
            variant="outline"
            size="icon"
            className="pointer-events-none flex h-20 w-20 items-center justify-center rounded-3xl"
          >
            <Image src="/partners/Zara.svg" alt="Zara" width={32} height={32} />
          </Button>
          <p className="w-20 truncate text-center text-[12px] leading-[115%] font-medium tracking-[0px] text-black">
            Zara
          </p>
        </div>
      </div>
    </div>
  );
};

export default Partners;

import { navLists } from "@/constant";
import { appleImg, searchImg, bagImg } from "@/utils";
import Image from "next/image";

const Header = () => {
  return (
    <header className="w-full max-sm:px-4 sm:px-10 md:px-7 px-10 pt-5 ">
      <div className="w-full flex max-sm:justify-between sm:justify-between md:justify-around">
        <Image src={appleImg} alt="appleImg" width={14} height={18} />
        <div className="flex justify-center items-center gap-8 max-md:hidden  ">
          {navLists.map((nav) => (
            <div className="text-gray hover:text-white font-bold capitalize">
              {nav}
            </div>
          ))}
        </div>
        <div className=" flex gap-3 items-center">
          <Image src={searchImg} alt="searchImg" width={14} height={18} />
          <Image src={bagImg} alt="bagImg" width={14} height={18} />
        </div>
      </div>
    </header>
  );
};

export default Header;

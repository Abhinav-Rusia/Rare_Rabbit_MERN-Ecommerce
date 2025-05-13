import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
const Topbar = () => {
  return (
    <div className="bg-[#d42935] text-white">
      <div className="container mx-auto flex justify-between py-2 px-3">
        <div className=" hidden md:flex items-center space-x-4">
          <a href="#" className="hover:text-gray-300">
            <TbBrandMeta className="h-5 w-5" />
          </a>

          <a href="#" className="hover:text-gray-300">
            <IoLogoInstagram className="h-5 w-5" />
          </a>

          <a href="#" className="hover:text-gray-300">
            <RiTwitterXLine className="h-4 w-4" />
          </a>
        </div>
        <div className="text-sm text-center flex-grow">
          <span>We Ship Worldwide - fast and reliable delivery service.</span>
        </div>

        <div className="text-sm">
          <a className="hidden md:block hover:text-[#303624]" href="+1234567890">
            tel: +1 234 567-890
          </a>
        </div>
      </div>
    </div>
  );
};
export default Topbar;

import { Link } from "react-router-dom";

function Categories() {
  return (
    <div className="mb-6">
      <h2 className="font-bold text-2xl text-right mb-8">دسته بندی ها</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-8 md:px-6">
        <Link className="flex flex-col justify-center items-center">
          <div className="h-20 w-20 relative">
            <img
              src="/categories/smartWatch.png"
              alt="دسته بندی ساعت هوشمند"
              className="h-full w-full z-30 relative"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-surface rounded-full z-10 backdrop-blur-md shadow-md"></div>
          </div>
          <span className="mt-7 font-semibold">ساعت هوشمند</span>
        </Link>
        <Link className="flex flex-col justify-center items-center">
          <div className="h-20 w-20 relative">
            <img
              src="/categories/samsung.avif"
              alt="دسته بندی سامسونگ "
              className="h-full w-full z-30 relative object-contain"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-surface rounded-full z-10 backdrop-blur-md shadow-md"></div>
          </div>
          <span className="mt-7 font-semibold">سامسونگ</span>
        </Link>
        <Link className="flex flex-col justify-center items-center">
          <div className="h-20 w-20 relative">
            <img
              src="/categories/iphone.jpg"
              alt="دسته بندی اپل "
              className="h-full w-full z-30 relative object-contain"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-surface rounded-full z-10 backdrop-blur-md shadow-md"></div>
          </div>
          <span className="mt-7 font-semibold">آیفون</span>
        </Link>
        <Link className="flex flex-col justify-center items-center">
          <div className="h-20 w-20 relative">
            <img
              src="/categories/honor.png"
              alt="دسته هانر "
              className="h-full w-full z-20 relative object-contain"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-surface rounded-full z-10 backdrop-blur-md shadow-md"></div>
          </div>
          <span className="mt-7 font-semibold">هانر</span>
        </Link>
        <Link className="flex flex-col justify-center items-center">
          <div className="h-20 w-20 relative">
            <img
              src="/categories/xiaomi.png"
              alt="دسته شیایومی "
              className="h-full w-full z-30 relative object-contain"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-surface rounded-full z-10 backdrop-blur-md shadow-md"></div>
          </div>
          <span className="mt-7 font-semibold">شیائومی</span>
        </Link>
      </div>
    </div>
  );
}

export default Categories;

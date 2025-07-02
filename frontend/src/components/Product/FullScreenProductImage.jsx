import { FaCompress } from "react-icons/fa";

function FullScreenProductImage({
  fullscreenImage,
  setFullscreenImage,
  imageGallery,
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col">
      <div className="flex justify-between items-center p-4 bg-black">
        <button
          onClick={() => setFullscreenImage(null)}
          className="btn btn-ghost text-white"
          aria-label="بستن تصویر"
        >
          <FaCompress />
        </button>
        <span className="text-white">
          {imageGallery.findIndex((img) => img.src === fullscreenImage) + 1} /{" "}
          {imageGallery.length}
        </span>
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
        <img
          src={fullscreenImage}
          alt="تصویر بزرگ محصول"
          className="max-h-full max-w-full object-contain"
          onError={(e) => {
            e.target.src = "/images/placeholder-product.png";
          }}
        />
      </div>
      <div className="p-4 bg-black flex justify-between">
        <button
          onClick={() => {
            const currentIndex = imageGallery.findIndex(
              (img) => img.src === fullscreenImage
            );
            const prevIndex =
              (currentIndex - 1 + imageGallery.length) % imageGallery.length;
            setFullscreenImage(imageGallery[prevIndex].src);
          }}
          className="btn btn-ghost text-white"
          aria-label="تصویر قبلی"
        >
          <FaChevronRight />
        </button>
        <button
          onClick={() => {
            const currentIndex = imageGallery.findIndex(
              (img) => img.src === fullscreenImage
            );
            const nextIndex = (currentIndex + 1) % imageGallery.length;
            setFullscreenImage(imageGallery[nextIndex].src);
          }}
          className="btn btn-ghost text-white"
          aria-label="تصویر بعدی"
        >
          <FaChevronLeft />
        </button>
      </div>
    </div>
  );
}

export default FullScreenProductImage;

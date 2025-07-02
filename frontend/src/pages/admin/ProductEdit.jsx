import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useUpdateProductMutation,
  useGetProductByIdQuery,
  useUploadProductImagesMutation,
  useDeleteProductImagesMutation,
} from "../../store/slices/api/productApiSlice";
import Loader from "../../components/UI/Loader";
import Message from "../../components/Message";
import SEOMeta from "../../components/SEOMeta";

function ProductEdit() {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    _id: "",
    name: "",
    price: "",
    brand: "",
    category: "",
    countInStock: "",
    description: "",
    images: [],
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const {
    data: productData,
    refetch,
    isLoading: isLoadingProduct,
    error: getProductError,
  } = useGetProductByIdQuery(productId);

  const [updateProduct, { isLoading: isUpdating, error: updateError }] =
    useUpdateProductMutation();
  const [
    uploadProductImages,
    { isLoading: isUploading, error: imageUploadError },
  ] = useUploadProductImagesMutation();
  const [deleteProductImages, { isLoading: isDeleting }] =
    useDeleteProductImagesMutation();

  useEffect(() => {
    if (productData) {
      setProduct({
        ...productData,
        price: productData.price || "",
        countInStock: productData.countInStock || "",
        images: productData.images || [],
      });
      setErrors({});
      setTouched({});
    }
  }, [productData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProduct((prev) => ({ ...prev, [id]: value }));
    setTouched((prev) => ({ ...prev, [id]: true }));

    validateField(id, value);
  };

  const validateField = (id, value) => {
    let error = "";
    switch (id) {
      case "name":
        if (!value.trim()) error = "نام محصول الزامی است";
        break;
      case "price":
        if (!value || Number(value) <= 0) error = "قیمت باید بیشتر از صفر باشد";
        break;
      case "category":
        if (!value.trim()) error = "دسته‌بندی الزامی است";
        break;
      case "images":
        if (!product.images.length) error = "حداقل یک تصویر باید انتخاب شود";
        break;
      default:
        break;
    }

    setErrors((prev) => {
      const newErrors = { ...prev };
      if (error) newErrors[id] = error;
      else delete newErrors[id];
      return newErrors;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!product.name.trim()) newErrors.name = "نام محصول الزامی است";
    if (!product.price || Number(product.price) <= 0)
      newErrors.price = "قیمت باید بیشتر از صفر باشد";
    if (!product.category.trim()) newErrors.category = "دسته‌بندی الزامی است";
    if (!product.images.length) newErrors.images = "حداقل یک تصویر انتخاب کنید";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("لطفاً خطاهای فرم را برطرف کنید");
      return;
    }

    try {
      await updateProduct(product).unwrap();
      toast.success("محصول با موفقیت به‌روزرسانی شد");
      await refetch();
      navigate("/admin/productlist");
    } catch (err) {
      toast.error(
        err?.data?.message || err.message || "خطا در به‌روزرسانی محصول"
      );
    }
  };

  const uploadImageHandler = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) {
      toast.error("حداقل یک فایل انتخاب کنید");
      return;
    }

    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await uploadProductImages({ productId, formData }).unwrap();
        toast.success(res.message);
        setProduct((prev) => ({
          ...prev,
          images: [res.url, ...prev.images],
        }));
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }

    validateField("images", product.images);
  };

  const deleteImageHandler = async (imageUrl) => {
    if (!window.confirm("آیا از حذف این تصویر مطمئن هستید؟")) return;

    try {
      await deleteProductImages({ productId, imageUrl }).unwrap();

      setProduct((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img !== imageUrl),
      }));

      toast.success("تصویر با موفقیت حذف شد");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const setAsMainImage = (imageUrl) => {
    setProduct((prev) => ({
      ...prev,
      images: [imageUrl, ...prev.images.filter((img) => img !== imageUrl)],
    }));
    toast.success("تصویر اصلی با موفقیت تغییر کرد");
  };

  return (
    <>
      <SEOMeta
        title={`ویرایش محصول | ${product.name} | مدیریت | فروشگاه بارین`}
        description={`جزئیات محصول ${product.name} را در پنل مدیریت فروشگاه بارین ویرایش کنید.`}
        keywords="ویرایش محصول، مدیریت، فروشگاه اینترنتی، فروشگاه بارین"
        canonical={window.location.href}
        openGraph={{
          title: `ویرایش محصول | ${product.name} | مدیریت | فروشگاه بارین`,
          description: `جزئیات محصول ${product.name} را در پنل مدیریت فروشگاه بارین ویرایش کنید.`,
          url: window.location.href,
        }}
      />

      <div className="flex justify-end mb-4">
        <Link to="/admin/productlist" className="btn btn-outline btn-sm">
          بازگشت
        </Link>
      </div>

      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 rtl">
        <h1 className="text-xl font-bold mb-6 text-right">ویرایش محصول</h1>

        {(isUpdating || isUploading || isDeleting) && <Loader />}

        {[getProductError, updateError, imageUploadError].map(
          (err, i) =>
            err && (
              <Message key={i} type="danger">
                {err?.data?.message || err.message}
              </Message>
            )
        )}

        {isLoadingProduct ? (
          <Loader />
        ) : (
          <form onSubmit={submitHandler} className="space-y-4">
            {[
              { id: "name", label: "نام", type: "text", required: true },
              { id: "price", label: "قیمت", type: "number", required: true },
              { id: "brand", label: "برند", type: "text" },
              { id: "countInStock", label: "موجودی", type: "number" },
            ].map(({ id, label, type, required }) => (
              <div className="form-control" key={id}>
                <label htmlFor={id} className="label justify-end">
                  <span className="label-text">
                    {label}
                    {required && <span className="text-red-500 mr-1">*</span>}
                  </span>
                </label>
                <input
                  id={id}
                  type={type}
                  className={`input input-bordered input-sm w-full ${
                    errors[id] ? "input-error" : ""
                  }`}
                  value={product[id]}
                  onChange={handleChange}
                  placeholder={`${label} را وارد کنید`}
                />
                {errors[id] && touched[id] && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors[id]}
                  </span>
                )}
              </div>
            ))}

            <div className="form-control">
              <label htmlFor="description" className="label justify-end">
                <span className="label-text">توضیحات</span>
              </label>
              <textarea
                id="description"
                className="textarea textarea-bordered w-full"
                value={product.description}
                onChange={handleChange}
                placeholder="توضیحات محصول را وارد کنید"
                rows={3}
              />
            </div>

            <div className="form-control">
              <label htmlFor="category" className="label justify-end">
                <span className="label-text">دسته‌بندی</span>
              </label>
              <select
                id="category"
                className={`select select-bordered w-full ${
                  errors.category ? "select-error" : ""
                }`}
                value={product.category}
                onChange={handleChange}
              >
                <option value="">انتخاب کنید</option>
                <option value="electronics">الکترونیک</option>
                <option value="clothing">پوشاک</option>
                <option value="home">مبلمان و لوازم خانگی</option>
              </select>
              {errors.category && touched.category && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.category}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label justify-end">
                <span className="label-text">تصاویر محصول</span>
                {errors.images && (
                  <span className="text-red-500 text-xs">{errors.images}</span>
                )}
              </label>

              {product.images.length > 0 ? (
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {product.images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt={`Product ${index + 1}`}
                        className={`rounded-lg h-24 w-full object-cover ${
                          index === 0 ? "ring-2 ring-primary" : ""
                        }`}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                        <button
                          type="button"
                          aria-label="Set as main image"
                          onClick={() => setAsMainImage(img)}
                          className="btn btn-xs btn-primary"
                          disabled={index === 0}
                        >
                          {index === 0 ? "اصلی" : "انتخاب اصلی"}
                        </button>
                        <button
                          type="button"
                          aria-label="Delete image"
                          onClick={() => deleteImageHandler(img)}
                          className="btn btn-xs btn-error"
                          disabled={isDeleting}
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  تصویری وجود ندارد
                </div>
              )}

              <div className="mt-4">
                <label htmlFor="imageUpload" className="label justify-end">
                  <span className="label-text">افزودن تصاویر جدید</span>
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  multiple
                  accept="image/*"
                  className="file-input file-input-bordered file-input-sm w-full"
                  onChange={uploadImageHandler}
                  disabled={isUploading}
                />
                {isUploading && (
                  <span className="text-sm text-gray-500 mt-1 block">
                    در حال آپلود تصاویر...
                  </span>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-sm w-full mt-4"
              disabled={isUpdating}
            >
              {isUpdating ? "در حال به‌روزرسانی..." : "به‌روزرسانی محصول"}
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default ProductEdit;

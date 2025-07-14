import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../store/slices/api/productApiSlice";
import {
  HiOutlineTrash,
  HiOutlinePencilAlt,
  HiOutlinePlus,
} from "react-icons/hi";
import Loader from "../../components/UI/Loader";
import Message from "../../components/UI/Message";
import Button from "../../components/UI/Button";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import Paginate from "../../components/UI/Paginate";
import SEOMeta from "../../components/Util/SEOMeta";
import { formatNumber } from "../../utils/toPersianDigits";
import { useEffect, useMemo, useState } from "react";

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("keyword") || "");
  const [sortColumn, setSortColumn] = useState("name");
  const [sortAsc, setSortAsc] = useState(true);

  const navigate = useNavigate();

  const pageNumber = parseInt(searchParams.get("page") || "1");

  const {
    data: productsData,
    refetch,
    isLoading,
    error,
  } = useGetProductsQuery({ page: pageNumber, keyword: search });

  const [createProduct, { isLoading: creating, error: createError }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: deleting, error: deleteError }] =
    useDeleteProductMutation();

  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    if (createError)
      toast.error(createError?.data?.message || "خطا در ایجاد محصول");
    if (deleteError)
      toast.error(deleteError?.data?.message || "خطا در حذف محصول");
  }, [createError, deleteError]);

  const filteredProducts = useMemo(() => {
    if (!productsData?.products) return [];

    const sorted = [...productsData.products].sort((a, b) => {
      const valA = a[sortColumn];
      const valB = b[sortColumn];
      if (typeof valA === "string") {
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortAsc ? valA - valB : valB - valA;
    });

    return sorted;
  }, [productsData, sortColumn, sortAsc]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortAsc(!sortAsc);
    } else {
      setSortColumn(column);
      setSortAsc(true);
    }
  };

  const deleteHandler = async (id) => {
    try {
      await deleteProduct(id).unwrap();
      toast.success("محصول با موفقیت حذف شد");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
    setDeleteTarget(null);
  };

  const handleCreate = async () => {
    try {
      const { data } = await createProduct().unwrap();
      toast.success("محصول جدید با موفقیت ایجاد شد");
      navigate(`/admin/product/${data._id}/edit`);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ keyword: search });
  };

  return (
    <div className="container mx-auto p-4 space-y-6 mb-auto">
      <SEOMeta
        title="لیست محصولات | مدیریت | فروشگاه بارین"
        description="نمایش و مدیریت محصولات توسط مدیر در فروشگاه اینترنتی بارین."
        keywords="لیست محصولات، مدیریت، فروشگاه، بارین"
        canonical={window.location.href}
        openGraph={{
          title: "لیست محصولات | مدیریت | فروشگاه بارین",
          description:
            "نمایش و مدیریت محصولات توسط مدیر در فروشگاه اینترنتی بارین.",
          url: window.location.href,
        }}
      />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">مدیریت محصولات</h1>

        <form onSubmit={handleSearch} className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="جستجو..."
            className="input input-bordered input-sm w-full max-w-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button type="submit" size="sm">
            جستجو
          </Button>
        </form>

        <button
          onClick={handleCreate}
          className="btn btn-success btn-sm"
          disabled={creating}
        >
          {creating ? (
            <span className="loading loading-spinner" />
          ) : (
            <>
              <HiOutlinePlus className="ml-1" />
              ایجاد محصول جدید
            </>
          )}
        </button>
      </div>

      {deleting && <Loader text="در حال حذف محصول..." />}

      {error ? (
        <Message type="error">
          {error?.data?.message || "خطا در دریافت لیست محصولات"}
        </Message>
      ) : isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="table table-zebra text-right">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    onClick={() => handleSort("_id")}
                    className="cursor-pointer"
                  >
                    شناسه
                  </th>
                  <th
                    onClick={() => handleSort("name")}
                    className="cursor-pointer"
                  >
                    نام محصول
                  </th>
                  <th
                    onClick={() => handleSort("price")}
                    className="cursor-pointer"
                  >
                    قیمت
                  </th>
                  <th
                    onClick={() => handleSort("category")}
                    className="cursor-pointer"
                  >
                    دسته‌بندی
                  </th>
                  <th
                    onClick={() => handleSort("brand")}
                    className="cursor-pointer"
                  >
                    برند
                  </th>
                  <th>عملیات</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id}>
                    <td className="font-mono">{product._id.slice(-6)}</td>
                    <td>{product.name}</td>
                    <td>{formatNumber(product.price)} تومان</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td className="flex gap-2 justify-center">
                      <button
                        onClick={() =>
                          navigate(`/admin/product/${product._id}/edit`)
                        }
                        className="btn btn-ghost btn-sm text-blue-600"
                      >
                        <HiOutlinePencilAlt size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(product)}
                        className="btn btn-ghost btn-sm text-red-600"
                      >
                        <HiOutlineTrash size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {productsData?.pages > 1 && (
            <Paginate
              pages={productsData.pages}
              page={pageNumber}
              setPage={(p) => {
                const params = new URLSearchParams(searchParams);
                params.set("page", p);
                setSearchParams(params);
              }}
            />
          )}
        </>
      )}

      {/* Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-11/12 max-w-md text-right">
            <h2 className="text-lg font-bold mb-4">حذف محصول</h2>
            <p>آیا از حذف محصول "{deleteTarget.name}" مطمئن هستید؟</p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                className="btn btn-ghost"
                onClick={() => setDeleteTarget(null)}
              >
                لغو
              </button>
              <button
                className="btn btn-error text-white"
                onClick={() => deleteHandler(deleteTarget._id)}
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;

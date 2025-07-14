import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../store/slices/api/userApiSlice";
import Loader from "../../components/UI/Loader";
import Message from "../../components/UI/Message";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import SEOMeta from "../../components/Util/SEOMeta";
import Paginate from "../../components/UI/Paginate";
import { toast } from "react-toastify";

function UserList() {
  const { data: allUsers = [], refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: deletingUser }] = useDeleteUserMutation();

  const [page, setPage] = useState(1);
  const usersPerPage = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedUserId, setSelectedUserId] = useState(null);

  const navigate = useNavigate();

  const filteredUsers = useMemo(() => {
    let filtered = [...allUsers]; // Make a shallow copy to avoid mutating read-only data

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term)
      );
    }

    return filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }
    });
  }, [allUsers, searchTerm, sortField, sortOrder]);

  const pages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * usersPerPage,
    page * usersPerPage
  );

  async function handleDeleteConfirm() {
    if (!selectedUserId) return;

    try {
      await deleteUser(selectedUserId).unwrap();
      setSelectedUserId(null);
      toast.success("کاربر با موفقیت حذف شد");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  }

  return (
    <>
      <SEOMeta
        title="لیست کاربران | مدیریت | فروشگاه بارین"
        description="نمایش و مدیریت همه کاربران در پنل مدیریت فروشگاه بارین."
        canonical={window.location.href}
      />

      <div className="container mx-auto px-4 py-8 mb-auto">
        <div className="mb-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <h1 className="text-xl font-bold">کاربران</h1>
          <input
            type="text"
            className="input input-bordered input-sm w-full max-w-xs"
            placeholder="جستجو بر اساس نام یا ایمیل"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message type="error">
            {error?.data?.message || "خطا در بارگذاری کاربران"}
          </Message>
        ) : (
          <>
            <div className="overflow-x-auto rounded-xl shadow">
              <table className="table table-zebra w-full text-sm">
                <thead>
                  <tr>
                    <th
                      onClick={() => {
                        setSortField("_id");
                        setSortOrder((prev) =>
                          prev === "asc" ? "desc" : "asc"
                        );
                      }}
                      className="cursor-pointer"
                    >
                      شناسه
                    </th>
                    <th
                      onClick={() => {
                        setSortField("name");
                        setSortOrder((prev) =>
                          prev === "asc" ? "desc" : "asc"
                        );
                      }}
                      className="cursor-pointer"
                    >
                      نام
                    </th>
                    <th
                      onClick={() => {
                        setSortField("email");
                        setSortOrder((prev) =>
                          prev === "asc" ? "desc" : "asc"
                        );
                      }}
                      className="cursor-pointer"
                    >
                      ایمیل
                    </th>
                    <th>مدیر</th>
                    <th>اقدامات</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>
                        <a href={`mailto:${user.email}`} className="link">
                          {user.email}
                        </a>
                      </td>
                      <td>
                        {user.isAdmin ? (
                          <FaCheck className="text-success mx-auto" />
                        ) : (
                          <FaTimes className="text-error mx-auto" />
                        )}
                      </td>
                      <td className="flex gap-2">
                        <button
                          className="btn btn-xs btn-outline"
                          onClick={() =>
                            navigate(`/admin/user/${user._id}/edit`)
                          }
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-xs btn-error"
                          onClick={() => setSelectedUserId(user._id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Paginate page={page} pages={pages} setPage={setPage} />

            {/* Delete Confirmation Modal */}
            {selectedUserId && (
              <dialog id="confirmDeleteModal" className="modal modal-open">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">حذف کاربر</h3>
                  <p className="py-4">آیا از حذف این کاربر اطمینان دارید؟</p>
                  <div className="modal-action">
                    <button
                      className="btn btn-error"
                      onClick={handleDeleteConfirm}
                      disabled={deletingUser}
                    >
                      بله، حذف کن
                    </button>
                    <button
                      className="btn btn-ghost"
                      onClick={() => setSelectedUserId(null)}
                    >
                      لغو
                    </button>
                  </div>
                </div>
              </dialog>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default UserList;

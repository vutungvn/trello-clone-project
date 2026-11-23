import { useEffect, useState } from "react";
import { mockUsers } from "../../data/mock-users";
import type { User } from "../../types/user";
import { UserTable } from "./components/UserTable";
import { UserFormModal, type UserFormData } from "./components/UserFormModal";
import { DeleteUserModal } from "./components/DeleteUserModal";
import "./UsersPage.css";
import { toast } from "sonner";

// Chỉ là state UI để mở/đóng modal — chưa gọi API.
type ModalState =
  | { type: "create" }
  | { type: "edit"; user: User }
  | { type: "delete"; user: User }
  | null;

export function UsersPage() {
  const [modal, setModal] = useState<ModalState>(null);
  const closeModal = () => setModal(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users`);
      const data = await res.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleCreate = async (data: UserFormData) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast.error("Tạo người dùng thất bại");
      return;
    }

    const newUser: User = await res.json();
    setUsers((prev) => [...prev, newUser]);
    toast.success(`Đã thêm ${newUser.name}`);
  };

  const handleUpdate = async (id: number, data: UserFormData) => {
    const { password, ...rest } = data;
    const body = password ? data : rest;

    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      toast.error("Cập nhật người dùng thất bại");
      return;
    }

    const updateUser: User = await res.json();
    setUsers((prev) => prev.map((u) => (u.id === id ? updateUser : u)));
    toast.success(`Đã cập nhật ${updateUser.name}`);
  };

  const handleDetele = async (user: User) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/users/${user.id}`,
      {
        method: "DELETE",
      },
    );

    if (!res.ok) {
      toast.error("Xoá người dùng thất bại");
      return;
    }

    setUsers((prev) => prev.filter((u) => u.id !== user.id));
    closeModal();
    toast.success(`Đã xoá ${user.name}`);
  };

  return (
    <section className="users-page">
      <div className="page-header">
        <div>
          <h1>Người dùng</h1>
          <p className="text-muted">
            Quản lý tài khoản khách hàng và quản trị viên
          </p>
        </div>
        <button
          className="btn btn--primary"
          onClick={() => setModal({ type: "create" })}
        >
          + Thêm người dùng
        </button>
      </div>

      <div className="card">
        <div className="toolbar">
          <input
            className="input toolbar__search"
            type="search"
            placeholder="Tìm theo tên hoặc email..."
          />
          <select className="input toolbar__filter" defaultValue="">
            <option value="">Tất cả vai trò</option>
            <option value="CUSTOMER">CUSTOMER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <UserTable
          users={users}
          onEdit={(user) => setModal({ type: "edit", user })}
          onDelete={(user) => setModal({ type: "delete", user })}
        />

        <div className="pagination">
          <span className="text-muted">
            Hiển thị 1–{mockUsers.length} trên {mockUsers.length} người dùng
          </span>
        </div>
      </div>

      {modal?.type === "create" && (
        <UserFormModal onClose={closeModal} onSubmit={handleCreate} />
      )}
      {modal?.type === "edit" && (
        <UserFormModal
          user={modal.user}
          onClose={closeModal}
          onSubmit={(data) => handleUpdate(modal.user.id, data)}
        />
      )}
      {modal?.type === "delete" && (
        <DeleteUserModal
          user={modal.user}
          onClose={closeModal}
          onConfirm={() => handleDetele(modal.user)}
        />
      )}
    </section>
  );
}

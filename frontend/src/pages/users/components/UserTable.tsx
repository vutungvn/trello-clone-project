import type { User } from "../../../types/user";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const getInitials = (name: string) =>
  name
    .split(" ")
    .slice(-2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

export function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th className="table__check">
              <input type="checkbox" aria-label="Chọn tất cả" />
            </th>
            <th>ID</th>
            <th>Người dùng</th>
            <th>Vai trò</th>
            <th>Ngày tạo</th>
            <th>Cập nhật</th>
            <th className="table__actions">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="table__check">
                <input type="checkbox" aria-label={`Chọn ${user.name}`} />
              </td>
              <td className="text-muted">#{user.id}</td>
              <td>
                <div className="user-cell">
                  <span className="avatar">{getInitials(user.name)}</span>
                  <div>
                    <div className="user-cell__name">{user.name}</div>
                    <div className="user-cell__email">{user.email}</div>
                  </div>
                </div>
              </td>
              <td>
                <span className={`badge badge--${user.role.toLowerCase()}`}>
                  {user.role}
                </span>
              </td>
              <td>{formatDate(user.createdAt)}</td>
              <td>{formatDate(user.updatedAt)}</td>
              <td className="table__actions">
                <button
                  className="btn btn--ghost btn--sm"
                  onClick={() => onEdit(user)}
                >
                  Sửa
                </button>
                <button
                  className="btn btn--ghost-danger btn--sm"
                  onClick={() => onDelete(user)}
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

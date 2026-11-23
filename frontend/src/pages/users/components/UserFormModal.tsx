import type { Role, User } from "../../../types/user";
import { Modal } from "./Modal";

export type UserFormData = {
  name: string;
  email: string;
  password: string;
  role: Role;
};

interface UserFormModalProps {
  user?: User;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
}

export function UserFormModal({ user, onClose, onSubmit }: UserFormModalProps) {
  const isEdit = Boolean(user);

  return (
    <Modal
      title={isEdit ? "Cập nhật người dùng" : "Thêm người dùng"}
      onClose={onClose}
      footer={
        <>
          <button className="btn btn--secondary" onClick={onClose}>
            Huỷ
          </button>
          <button className="btn btn--primary" form="user-form" type="submit">
            {isEdit ? "Lưu thay đổi" : "Tạo mới"}
          </button>
        </>
      }
    >
      <form
        id="user-form"
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          onClose();

          const formData = new FormData(e.currentTarget);
          onSubmit(Object.fromEntries(formData) as UserFormData);
        }}
      >
        <label className="form__field">
          <span className="form__label">Họ tên</span>
          <input
            className="input"
            name="name"
            placeholder="Nguyễn Văn A"
            defaultValue={user?.name}
          />
        </label>

        <label className="form__field">
          <span className="form__label">Email</span>
          <input
            className="input"
            type="email"
            name="email"
            placeholder="email@example.com"
            defaultValue={user?.email}
          />
        </label>

        <label className="form__field">
          <span className="form__label">
            Mật khẩu
            {isEdit && (
              <span className="form__hint"> (để trống nếu không đổi)</span>
            )}
          </span>
          <input
            className="input"
            type="password"
            name="password"
            placeholder="••••••••"
          />
        </label>

        <label className="form__field">
          <span className="form__label">Vai trò</span>
          <select
            className="input"
            name="role"
            defaultValue={user?.role ?? "CUSTOMER"}
          >
            <option value="CUSTOMER">CUSTOMER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </label>
      </form>
    </Modal>
  );
}

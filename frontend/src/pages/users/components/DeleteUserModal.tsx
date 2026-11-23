import type { User } from "../../../types/user";
import { Modal } from "./Modal";

interface DeleteUserModalProps {
  user: User;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteUserModal({
  user,
  onClose,
  onConfirm,
}: DeleteUserModalProps) {
  return (
    <Modal
      title="Xoá người dùng"
      onClose={onClose}
      footer={
        <>
          <button className="btn btn--secondary" onClick={onClose}>
            Huỷ
          </button>
          <button className="btn btn--danger" onClick={onConfirm}>
            Xoá
          </button>
        </>
      }
    >
      <p>
        Bạn có chắc muốn xoá <strong>{user.name}</strong> ({user.email})? Hành
        động này không thể hoàn tác.
      </p>
    </Modal>
  );
}

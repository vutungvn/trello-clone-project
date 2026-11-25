import type { User } from "@/types/user";

function createUser(id: number, name: string, email: string): User {
  return { id, name, email, avatarUrl: null };
}

export const an = createUser(1, "Nguyễn Văn An", "an.nguyen@example.com");
export const binh = createUser(2, "Trần Thị Bình", "binh.tran@example.com");
export const cuong = createUser(3, "Lê Hoàng Cường", "cuong.le@example.com");
export const dung = createUser(4, "Phạm Minh Dũng", "dung.pham@example.com");
export const ha = createUser(5, "Hoàng Thu Hà", "ha.hoang@example.com");
export const khanh = createUser(6, "Vũ Quốc Khánh", "khanh.vu@example.com");

export const currentUser = an;

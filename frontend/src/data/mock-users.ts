import type { User } from "../types/user";

export const mockUsers: User[] = [
  { id: 1, name: "Nguyễn Văn An", email: "an.nguyen@example.com", role: "ADMIN", createdAt: "2026-01-12T08:30:00Z", updatedAt: "2026-10-02T09:15:00Z" },
  { id: 2, name: "Trần Thị Bình", email: "binh.tran@example.com", role: "CUSTOMER", createdAt: "2026-02-03T10:00:00Z", updatedAt: "2026-09-18T14:20:00Z" },
  { id: 3, name: "Lê Hoàng Cường", email: "cuong.le@example.com", role: "CUSTOMER", createdAt: "2026-03-21T07:45:00Z", updatedAt: "2026-03-21T07:45:00Z" },
  { id: 4, name: "Phạm Minh Dũng", email: "dung.pham@example.com", role: "CUSTOMER", createdAt: "2026-04-09T16:10:00Z", updatedAt: "2026-08-30T11:05:00Z" },
  { id: 5, name: "Hoàng Thu Hà", email: "ha.hoang@example.com", role: "ADMIN", createdAt: "2026-05-14T09:00:00Z", updatedAt: "2026-11-01T08:00:00Z" },
  { id: 6, name: "Vũ Quốc Khánh", email: "khanh.vu@example.com", role: "CUSTOMER", createdAt: "2026-06-02T13:25:00Z", updatedAt: "2026-07-11T10:40:00Z" },
  { id: 7, name: "Đặng Ngọc Lan", email: "lan.dang@example.com", role: "CUSTOMER", createdAt: "2026-07-19T18:00:00Z", updatedAt: "2026-07-19T18:00:00Z" },
  { id: 8, name: "Bùi Đức Mạnh", email: "manh.bui@example.com", role: "CUSTOMER", createdAt: "2026-08-25T06:50:00Z", updatedAt: "2026-10-20T15:30:00Z" },
];

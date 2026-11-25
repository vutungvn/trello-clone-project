import type { Card, Comment } from "@/types/card";
import {
  bugLabel,
  featureLabel,
  frontendLabel,
  performanceLabel,
  urgentLabel,
} from "./boards";
import { an, binh, cuong, dung, ha, khanh } from "./users";

const POSITION_GAP = 65536;

type CardInput = Pick<Card, "id" | "title"> & Partial<Card>;

function createCards(listId: number, inputs: CardInput[]): Card[] {
  return inputs.map((input, index) => ({
    listId,
    boardId: 1,
    description: null,
    position: (index + 1) * POSITION_GAP,
    dueDate: null,
    isCompleted: false,
    isArchived: false,
    assignees: [],
    labels: [],
    commentCount: 0,
    ...input,
  }));
}

const vnpayDescription = `Tích hợp VNPay cho luồng thanh toán đơn hàng.

- Tạo URL thanh toán
- Xử lý IPN callback
- Cập nhật trạng thái đơn`;

export const cards: Card[] = [
  ...createCards(1, [
    {
      id: 1,
      title: "Thiết kế trang thanh toán",
      description: "Thiết kế giao diện trang thanh toán.",
      labels: [featureLabel],
      assignees: [binh, dung],
      dueDate: "2026-11-28T17:00:00",
      commentCount: 3,
    },
    {
      id: 2,
      title: "Sửa lỗi không gửi được email xác nhận",
      labels: [bugLabel, urgentLabel],
      assignees: [cuong],
      dueDate: "2026-11-20T17:00:00",
    },
    {
      id: 3,
      title: "Viết tài liệu API giỏ hàng",
      description: "Viết tài liệu cho các API giỏ hàng.",
    },
    { id: 4, title: "Tối ưu ảnh sản phẩm", labels: [performanceLabel] },
  ]),
  ...createCards(2, [
    {
      id: 5,
      title: "Tích hợp cổng thanh toán VNPay",
      description: vnpayDescription,
      labels: [featureLabel, urgentLabel],
      assignees: [an, dung, ha],
      dueDate: "2026-11-30T17:00:00",
      commentCount: 3,
    },
    {
      id: 6,
      title: "Trang chi tiết sản phẩm",
      labels: [featureLabel, frontendLabel],
      assignees: [binh],
    },
    {
      id: 7,
      title: "Bộ lọc tìm kiếm theo giá",
      assignees: [cuong],
      commentCount: 1,
    },
  ]),
  ...createCards(3, [
    {
      id: 8,
      title: "Đăng nhập bằng Google",
      labels: [frontendLabel],
      assignees: [ha],
      dueDate: "2026-11-26T17:00:00",
    },
    {
      id: 9,
      title: "Phân trang danh sách đơn hàng",
      assignees: [cuong, khanh],
    },
  ]),
  ...createCards(4, [
    {
      id: 10,
      title: "Thiết lập CI/CD",
      assignees: [an],
      dueDate: "2026-11-15T17:00:00",
      isCompleted: true,
    },
    {
      id: 11,
      title: "Thiết kế database",
      assignees: [dung],
      dueDate: "2026-11-12T17:00:00",
      isCompleted: true,
    },
    { id: 12, title: "Khởi tạo dự án" },
  ]),
];

export const comments: Comment[] = [
  {
    id: 1,
    cardId: 5,
    content: "Mình đã xong phần tạo URL, đang làm IPN.",
    createdAt: "2026-11-24T09:55:00",
    user: an,
  },
  {
    id: 2,
    cardId: 5,
    content: "Nhớ kiểm tra checksum ở môi trường sandbox nhé.",
    createdAt: "2026-11-24T08:00:00",
    user: binh,
  },
  {
    id: 3,
    cardId: 5,
    content: "Tài liệu VNPay mình để trong drive chung.",
    createdAt: "2026-11-23T16:20:00",
    user: cuong,
  },
];

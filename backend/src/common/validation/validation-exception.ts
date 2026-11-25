import { BadRequestException, type ValidationError } from '@nestjs/common';

/** Lỗi nhập liệu theo tên trường, trường lồng nhau nối bằng dấu chấm */
export type FieldErrors = Record<string, string>;

function collectFieldErrors(
  errors: ValidationError[],
  parentPath = '',
): FieldErrors {
  const result: FieldErrors = {};
  for (const { property, constraints, children } of errors) {
    const path = parentPath ? `${parentPath}.${property}` : property;
    const [message] = Object.values(constraints ?? {});
    if (message) result[path] = message;
    Object.assign(result, collectFieldErrors(children ?? [], path));
  }
  return result;
}

export function createValidationException(
  errors: ValidationError[],
): BadRequestException {
  return new BadRequestException({
    message: 'Dữ liệu không hợp lệ',
    errors: collectFieldErrors(errors),
  });
}

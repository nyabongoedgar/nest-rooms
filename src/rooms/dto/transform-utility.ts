import { Transform } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

export function TransformJsonStringArrayToClassArray() {
  return Transform(
    ({ value }) => {
      try {
        const parsedArray = JSON.parse(value);
        if (!Array.isArray(parsedArray)) {
          throw new Error('Parsed value is not an array');
        }
        return parsedArray;
      } catch (error) {
        throw new BadRequestException(
          `Invalid JSON string array: ${error.message}`,
        );
      }
    },
    { toClassOnly: true },
  );
}

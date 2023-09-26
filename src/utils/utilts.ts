import { createId } from '@paralleldrive/cuid2';

const generateRandomFixedInteger = (length: number) => {
  return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
};

export const generateOTP = () => generateRandomFixedInteger(6);

export const createShortId = () => createId();
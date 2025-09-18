'use server';

import { CartItem } from '@/types';

export const addItemToCart = async (data: CartItem) => {
  return {
    success: false,
    message: 'Something went wrong',
  };
};
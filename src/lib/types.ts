import { z } from 'zod';

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
}

export const customerSchema = z.object({
  name: z.string().min(1, {message: 'Username must be at least 2 characters.'}),
  email: z.string().min(1, {message: 'Email is required.'}).email('Email format is not valid'),
  phone: z.string().min(7, {message: 'Phone must be at least 7 characters.'}),
  location: z.string().min(1, {message: 'Location is required.'}),
});

export type TCustomerSchema = z.infer<typeof customerSchema>;

export const loginUserSchema = z.object({
  email: z.string().min(1, {message: 'Email is required.'}).email('Email format is not valid'),
  password:  z.string().min(6, {message: 'Password must be at least 6 characters.'}),
});

export type TLoginUserSchema = z.infer<typeof loginUserSchema>;
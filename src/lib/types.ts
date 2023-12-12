import { z } from 'zod';

export interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
}

export interface Product {
  _id: string;
  img: string;
  title: string;
  quantity: number;
  price: number;
  color: string;
  producer: string;
  inStock: boolean;
  orders: number;
}

export interface Order {
  _id: string;
  product: string;
  customer: string;
  date: string;
  quantity: number;
  status: string;
}

export interface Country {
  ISO3: string;
  name: string;
  region: string;
}

export interface ExcelData {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  title?: string;
  quantity?: number;
  price?: number;
  color?: string;
  producer?: string;
  product?: string;
  customer?: string;
  date?: string;
  status?: string;
}

export const customerSchema = z.object({
  name: z.string().trim().min(2, { message: 'Username must be at least 2 characters.' }),
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required.' })
    .email('Email format is not valid'),
  phone: z.string().trim().min(7, { message: 'Phone number must be at least 7 characters.' }),
  location: z.string({required_error: 'Location is required.'}),
});

export type TCustomerSchema = z.infer<typeof customerSchema>;

export const productSchema = z.object({
  title: z.string().trim().min(1, { message: 'Please enter product title.' }),
  quantity: z.coerce.number(),
  price: z.coerce.number(),
  producer: z.string().trim().min(1, { message: 'Please enter product producer.' }),
  color: z.string().trim().min(1, { message: 'Please enter product color.' }),
});

export type TProductSchema = z.infer<typeof productSchema>;

// export const orderSchema = z.object({
//   product: z.string({required_error: 'Product is required.'}),
//   customer: z.string({required_error: 'Customer is required.'}),
//   date: z.date({required_error: 'Date is required.'}),
//   quantity: z.any(),
//   status: z.string({required_error: 'Please select order status.'}),
// });

// export type TOrderSchema = z.infer<typeof orderSchema>;

export const loginUserSchema = z.object({
  email: z.string().min(1, { message: 'Email is required.' }).email('Email format is not valid'),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export type TLoginUserSchema = z.infer<typeof loginUserSchema>;

export interface TCalendar {
  id?: string;
  title: string;
  start: string;
  end: string;
}

export const calendarSchema = z
  .object({
    title: z.string().refine(value => value.trim().length > 0, {
      message: 'Please fill in the title.',
    }),
    start: z.string().min(1, { message: 'Please enter start time.' }),
    end: z.string().min(1, { message: 'Please enter end time.' }),
  })
  .refine(
    ({ start, end }) => {
      if (!start || !end) return true;

      const startTime = Date.parse(`2023-01-01T${start}`);
      const endTime = Date.parse(`2023-01-01T${end}`);

      return startTime < endTime;
    },
    {
      message: 'Start time must be before end time.',
    },
  );

export type TCalendarSchema = z.infer<typeof calendarSchema>;

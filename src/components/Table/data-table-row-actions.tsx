import { Row } from "@tanstack/react-table";
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from "lucide-react";
import { useDeleteCustomerMutation } from "@/redux";
import { Customer } from "@/types";

interface DataTableRowActionsProps<TData extends Customer> {
  row: Row<TData>
}

export function DataTableRowActions<TData extends Customer>({
  row,
}: DataTableRowActionsProps<TData>) {

  const [deleteCustomer] = useDeleteCustomerMutation();

  const handleDeleteCustomer = async(id:number) => {
    await deleteCustomer(id).unwrap()
  }

  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant='ghost' className='h-8 w-8 p-0'>
        <span className='sr-only'>Open menu</span>
        <MoreHorizontal className='h-4 w-4' />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align='end'>
      {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
      <DropdownMenuItem onClick={() => handleDeleteCustomer(row.original.id)}>
        Delete
      </DropdownMenuItem>
      {/* <DropdownMenuSeparator /> */}
      <DropdownMenuItem>View customer</DropdownMenuItem>
      <DropdownMenuItem>View payment details</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

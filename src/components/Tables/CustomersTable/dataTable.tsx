import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useState } from 'react';
import { getExcelTable } from '@/handlers/getExcelTable';
import { Link } from 'react-router-dom';
import { useGetCustomersQuery } from '@/redux';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const {data: customer} = useGetCustomersQuery('')

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const next = () => {
    table.nextPage()
  }

  return (
    <>
      <div className='sm:flex items-center justify-between gap-8 mb-4 sm:mb-0'>
        {/* Input */}
        <div className='flex items-center py-4'>
          <Input
            placeholder='Filter emails...'
            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
            onChange={event => table.getColumn('email')?.setFilterValue(event.target.value)}
            className='max-w-sm bg-white dark:bg-boxdark'
          />
        </div>

        <div>
          {/*Add new*/}
          <Link to='/customers/new'><Button className='mr-3 text-white'>
            Add new
          </Button></Link>
          {/*Excel*/}
          {customer && 
          <Button className='mr-3 text-white' onClick={() => getExcelTable(customer)}>
            Download Excel
          </Button>
          }
        </div>
      </div>

      {/* Table */}
      <div className='rounded-sm border dark:bg-boxdark dark:border-strokedark'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id} className='text-center font-medium text-[16px] dark:text-whiten'>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className='dark:text-darktext'>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className='text-center'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => next()}
          disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </>
  );
}

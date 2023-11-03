import { Customer, columns } from "@/components/Table/columns"
import { DataTable } from "@/components/Table/dataTable"
import { useEffect, useState } from "react"

export const Customers = () => {

  const [data, setData] = useState<Customer[]>([
    ]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(resp => resp.json())
      .then(data => setData(data))
      .catch(err => console.error('Не удалось загрузить посты: ', err))
  }, []);

  return (
    <section >
        <DataTable columns={columns} data={data} />
    </section>
  )
}
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { formatPrice } from "../../lib/utils"

interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
}

interface OrderItemsTableProps {
  items: OrderItem[]
}

export default function OrderItemsTable({ items }: OrderItemsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Produit</TableHead>
          <TableHead className="text-right">Prix unitaire</TableHead>
          <TableHead className="text-right">Quantité</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.productId}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell className="text-right">{formatPrice(item.price)}</TableCell>
            <TableCell className="text-right">{item.quantity}</TableCell>
            <TableCell className="text-right">{formatPrice(item.price * item.quantity)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}


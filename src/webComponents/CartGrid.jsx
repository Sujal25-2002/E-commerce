"use client"

import { useSelector, useDispatch } from "react-redux"
import { AgGridReact } from "ag-grid-react"
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community"
import { updateQuantity, removeFromCart } from "@/store/cartSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, ShoppingBag } from "lucide-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"

ModuleRegistry.registerModules([AllCommunityModule])

export default function CartGrid({ onCheckout }) {
  const { items, total } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const QuantityRenderer = (params) => {
    const handleQuantityChange = (e) => {
      const newQuantity = Number.parseInt(e.target.value) || 0
      if (newQuantity > 0) {
        dispatch(updateQuantity({ id: params.data.id, quantity: newQuantity }))
      }
    }

    return (
      <div className="flex items-center justify-center">
        <Input
          type="number"
          min="1"
          max="99"
          value={params.data.quantity}
          onChange={handleQuantityChange}
          className="w-16 h-8 text-center border-gray-300 focus:border-blue-500"
        />
      </div>
    )
  }

  const ActionRenderer = (params) => {
    const handleRemove = () => {
      dispatch(removeFromCart(params.data.id))
    }

    return (
      <div className="flex justify-center">
        <Button
          variant="destructive"
          size="sm"
          onClick={handleRemove}
          className="flex items-center gap-1 h-8 px-3 hover:bg-red-600 transition-colors"
        >
          <Trash2 size={14} />
          Remove
        </Button>
      </div>
    )
  }

  const ProductRenderer = (params) => {
    const getProductImage = (productName) => {
      const imageMap = {
        "Premium Cotton T-Shirt": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=50&h=50&fit=crop",
        "Classic Denim Jeans": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=50&h=50&fit=crop",
        "Cozy Wool Sweater": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=50&h=50&fit=crop",
        "Elegant Summer Dress": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=50&h=50&fit=crop",
        "Performance Running Sneakers": "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=50&h=50&fit=crop",
        "Handcrafted Leather Boots": "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=50&h=50&fit=crop",
        "Casual Canvas Shoes": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=50&h=50&fit=crop",
        "Designer High Heels": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=50&h=50&fit=crop",
        "Flawless Foundation": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=50&h=50&fit=crop",
        "Luxury Lipstick Set": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=50&h=50&fit=crop",
        "Professional Eye Shadow Palette":
          "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=50&h=50&fit=crop",
        "Hydrating Moisturizer": "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=50&h=50&fit=crop",
      }
      return imageMap[productName] || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=50&h=50&fit=crop"
    }

    return (
      <div className="flex items-center gap-3 py-2">
        <img
          src={getProductImage(params.data.name) || "/placeholder.svg"}
          alt={params.data.name}
          className="w-10 h-10 rounded-md object-cover border"
        />
        <span className="font-medium">{params.data.name}</span>
      </div>
    )
  }

  const columnDefs = [
    {
      field: "name",
      headerName: "Product",
      flex: 2,
      minWidth: 150,
      cellRenderer: ProductRenderer,
      headerClass: "font-semibold text-gray-700",
      cellClass: "flex items-center py-2",
    },
    {
      field: "category",
      headerName: "Category",
      width: 100,
      hide: false,
      headerClass: "font-semibold text-gray-700",
      cellClass: "flex items-center justify-center text-center py-6",
    },
    {
      field: "price",
      headerName: "Price",
      width: 90,
      valueFormatter: (params) => `$${params.value}`,
      headerClass: "font-semibold text-gray-700",
      cellClass: "flex items-center justify-center text-center font-medium text-green-600 py-6",
    },
    {
      field: "quantity",
      headerName: "Qty",
      width: 80,
      cellRenderer: QuantityRenderer,
      headerClass: "font-semibold text-gray-700",
      sortable: false,
      filter: false,
      cellClass: "flex items-center justify-center py-4",
    },
    {
      field: "total",
      headerName: "Total",
      width: 90,
      valueGetter: (params) => params.data.price * params.data.quantity,
      valueFormatter: (params) => `$${params.value.toFixed(2)}`,
      headerClass: "font-semibold text-gray-700",
      cellClass: "flex items-center justify-center text-center font-bold text-blue-600 py-6",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      cellRenderer: ActionRenderer,
      sortable: false,
      filter: false,
      headerClass: "font-semibold text-gray-700",
      cellClass: "flex items-center justify-center py-4",
    },
  ]

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
          <ShoppingBag className="w-10 h-10 text-blue-500" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
        <p className="text-muted-foreground text-lg">Add some amazing products to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div
        className="ag-theme-quartz rounded-xl border shadow-lg overflow-hidden"
        style={{
          height: window.innerWidth < 768 ? 400 : 450,
          width: "100%",
          minWidth: window.innerWidth < 768 ? "100%" : "600px",
        }}
      >
        <AgGridReact
          rowData={items}
          columnDefs={columnDefs}
          defaultColDef={{
            sortable: true,
            filter: true,
            resizable: window.innerWidth >= 768,
            cellClass: "flex items-center justify-center",
            minWidth: window.innerWidth < 768 ? 60 : 80,
          }}
          animateRows={true}
          rowHeight={70}
          headerHeight={50}
          suppressRowClickSelection={true}
          rowSelection="multiple"
          pagination={true}
          paginationPageSize={window.innerWidth < 768 ? 5 : 10}
          domLayout="normal"
          suppressHorizontalScroll={false}
          onGridReady={(params) => {
            if (window.innerWidth < 768) {
              params.columnApi.setColumnVisible("category", false)
              params.columnApi.autoSizeAllColumns()
            }
          }}
          paginationAutoPageSize={false}
          suppressPaginationPanel={false}
          paginationNumberFormatter={(params) => {
            return `${params.value}`
          }}
          overlayNoRowsTemplate="<span>No items in cart</span>"
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border gap-4">
        <div className="text-center sm:text-left">
          <p className="text-sm text-muted-foreground">Total Amount</p>
          <p className="text-3xl font-bold text-blue-600">${total.toFixed(2)}</p>
        </div>
        <Button
          size="lg"
          className="px-8 py-3 text-lg font-semibold hover:shadow-lg transition-all duration-200 w-full sm:w-auto"
          onClick={onCheckout}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  )
}

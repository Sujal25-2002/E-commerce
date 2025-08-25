"use client"

import { useState, useEffect, useCallback } from "react"
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
  const [isMobile, setIsMobile] = useState(false)
  const [gridApi, setGridApi] = useState(null)
  const [columnApi, setColumnApi] = useState(null)

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      
      // Update grid configuration when screen size changes
      if (columnApi) {
        if (mobile) {
          columnApi.setColumnVisible("category", false)
        } else {
          columnApi.setColumnVisible("category", true)
        }
        columnApi.autoSizeAllColumns()
      }
    }

    handleResize() // Initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [columnApi])

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
          className="w-12 sm:w-16 h-8 text-center border-gray-300 focus:border-blue-500 text-sm"
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
          className="flex items-center gap-1 h-7 sm:h-8 px-2 sm:px-3 hover:bg-red-600 transition-colors text-xs sm:text-sm"
        >
          <Trash2 size={12} className="sm:hidden" />
          <Trash2 size={14} className="hidden sm:block" />
          <span className="hidden sm:inline">Remove</span>
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
        "Professional Eye Shadow Palette": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=50&h=50&fit=crop",
        "Hydrating Moisturizer": "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=50&h=50&fit=crop",
      }
      return imageMap[productName] || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=50&h=50&fit=crop"
    }

    return (
      <div className="flex items-center gap-2 sm:gap-3 py-2">
        <img
          src={getProductImage(params.data.name) || "/placeholder.svg"}
          alt={params.data.name}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-md object-cover border"
        />
        <span className="font-medium text-xs sm:text-sm truncate">{params.data.name}</span>
      </div>
    )
  }

  const getColumnDefs = useCallback(() => [
    {
      field: "name",
      headerName: "Product",
      flex: isMobile ? 3 : 2,
      minWidth: isMobile ? 120 : 150,
      cellRenderer: ProductRenderer,
      headerClass: "font-semibold text-gray-700 text-xs sm:text-sm",
      cellClass: "flex items-center py-2",
    },
    {
      field: "category",
      headerName: "Category",
      width: isMobile ? 80 : 100,
      hide: isMobile,
      headerClass: "font-semibold text-gray-700 text-xs sm:text-sm",
      cellClass: "flex items-center justify-center text-center py-6 text-xs sm:text-sm",
    },
    {
      field: "price",
      headerName: "Price",
      width: isMobile ? 70 : 90,
      valueFormatter: (params) => `$${params.value}`,
      headerClass: "font-semibold text-gray-700 text-xs sm:text-sm",
      cellClass: "flex items-center justify-center text-center font-medium text-green-600 py-6 text-xs sm:text-sm",
    },
    {
      field: "quantity",
      headerName: "Qty",
      width: isMobile ? 60 : 80,
      cellRenderer: QuantityRenderer,
      headerClass: "font-semibold text-gray-700 text-xs sm:text-sm",
      sortable: false,
      filter: false,
      cellClass: "flex items-center justify-center py-4",
    },
    {
      field: "total",
      headerName: "Total",
      width: isMobile ? 70 : 90,
      valueGetter: (params) => params.data.price * params.data.quantity,
      valueFormatter: (params) => `$${params.value.toFixed(2)}`,
      headerClass: "font-semibold text-gray-700 text-xs sm:text-sm",
      cellClass: "flex items-center justify-center text-center font-bold text-blue-600 py-6 text-xs sm:text-sm",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: isMobile ? 70 : 100,
      cellRenderer: ActionRenderer,
      sortable: false,
      filter: false,
      headerClass: "font-semibold text-gray-700 text-xs sm:text-sm",
      cellClass: "flex items-center justify-center py-4",
    },
  ], [isMobile])

  const onGridReady = useCallback((params) => {
    setGridApi(params.api)
    setColumnApi(params.columnApi)
    
    if (isMobile) {
      params.columnApi.setColumnVisible("category", false)
    }
    params.columnApi.autoSizeAllColumns()
  }, [isMobile])

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
          height: isMobile ? '350px' : '450px',
          width: "100%",
        }}
      >
        <AgGridReact
          rowData={items}
          columnDefs={getColumnDefs()}
          defaultColDef={{
            sortable: true,
            filter: !isMobile,
            resizable: !isMobile,
            cellClass: "flex items-center justify-center",
            minWidth: isMobile ? 50 : 80,
          }}
          animateRows={true}
          rowHeight={isMobile ? 60 : 70}
          headerHeight={isMobile ? 40 : 50}
          suppressRowClickSelection={true}
          rowSelection="multiple"
          pagination={true}
          paginationPageSize={isMobile ? 3 : 6}
          domLayout="normal"
          suppressHorizontalScroll={false}
          onGridReady={onGridReady}
          paginationAutoPageSize={false}
          suppressPaginationPanel={false}
          paginationNumberFormatter={(params) => `${params.value}`}
          overlayNoRowsTemplate="<span>No items in cart</span>"
          // Mobile-specific configurations
          suppressMenuHide={isMobile}
          suppressMovableColumns={isMobile}
          suppressFieldDotNotation={true}
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6 rounded-xl border gap-4">
        <div className="text-center sm:text-left">
          <p className="text-sm text-muted-foreground">Total Amount</p>
          <p className="text-2xl sm:text-3xl font-bold text-blue-600">${total.toFixed(2)}</p>
        </div>
        <Button
          size="lg"
          className="px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold hover:shadow-lg transition-all duration-200 w-full sm:w-auto"
          onClick={onCheckout}
        >
          Proceed to Checkout
        </Button>
      </div>

      <style jsx global>{`
        /* Custom AG Grid mobile styles */
        .ag-theme-quartz .ag-paging-panel {
          padding: 8px 12px !important;
        }
        
        @media (max-width: 767px) {
          .ag-theme-quartz .ag-paging-panel {
            font-size: 12px !important;
            padding: 6px 8px !important;
          }
          
          .ag-theme-quartz .ag-paging-page-summary-panel {
            display: none !important;
          }
          
          .ag-theme-quartz .ag-paging-button {
            min-width: 24px !important;
            height: 24px !important;
            margin: 0 2px !important;
          }
          
          .ag-theme-quartz .ag-paging-number {
            min-width: 24px !important;
            height: 24px !important;
            margin: 0 1px !important;
          }
        }
      `}</style>
    </div>
  )
}
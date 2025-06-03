import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAdminDashboard } from "@/hooks/useAdminDashboard"
import { AuthService } from "@/services/authService"
import type { AppDispatch } from "@/store"
import { logout } from "@/store/slices/authSlice"
import { BarChart3, ChevronLeft, ChevronRight, Download, Filter, LogOut, RefreshCw, Search, Users } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "sonner"
import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type ColumnFiltersState, type SortingState, type VisibilityState } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, ArrowUpDown, Eye, MoreHorizontal, Trash2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ISurvey, ISurveyParams } from "shared/types"
import { formatTimestamp } from "@/utils/formatDate"
import { surveyService } from "@/services/surveyService"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { OnConfetti } from "@/utils/on-conffite"
import Loading from "@/components/admin/data-table-skelton"

export default function AdminPage() {

  const { stats, loading, error } = useAdminDashboard()
  const [surveys, setSurveys] = useState<ISurvey[]>([])
  const [meta, setMeta] = useState({
    totalCount: 0,
    pageCount: 0,
    currentPage: 1,
    perPage: 10,
  })
  const [tableLoading, setTableLoading] = useState<boolean>(false)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState("")
  const [selectedSubmission, setSelectedSubmission] = useState<ISurvey | null>(null)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const dispatch = useDispatch<AppDispatch>()

  const columns: ColumnDef<ISurvey>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            <span>Name</span>
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-1 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-1 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-1 h-4 w-4" />
            )}
          </Button>
        </div>
      ),
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div className="max-w-[180px] truncate">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "nationality",
      header: ({ column }) => (
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            <span>Nationality</span>
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-1 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-1 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-1 h-4 w-4" />
            )}
          </Button>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            <span>Created At</span>
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-1 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-1 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-1 h-4 w-4" />
            )}
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"))
        return (
          <div>
            {formatTimestamp(date)}
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <div>
            {status === "new" ? (
              <Badge variant="default">New</Badge>
            ) : status === "reviewed" ? (
              <Badge variant="secondary">Reviewed</Badge>
            ) : (
              <Badge variant="outline">Archived</Badge>
            )}
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value === "all" ? true : row.getValue(id) === value
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const submission = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setSelectedSubmission(submission)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleStatusChange(submission._id, "new")}
                disabled={submission.status === "new"}
              >
                Mark as New
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleStatusChange(submission._id, "reviewed")}
                disabled={submission.status === "reviewed"}
              >
                Mark as Reviewed
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleStatusChange(submission._id, "archived")}
                disabled={submission.status === "archived"}
              >
                Archive
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDelete(submission._id)} className="text-red-600 focus:text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      setTableLoading(true)
      try {
        const sortBy = sorting.length > 0 ? sorting[0].id : undefined
        const sortOrder = sorting.length > 0 ? (sorting[0].desc ? 'desc' : 'asc') : undefined
        const statusFilter = columnFilters.find(filter => filter.id === 'status')?.value
        const params: ISurveyParams = {
          page: pagination.pageIndex + 1,
          limit: pagination.pageSize,
          sortBy,
          sortOrder,
          search: globalFilter || undefined,
          status: statusFilter !== 'all' ? statusFilter as "new" | "reviewed" | "archived" : undefined,
        }
        const response = await surveyService.findAllSurveys(params)
        setSurveys(response.data)
        setMeta(response.meta)
      } catch (error) {
        const apiError = error as Error
        console.error("Error fetching data:", error)
        toast.error("Error fetching submissions", {
          description: apiError.message || "Failed to fetch submissions. Please try again.",
        })
      } finally {
        setTableLoading(false)
      }
    }
    fetchData()
  }, [pagination, sorting, columnFilters, globalFilter])



  const handleLogout = async () => {
    try {
      toast.promise(
        AuthService.logout(),
        {
          loading: "Logging out...",
          success: () => {
            dispatch(logout())
            return "Logged out successfully"
          },
          error: "Failed to log out"
        }
      )
    } catch (error) {
      console.error("Logout failed:", error)
      toast.error("Failed to log out")
    }
  }

  const table = useReactTable({
    data: surveys,
    columns,
    pageCount: meta.pageCount,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    enableRowSelection: true,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const handleStatusChange = async (id: string, newStatus: "new" | "reviewed" | "archived") => {
    try {
      await surveyService.updateSurveyStatus(id, newStatus)

      // Update local data
      setSurveys((prev) => prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item)))

      toast("Status Updated", {
        description: `Submission has been marked as ${newStatus}.`,
      })
    } catch (error) {
      const apiError = error as Error
      toast.error(apiError.message || "Failed to update status. Please try again.")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return

    try {
      await surveyService.deleteSurvey(id)

      // Update local data
      setSurveys((prev) => prev.filter((item) => item._id !== id))
      setMeta((prev) => ({ ...prev, totalCount: prev.totalCount - 1 }))

      toast("Submission Deleted", {
        description: "The submission has been deleted successfully.",
      })
    } catch (error) {
      const apiError = error as Error
      toast.error(apiError.message || "Failed to delete submission. Please try again.")
    }
  }

  const handleBulkAction = async (action: "review" | "archive" | "delete") => {
    const selectedRows = Object.keys(rowSelection).map((index) => data[Number.parseInt(index)])
    if (selectedRows.length === 0) {
      toast.error("No Selections", {
        description: "Please select at least one submission."
      })
      return
    }

    if (action === "delete" && !confirm(`Are you sure you want to delete ${selectedRows.length} submissions?`)) {
      return
    }

    try {
      const selectedIds = selectedRows.map((row) => row._id)

      if (action === "delete") {
        await surveyService.bulkDelete(selectedIds)

        setSurveys((prev) => prev.filter((item) => !selectedIds.includes(item._id)))
        setMeta((prev) => ({ ...prev, totalCount: prev.totalCount - selectedRows.length }))

        toast.success("Bulk Delete Successful", {
          description: `${selectedRows.length} submissions have been deleted.`,
        })
      } else {
        const newStatus = action === "review" ? "reviewed" : "archived"
        await surveyService.bulkUpdateStatus(selectedIds, newStatus)

        setSurveys((prev) => prev.map((item) => (selectedIds.includes(item._id) ? { ...item, status: newStatus } : item)))

        toast.success("Bulk Update Successful", {
          description: `${selectedRows.length} submissions have been marked as ${newStatus}.`,
        })
      }

      // Clear selection
      setRowSelection({})
    } catch (error) {
      const apiError = error as Error
      toast.error(apiError.message || `Failed to ${action} submissions. Please try again.`)
    }
  }

  const handleRefresh = () => {
    OnConfetti()
  }
  if (tableLoading || loading) return <Loading />
  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>
  }
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className=" shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold ">Admin Dashboard</h1>
              <p className="">Manage survey submissions</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleLogout()}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium ">Total Submissions</p>
                  <p className="text-3xl font-bold ">{stats?.totalSurveys}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium ">New</p>
                  <p className="text-3xl font-bold text-green-600">{stats?.newSurveys}</p>
                </div>
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-600 rounded-full animate-ping"></div>
                  <div className="w-3 h-3 bg-green-600 rounded-full absolute"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium ">Reviewed</p>
                  <p className="text-3xl font-bold text-blue-600">{stats?.reviewedSurveys}</p>
                </div>
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center relative">
                  <div className="w-3 h-3 bg-blue-600 rounded-full animate-ping absolute"></div>
                  <div className="w-3 h-3 bg-blue-600 rounded-full relative"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium ">Archived</p>
                  <p className="text-3xl font-bold ">{stats?.totalArchived}</p>
                </div>
                <BarChart3 className="w-8 h-8 " />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submissions Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Survey Submissions</CardTitle>
                <CardDescription>View and manage all survey form submissions</CardDescription>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button onClick={handleRefresh} variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by name, email, or nationality..."
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={(columnFilters.find((filter) => filter.id === "status")?.value as string) || "all"}
                onValueChange={(value) => {
                  if (value === "all") {
                    setColumnFilters(columnFilters.filter((filter) => filter.id !== "status"))
                  } else {
                    setColumnFilters([
                      ...columnFilters.filter((filter) => filter.id !== "status"),
                      { id: "status", value },
                    ])
                  }
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    <span>Filter by Status</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bulk Actions */}
            {Object.keys(rowSelection).length > 0 && (
              <div className="bg-blue-50 p-3 rounded-md mb-4 flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium text-blue-800">
                  {Object.keys(rowSelection).length} items selected
                </span>
                <div className="flex-1"></div>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction("review")} className="bg-white">
                  Mark as Reviewed
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction("archive")} className="bg-white">
                  Archive
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction("delete")}
                  className="bg-white text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </Button>
              </div>
            )}

            {/* Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {loading ? (
                    // Loading state
                    Array.from({ length: pagination.pageSize }).map((_, index) => (
                      <TableRow key={`loading-${index}`}>
                        {Array.from({ length: columns.length }).map((_, cellIndex) => (
                          <TableCell key={`loading-cell-${cellIndex}`}>
                            <Skeleton className="h-6 w-full" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="flex-1 text-sm text-muted-foreground">
                {Object.keys(rowSelection).length > 0
                  ? `${Object.keys(rowSelection).length} of ${meta.totalCount} row(s) selected.`
                  : `Showing ${pagination.pageIndex * pagination.pageSize + 1} to ${Math.min(
                    (pagination.pageIndex + 1) * pagination.pageSize,
                    meta.totalCount,
                  )} of ${meta.totalCount} entries`}
              </div>
              <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium">Rows per page</p>
                  <Select
                    value={`${pagination.pageSize}`}
                    onValueChange={(value) => {
                      table.setPageSize(Number(value))
                    }}
                  >
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue placeholder={pagination.pageSize} />
                    </SelectTrigger>
                    <SelectContent side="top">
                      {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                        <SelectItem key={pageSize} value={`${pageSize}`}>
                          {pageSize}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                  Page {pagination.pageIndex + 1} of {Math.max(1, meta.pageCount)}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage() || loading}
                  >
                    <span className="sr-only">Go to first page</span>
                    <ChevronLeft className="h-4 w-4" />
                    <ChevronLeft className="h-4 w-4 -ml-2" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage() || loading}
                  >
                    <span className="sr-only">Go to previous page</span>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage() || loading}
                  >
                    <span className="sr-only">Go to next page</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => table.setPageIndex(meta.pageCount - 1)}
                    disabled={!table.getCanNextPage() || loading}
                  >
                    <span className="sr-only">Go to last page</span>
                    <ChevronRight className="h-4 w-4" />
                    <ChevronRight className="h-4 w-4 -ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
            <DialogDescription>Complete information for this survey submission</DialogDescription>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Name</Label>
                  <p className="text-sm">{selectedSubmission.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Gender</Label>
                  <p className="text-sm capitalize">{selectedSubmission.gender}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Email</Label>
                  <p className="text-sm">{selectedSubmission.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Phone</Label>
                  <p className="text-sm">{selectedSubmission.phone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Nationality</Label>
                  <p className="text-sm">{selectedSubmission.nationality}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Status</Label>
                  <div className="mt-1">
                    {selectedSubmission.status === "new" ? (
                      <Badge variant="default">New</Badge>
                    ) : selectedSubmission.status === "reviewed" ? (
                      <Badge variant="secondary">Reviewed</Badge>
                    ) : (
                      <Badge variant="outline">Archived</Badge>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Address</Label>
                <p className="text-sm mt-1">{selectedSubmission.address}</p>
              </div>
              {selectedSubmission.message && (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Message</Label>
                  <p className="text-sm mt-1">{selectedSubmission.message}</p>
                </div>
              )}
              <div>
                <Label className="text-sm font-medium text-gray-600">Submitted At</Label>
                <p className="text-sm mt-1">
                  {formatTimestamp(new Date(selectedSubmission.createdAt))}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

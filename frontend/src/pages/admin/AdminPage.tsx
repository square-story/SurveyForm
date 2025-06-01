import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAdminDashboard } from "@/hooks/useAdminDashboard"
import { AuthService } from "@/services/authService"
import type { AppDispatch } from "@/store"
import { logout } from "@/store/slices/authSlice"
import { BarChart3, Download, LogOut, Search, Users } from "lucide-react"
import { useDispatch } from "react-redux"
import { toast } from "sonner"

export default function AdminPage() {

  const { stats, loading, error } = useAdminDashboard()

  const dispatch = useDispatch<AppDispatch>()

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

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }
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
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by name, email, or nationality..."
                  className="pl-10"
                />
              </div>
            </div>

            {/* Table */}
            <div className="rounded-md border">
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { AuthService } from "@/services/authService"
import type { AppDispatch, RootState } from "@/store"
import { logout } from "@/store/slices/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"

const AdminPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)
  const handleLogout = async () => {
    toast.promise(AuthService.logout(), {
      loading: "Logging out...",
      success: "Logged out successfully!",
      error: "Failed to log out"
    })
    dispatch(logout())
  }
  return (
    <>
      <h1>{user?.username} Dashboard</h1>
      <p>Welcome to the admin dashboard!</p>
      <Button variant='outline' onClick={() => { handleLogout() }}>
        Logout
      </Button>
    </>
  )
}

export default AdminPage
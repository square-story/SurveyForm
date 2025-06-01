import { Button } from "@/components/ui/button"
import { AuthService } from "@/services/authService"
import type { AppDispatch, RootState } from "@/store"
import { logout } from "@/store/slices/authSlice"
import { useDispatch, useSelector } from "react-redux"

const AdminPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)
  const handleLogout = async () => {
    await AuthService.logout()
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
import { FileText } from "lucide-react"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import ModeSwitch from "../mode-switch"

const NavBar = () => {
    const { isAuthenticated } = useSelector((state: { auth: { isAuthenticated: boolean } }) => state.auth)
    return (
        <header className="shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <FileText className="w-8 h-8" />
                        <h1 className="text-2xl font-bold">Survey Portal</h1>
                    </div>
                    <Button variant="outline" asChild>
                        <Link to={isAuthenticated ? "/admin" : "/login"}>
                            {isAuthenticated ? "Go to Dashboard" : "Admin Login"}
                        </Link>
                    </Button>
                    <ModeSwitch />
                </div>
            </div>
        </header>
    )
}

export default NavBar
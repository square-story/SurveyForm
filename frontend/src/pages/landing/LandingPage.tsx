import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { FileText, Shield } from "lucide-react"

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <FileText className="w-8 h-8 text-blue-600" />
                            <h1 className="text-2xl font-bold text-gray-900">Survey Portal</h1>
                        </div>
                        <Button variant="outline" asChild>
                            <Link to="/login">
                                <Shield className="w-4 h-4 mr-2" />
                                Admin Login
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default LandingPage
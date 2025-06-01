import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Lock, Shield } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { loginSchema } from "@/schema/authSchema"
import { formatTimestamp } from "@/utils/formatDate"
import { AuthService } from "@/services/authService"
import { PasswordInput } from "@/components/common/password-input"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/store"
import { setAuth } from "@/store/slices/authSlice"

type LoginFormData = z.infer<typeof loginSchema>

const AuthPage = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = form;

    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await AuthService.login(data);
            if (response.status === 200) {
                toast.success(`Login Successful`, {
                    description: formatTimestamp(new Date()),
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                    },
                })

                dispatch(setAuth({ isAuthenticated: true, accessToken: response.data.token }));

                navigate("/admin")
            } else {
                toast.error("Login failed! Please check your credentials.");
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="bg-blue-600 p-3 rounded-full">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
                    <p>Access the survey management dashboard</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Lock className="w-5 h-5" />
                            <span>Secure Access</span>
                        </CardTitle>
                        <CardDescription>Enter your admin credentials to view survey submissions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your username" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <PasswordInput {...field} name="password" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? "Signing In..." : "Sign In"}
                                </Button>
                            </form>
                        </Form>

                        {/* Demo credentials info */}
                        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 className="text-sm font-medium text-blue-900 mb-2">Demo Credentials:</h4>
                            <p className="text-sm text-blue-800">
                                Username: <code className="bg-blue-100 px-1 rounded">Admin</code>
                                <br />
                                Password: <code className="bg-blue-100 px-1 rounded">Admin@123</code>
                            </p>
                        </div>

                        <div className="mt-6 text-center">
                            <Button variant="outline" asChild>
                                <Link to="/">← Back to Survey Form</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default AuthPage
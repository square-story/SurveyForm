import { CheckCircle, Shield, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "../ui/input"
import { surveySchema } from "@/schema/surveySchema"
import type { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"
import { Textarea } from "../ui/textarea"
import { OnConfetti } from "@/utils/on-conffite"
import { surveyService } from "@/services/surveyService"
import { PhoneInput } from "../phone-input"
import { CountryDropdown } from "../country-dropdown"

export type SurveyFormData = z.infer<typeof surveySchema>

const SurveyForm = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const form = useForm<SurveyFormData>({
        resolver: zodResolver(surveySchema),
        defaultValues: {
            name: "",
            gender: undefined,
            nationality: "",
            email: "",
            phone: "",
            address: "",
            message: "",
        },
    })

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
    } = form

    const onSubmit = async (data: SurveyFormData) => {
        try {
            const response = await surveyService.createSurvey(data)

            if (response.status === 201) {
                setIsSubmitted(true)
                OnConfetti()
                toast.success("Survey submitted successfully!", {
                    description: "Thank you for your participation.",
                })
            } else {
                toast.error("Failed to submit survey. Please try again later.", {
                    description: response.data.message || "Unknown error",
                })
            }
        } catch (error) {
            toast.error(`${error instanceof Error ? error.message : "Unknown error"}`);
            if (error instanceof Error && error.message === "Survey with this email already exists") {
                form.setFocus("email")
                form.setError("email", { "type": "manual", "message": "This email is already registered. Please use a different email." })
            } else if (error instanceof Error && error.message === "Survey with this phone already exists") {
                form.setError("phone", { "type": "manual", "message": "This phone number is already registered. Please use a different phone number." })
                form.setFocus("phone")
            } else {
                form.setError("root", { "type": "manual", "message": "An unexpected error occurred. Please try again later." });
            }
        }
    }

    const resetForm = () => {
        form.reset()
        setIsSubmitted(false)
    }

    if (isSubmitted) {
        return (
            <Card className="w-full max-w-md text-center mx-auto mt-10">
                <CardContent className="pt-6">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
                    <p className="mb-6">
                        Your survey has been submitted successfully. We appreciate your participation.
                    </p>
                    <div className="space-y-3">
                        <Button onClick={resetForm} className="w-full">
                            Submit Another Survey
                        </Button>
                        <Button variant="outline" asChild className="w-full">
                            <Link to="/login">Admin Login</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )
    }


    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Personal Information</span>
                </CardTitle>
                <CardDescription>Please fill out all required fields marked with an asterisk (*)</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your full name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Gender and Nationality Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gender *</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select gender" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="male">Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="nationality"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Country</FormLabel>
                                        <CountryDropdown
                                            placeholder="Country"
                                            defaultValue={field.value}
                                            onChange={(country) => {
                                                field.onChange(country.name);
                                            }}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Email and Phone Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address *</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="Enter your email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number *</FormLabel>
                                        <FormControl>
                                            <PhoneInput {...field} defaultCountry="IN" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Address */}
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address *</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter your complete address" rows={3} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Message */}
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Additional Message (Optional)</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Any additional comments or feedback..." rows={4} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Anti-spam notice */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-blue-800">
                                <Shield className="w-4 h-4 inline mr-2" />
                                This form is protected against spam. Your information is secure and will only be used for survey
                                purposes.
                            </p>
                        </div>

                        {/* Submit Button */}
                        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit Survey"}
                        </Button>

                        {/* Form Errors Summary */}
                        {Object.keys(errors).length > 0 && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <p className="text-sm text-red-800 font-medium mb-2">Please fix the following errors:</p>
                                <ul className="text-sm text-red-700 space-y-1">
                                    {Object.entries(errors).map(([field, error]) => (
                                        <li key={field}>• {error?.message}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default SurveyForm
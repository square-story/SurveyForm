import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Skeleton */}
                <div className="mb-8">
                    <Skeleton className="h-8 w-64 mb-2" />
                    <Skeleton className="h-4 w-48" />
                </div>

                {/* Stats Cards Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Card key={`stat-${i}`}>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Skeleton className="h-4 w-24 mb-2" />
                                        <Skeleton className="h-8 w-16" />
                                    </div>
                                    <Skeleton className="h-8 w-8 rounded-full" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Table Skeleton */}
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <Skeleton className="h-6 w-48 mb-2" />
                                <Skeleton className="h-4 w-64" />
                            </div>
                            <div className="flex space-x-2">
                                <Skeleton className="h-9 w-24" />
                                <Skeleton className="h-9 w-24" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <Skeleton className="h-10 flex-1" />
                            <Skeleton className="h-10 w-[180px]" />
                        </div>

                        <div className="rounded-md border">
                            <div className="p-4">
                                <div className="grid grid-cols-6 gap-4">
                                    {Array.from({ length: 6 }).map((_, i) => (
                                        <Skeleton key={`header-${i}`} className="h-6" />
                                    ))}
                                </div>
                            </div>
                            <div className="divide-y">
                                {Array.from({ length: 5 }).map((_, rowIndex) => (
                                    <div key={`row-${rowIndex}`} className="p-4">
                                        <div className="grid grid-cols-6 gap-4">
                                            {Array.from({ length: 6 }).map((_, colIndex) => (
                                                <Skeleton key={`cell-${rowIndex}-${colIndex}`} className="h-6" />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-4">
                            <Skeleton className="h-4 w-48" />
                            <div className="flex items-center space-x-6">
                                <Skeleton className="h-8 w-32" />
                                <Skeleton className="h-8 w-24" />
                                <Skeleton className="h-8 w-32" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

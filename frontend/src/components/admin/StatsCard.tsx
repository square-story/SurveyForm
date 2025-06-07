import { Card, CardContent } from "@/components/ui/card"
import React from "react"

interface StatsCardProps {
    title: string
    value: React.ReactNode
    icon?: React.ReactNode
    iconContainerClass?: string
}

export function StatsCard({ title, value, icon, iconContainerClass }: StatsCardProps) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium">{title}</p>
                        <p className="text-3xl font-bold">{value}</p>
                    </div>
                    {icon && (
                        <div className={iconContainerClass}>{icon}</div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
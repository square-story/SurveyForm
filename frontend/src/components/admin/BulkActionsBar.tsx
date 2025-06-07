import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface BulkActionsBarProps {
    selectedCount: number
    onReview: () => void
    onArchive: () => void
    onDelete: () => void
}

export function BulkActionsBar({ selectedCount, onReview, onArchive, onDelete }: BulkActionsBarProps) {
    return (
        <div className="p-3 rounded-md mb-4 flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium">
                {selectedCount} items selected
            </span>
            <div className="flex-1"></div>
            <Button size="sm" variant="outline" onClick={onReview} className="bg-white">
                Mark as Reviewed
            </Button>
            <Button size="sm" variant="outline" onClick={onArchive} className="bg-white">
                Archive
            </Button>
            <Button
                size="sm"
                variant="outline"
                onClick={onDelete}
                className="bg-white text-red-600 hover:text-red-700"
            >
                <Trash2 className="w-4 h-4 mr-1" /> Delete
            </Button>
        </div>
    )
}
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { type ISurvey } from "shared/types"
import { formatTimestamp } from "@/utils/formatDate"

interface SubmissionDetailsDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    submission: ISurvey | null
}

export function SubmissionDetailsDialog({ open, onOpenChange, submission }: SubmissionDetailsDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Submission Details</DialogTitle>
                    <DialogDescription>Complete information for this survey submission</DialogDescription>
                </DialogHeader>
                {submission && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-sm font-medium text-gray-600">Name</Label>
                                <p className="text-sm">{submission.name}</p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-gray-600">Gender</Label>
                                <p className="text-sm capitalize">{submission.gender}</p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-gray-600">Email</Label>
                                <p className="text-sm">{submission.email}</p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-gray-600">Phone</Label>
                                <p className="text-sm">{submission.phone}</p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-gray-600">Nationality</Label>
                                <p className="text-sm">{submission.nationality}</p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-gray-600">Status</Label>
                                <div className="mt-1">
                                    {submission.status === "new" ? (
                                        <Badge variant="default">New</Badge>
                                    ) : submission.status === "reviewed" ? (
                                        <Badge variant="secondary">Reviewed</Badge>
                                    ) : (
                                        <Badge variant="outline">Archived</Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div>
                            <Label className="text-sm font-medium text-gray-600">Address</Label>
                            <p className="text-sm mt-1">{submission.address}</p>
                        </div>
                        {submission.message && (
                            <div>
                                <Label className="text-sm font-medium text-gray-600">Message</Label>
                                <p className="text-sm mt-1">{submission.message}</p>
                            </div>
                        )}
                        <div>
                            <Label className="text-sm font-medium text-gray-600">Submitted At</Label>
                            <p className="text-sm mt-1">
                                {formatTimestamp(new Date(submission.createdAt))}
                            </p>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
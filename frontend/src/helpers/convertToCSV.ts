import type { ISurvey } from "shared/types";

export function convertToCSV(data: ISurvey[]) {
    if (!data.length) return "";
    const keys = Object.keys(data[0]);
    const csvRows = [
        keys.join(","), // header row
        ...data.map(row =>
            keys.map(key => {
                const val = row[key as keyof ISurvey] ?? "";
                return `"${String(val).replace(/"/g, '""')}"`;
            }).join(",")
        ),
    ];
    return csvRows.join("\n");
}
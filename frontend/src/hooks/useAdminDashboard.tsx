import { surveyService } from "@/services/surveyService";
import type { AppDispatch, RootState } from "@/store";
import { setSurveyStats } from "@/store/slices/surveySlice";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export const useAdminDashboard = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const stats = useSelector((state: RootState) => state.survey.stats);


    useEffect(() => {
        const fetchSurveyStats = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await surveyService.getStats();
                dispatch(setSurveyStats(response.data));
            } catch (error: unknown) {
                if (error instanceof Error) {
                    toast.error(error.message);
                } else {
                    toast.error("An unexpected error occurred.");
                }
            } finally {
                setLoading(false);
            }
        }
        fetchSurveyStats();
    }, [dispatch])

    return { stats, loading, error }
}

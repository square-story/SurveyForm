import NavBar from "@/components/common/NavBar"
import MainContent from "@/components/landing/MainContent"
import SurveyForm from "@/components/landing/SurveyForm"
import { ScrollArea } from "@/components/ui/scroll-area"

const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <ScrollArea className="h-[450px] w-full rounded-md border p-4">
                    <MainContent />
                    <SurveyForm />
                </ScrollArea>
            </main>
        </div>
    )
}

export default LandingPage
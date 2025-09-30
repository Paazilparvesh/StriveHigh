import { useState } from "react";

import Sidebar from "/src/Components/ReusableComponents/Sidebar.jsx";

import UserDetails from "/src/Components/AdminComponents/UserComponent/UserDetails.jsx";
import QuizDetails from "/src/Components/AdminComponents/QuizComponent/QuizDetails.jsx";
import AIContent from "/src/Components/AdminComponents/AiComponent/AiContent.jsx";

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState("Users");

    const renderContent = () => {
        switch (activeTab) {
            case "Users":
                return <UserDetails />;
            case "Quiz Details":
                return <QuizDetails />;
            case "AI Content":
                return <AIContent />;
            default:
                return <UserDetails />;
        }
    };

    return (
        <div className=" flex h-screen overflow-y-hidden">
            {/* Sidebar */}
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Main content */}
            <div className="flex-1 p-5 overflow-y-auto mt-14">
                {renderContent()}
            </div>
        </div>
    );
};

export default AdminPage;

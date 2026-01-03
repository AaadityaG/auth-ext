import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { WelcomeCard } from "@/components/WelcomeCard";
import { LoginCard } from "@/components/LoginCard";
import { logger } from "@/lib/logger";
import { apiService } from "@/lib/api";

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(apiService.isAuthenticated());
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [userImage, setUserImage] = useState("");

  const handleLogin = async (username: string, password: string) => {
    try {
      await apiService.login({ username, password });
      
      // Fetch profile to ensure token is working and update user data
      const profile = await apiService.getProfile();
      setUserName(profile.firstName || profile.username);
      setUserEmail(profile.email);
      setUserImage(profile.image);
      setIsLoggedIn(true);
      toast.success("Login successful!");
      logger.log("Login successful!");
    } catch (error) {
      logger.error("Login failed:", error);
      toast.error(error instanceof Error ? error.message : "Login failed. Please try again.");
    }
  };

  const checkAuthStatus = async () => {
    if (apiService.isAuthenticated()) {
      try {
        const profile = await apiService.getProfile();
        setUserName(profile.firstName || profile.username);
        setUserEmail(profile.email);
        setUserImage(profile.image);
        setIsLoggedIn(true);
      } catch (error) {
        logger.error("Failed to fetch profile:", error);
        apiService.logout();
        setIsLoggedIn(false);
        setUserName("");
        setUserEmail("");
        setUserImage("");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const handleLogout = () => {
    apiService.logout();
    setIsLoggedIn(false);
    setUserName("");
    setUserEmail("");
    setUserImage("");
    toast.info("You have been logged out");
    logger.log("You have been logged out");
  };

  if (loading) {
    return (
      <div className="bg-white text-black flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-lg font-medium">Checking authentication status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-white text-black flex flex-col items-center justify-center ">
      {isLoggedIn ? (
        <WelcomeCard 
          userName={userName}
          userEmail={userEmail}
          userImage={userImage}
          onLogout={handleLogout} 
        />
      ) : (
        <LoginCard 
          onLogin={handleLogin} 
        />
      )}
      <Toaster />
    </div>
  );
}

export default App

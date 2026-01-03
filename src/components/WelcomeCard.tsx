import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface WelcomeCardProps {
  userName: string;
  userEmail?: string;
  userImage?: string;
  onLogout: () => void;
}

export function WelcomeCard({ userName, userEmail, userImage, onLogout }: WelcomeCardProps) {
  return (
    <div className="w-[500px] animate-scale-in">
      <Card className="bg-card rounded-2xl shadow-card">
        <CardContent className="p-8 space-y-6">
          {/* User Profile */}
          <div className="flex flex-col items-center gap-4">
            {userImage ? (
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-foreground">
                <img 
                  src={userImage} 
                  alt="User profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full border-2 border-foreground bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-semibold text-primary">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground">Welcome back!</h2>
              <p className="text-lg text-foreground">{userName}</p>
              {userEmail && (
                <p className="text-sm text-muted-foreground mt-1">{userEmail}</p>
              )}
            </div>
          </div>

          {/* Logout Button */}
          <Button
            variant="destructive"
            size="lg"
            className="w-xs !bg-red-500"
            onClick={onLogout}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
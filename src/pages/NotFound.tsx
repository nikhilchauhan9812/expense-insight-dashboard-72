
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-expense-background">
      <div className="text-center p-8 max-w-md mx-auto bg-white rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold text-expense-primary mb-4">404</h1>
        <p className="text-2xl text-expense-text mb-6">Oops! Page not found</p>
        <p className="text-expense-text/80 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button
          asChild
          className="bg-expense-primary hover:bg-expense-primary/90 transition-colors"
        >
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

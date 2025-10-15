import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center gradient-dark">
      <div className="text-center space-y-6 p-8">
        <div className="w-24 h-24 mx-auto rounded-2xl gradient-primary flex items-center justify-center shadow-elegant">
          <span className="text-white font-bold text-5xl">?</span>
        </div>
        <h1 className="text-6xl font-heading font-bold text-white">404</h1>
        <p className="text-xl text-white/80">Oops! This page doesn't exist</p>
        <div className="flex gap-4 justify-center pt-4">
          <Button asChild className="gradient-primary text-white shadow-elegant">
            <Link to="/dashboard">
              <Home className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="#" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

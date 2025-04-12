
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-gradient-to-br from-primary to-accent p-8 flex flex-col justify-center auth-container">
        <div className="max-w-md mx-auto text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          {subtitle && <p className="text-xl opacity-90">{subtitle}</p>}
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;

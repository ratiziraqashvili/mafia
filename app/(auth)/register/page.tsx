import { EyeIcon, SkullIcon } from "lucide-react";
import { RegisterForm } from "./_components/register-form";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10">
      <div className="flex flex-col gap-3 items-center">
        <div className="flex items-center gap-3">
          <SkullIcon color="var(--red)" size={50} />
          <h1 className="text-white text-5xl">MAFIA</h1>
          <EyeIcon color="var(--red)" size={50} />
        </div>
        <div className="">
          <span className="text-muted-foreground font-medium">
            Join the game of deception
          </span>
        </div>
      </div>
      <RegisterForm />
      <div>
        <span className="text-sm text-muted-foreground">
          By creating an account, you agree to our Terms & Privacy Policy
        </span>
      </div>
    </div>
  );
};

export default RegisterPage;

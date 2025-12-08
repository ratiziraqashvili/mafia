import { MafiaHeader } from "@/components/mafia-header";
import { LoginForm } from "./_components/login-form";

const LoginPage = () => {
    return (
     <div className="min-h-screen flex flex-col items-center justify-center gap-10">
      <div className="flex flex-col gap-3 items-center">
        <MafiaHeader />
        <div className="">
          <span className="text-muted-foreground font-medium">
            Join the game of deception
          </span>
        </div>
      </div>
      <LoginForm />
      <div>
        <span className="text-sm text-muted-foreground">
          By creating an account, you agree to our Terms & Privacy Policy
        </span>
      </div>
    </div>
    )
}

export default LoginPage;
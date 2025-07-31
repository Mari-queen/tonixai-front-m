import { toast } from "sonner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginButton } from "@telegram-auth/react";
import { GoogleLogin } from '@react-oauth/google';
import API from "@/lib/api";
import { useAuth } from "@/contexts/AuthProvider";

const Auth = () => {
  const navigate = useNavigate();
  const { user, refresh } = useAuth();

  const telegramAuth = (credential) => {
    API.post('/auth/telegram', credential).then((res) => {
      refresh();
      toast.success('Welcome back!');
    }).catch(err => toast.error(err.message));
  }

  const googleAuth = (credential) => {
    API.post('/auth/google', credential).then((res) => {
      refresh();
      toast.success('Welcome back!');
    }).catch(err => toast.error(err.message));
  }

  useEffect(() => {
    if (user) navigate('/');
  }, [user]);

  return (
    <div className="lg:grid lg:grid-cols-2 min-h-screen relative">
      <div className="absolute lg:static inset-0 overflow-hidden">
        <video src="/videos/login.mp4" className="h-full object-cover blur-lg lg:blur-0" autoPlay muted controls={false} playsInline loop />
      </div>
      <div className="relative lg:bg-gradient-to-b from-background to-muted/20 flex flex-col justify-center items-center gap-10 min-h-screen">
        <div onClick={() => navigate('/')} className="flex flex-col items-center cursor-pointer">
          <img src="/imgs/logo.png" alt="" className="w-20 h-20" />
          <div className="font-bold text-3xl">Tonix AI</div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 border border-white/50 p-5 rounded-lg">
          <GoogleLogin
            theme="filled_blue"
            size="large"
            width={195}
            onSuccess={googleAuth}
            onError={() => toast.error('Login Failed')}
          />
          <div className="w-full flex items-center gap-2">
            <div className="h-px bg-white/50 flex-1" />
            <span>or</span>
            <div className="h-px bg-white/50 flex-1" />
          </div>
          <LoginButton
            botUsername={import.meta.env.VITE_BOT_USERNAME}
            onAuthCallback={telegramAuth}
            buttonSize="large"
            cornerRadius={5}
            showAvatar={false}
            lang="en"
          />
        </div>
      </div>
    </div>
  )
}

export default Auth;
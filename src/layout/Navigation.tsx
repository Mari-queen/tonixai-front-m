import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/button";
import { Menu, X, Home, Image } from "lucide-react";
import { useAuth } from "@/contexts/AuthProvider";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuPortal, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { LogOut } from "lucide-react";

const Navigation = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "AI Generation", path: "/ai-generation", icon: Image },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8">
              <img src="/imgs/logo.png" alt="" />
            </div>
            <span className="text-xl font-space font-bold gradient-text">TONIXAI</span>
          </Link>

          <div className="flex items-center justify-center space-x-2 md:space-x-8">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === item.path
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              {!user && <Button onClick={() => navigate('/auth')} className="bg-gradient-to-r from-tonix-blue to-tonix-cyan hover:from-tonix-cyan hover:to-tonix-blue text-white">
                Log In
              </Button>}

            </div>
            {user && <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.firstName + (user.lastName ? ' ' + user.lastName : '')} />
                  <AvatarFallback>{user.firstName.charAt(0)}{user.lastName?.charAt(0)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuPortal>
                <DropdownMenuContent>
                  <DropdownMenuItem disabled>{user.firstName + (user.lastName ? ' ' + user.lastName : '')}</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/my-images')}>
                    <span className="pr-10">My Images</span>
                    <Image size={16} />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <span className="pr-10">Log out</span>
                    <LogOut size={16} />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenuPortal>
            </DropdownMenu>}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${location.pathname === item.path
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              {!user && <Button onClick={() => { navigate('/auth'); setIsOpen(false); }} className="w-full mt-4 bg-gradient-to-r from-tonix-blue to-tonix-cyan hover:from-tonix-cyan hover:to-tonix-blue text-white">
                Log In
              </Button>}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

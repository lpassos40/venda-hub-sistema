
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      await login(email, password);
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao VendaHub."
      });
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao fazer login",
        description: "Verifique suas credenciais e tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left side - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-10">
            <Link to="/" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Voltar para o início
            </Link>
          </div>
          
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Entre na sua conta</h2>
            <p className="mt-2 text-sm text-gray-600">
              Ou{" "}
              <Link to="/register" className="font-medium text-primary hover:underline">
                crie uma conta gratuita
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="mt-1">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Senha</Label>
                    <div className="text-sm">
                      <a href="#" className="font-medium text-primary hover:underline">
                        Esqueceu a senha?
                      </a>
                    </div>
                  </div>
                  <div className="mt-1">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      placeholder="******"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Entrando...
                      </>
                    ) : (
                      "Entrar"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Image and text */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-primary to-accent">
          <div className="flex h-full items-center justify-center p-12">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl font-bold">VendaHub</h1>
              <p className="mt-4 text-xl">
                A solução completa para gerenciar seu ponto de venda, estoque, produtos e muito mais.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                  <h3 className="font-semibold">Controle de estoque</h3>
                  <p className="text-sm opacity-80">Gerencie seu estoque em tempo real com alertas inteligentes.</p>
                </div>
                <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                  <h3 className="font-semibold">Gestão de vendas</h3>
                  <p className="text-sm opacity-80">Acompanhe suas vendas e visualize relatórios detalhados.</p>
                </div>
                <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                  <h3 className="font-semibold">Gestão de clientes</h3>
                  <p className="text-sm opacity-80">Mantenha um relacionamento próximo com seus clientes.</p>
                </div>
                <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                  <h3 className="font-semibold">Gerenciamento de fornecedores</h3>
                  <p className="text-sm opacity-80">Organize seus fornecedores e melhore seus processos.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

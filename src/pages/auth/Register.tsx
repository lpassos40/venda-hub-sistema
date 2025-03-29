
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const planOptions = [
  {
    id: "free",
    name: "Trial Gratuito",
    price: "R$ 0",
    period: "14 dias",
    description: "Ideal para conhecer o sistema",
    features: [
      "Acesso a todas as funcionalidades básicas",
      "Limite de 50 produtos",
      "Limite de 20 vendas por dia",
      "1 usuário"
    ]
  },
  {
    id: "standard",
    name: "Padrão",
    price: "R$ 99,90",
    period: "mensal",
    description: "Perfeito para pequenos negócios",
    features: [
      "Todas as funcionalidades do Trial",
      "Produtos ilimitados",
      "Vendas ilimitadas",
      "Suporte 5x8",
      "3 usuários",
      "Relatórios básicos"
    ]
  },
  {
    id: "pro",
    name: "Profissional",
    price: "R$ 199,90",
    period: "mensal",
    description: "Completo para médias empresas",
    features: [
      "Todas as funcionalidades do Padrão",
      "Usuários ilimitados",
      "Suporte prioritário 24/7",
      "Relatórios avançados",
      "Integração com sistemas fiscais",
      "Backup diário",
      "Dashboard personalizado"
    ]
  }
];

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStepOne = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword || !businessName) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive"
      });
      return;
    }

    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      await register(name, email, password, businessName, selectedPlan);
      toast({
        title: "Cadastro realizado com sucesso!",
        description: `Bem-vindo ao VendaHub. Seu plano ${planOptions.find(p => p.id === selectedPlan)?.name} foi ativado.`,
      });
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao criar conta",
        description: "Não foi possível criar sua conta. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left side - Image and text */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-primary to-accent">
          <div className="flex h-full items-center justify-center p-12">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl font-bold">VendaHub</h1>
              <p className="mt-4 text-xl">
                Transforme a maneira como você gerencia seu ponto de venda com nossa plataforma completa.
              </p>
              <div className="mt-8">
                <h3 className="text-lg font-semibold">Por que escolher o VendaHub?</h3>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 flex-shrink-0 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3">Interface intuitiva e fácil de usar</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 flex-shrink-0 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3">Gestão completa de produtos e estoque</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 flex-shrink-0 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3">Controle de clientes e fornecedores</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 flex-shrink-0 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3">Relatórios detalhados de vendas e desempenho</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 flex-shrink-0 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3">Acesso de qualquer lugar a qualquer momento</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md lg:max-w-2xl">
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Voltar para o início
            </Link>
          </div>
          
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Crie sua conta</h2>
            <p className="mt-2 text-sm text-gray-600">
              Já tem uma conta?{" "}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Faça login
              </Link>
            </p>
          </div>

          <div className="mt-8">
            {step === 1 ? (
              <div>
                <form onSubmit={handleStepOne} className="space-y-5">
                  <div>
                    <Label htmlFor="name">Nome completo</Label>
                    <div className="mt-1">
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Seu nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="businessName">Nome do negócio</Label>
                    <div className="mt-1">
                      <Input
                        id="businessName"
                        name="businessName"
                        type="text"
                        required
                        placeholder="Nome da sua empresa"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                      />
                    </div>
                  </div>

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
                    <Label htmlFor="password">Senha</Label>
                    <div className="mt-1">
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                        placeholder="******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirme sua senha</Label>
                    <div className="mt-1">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        placeholder="******"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                  >
                    Continuar
                  </Button>
                </form>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Escolha seu plano</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {planOptions.map((plan) => (
                    <Card 
                      key={plan.id} 
                      className={`overflow-hidden transition-all ${selectedPlan === plan.id ? 'ring-2 ring-primary' : 'hover:shadow-md'}`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      <div className={`p-1 text-center ${selectedPlan === plan.id ? 'bg-primary text-white' : 'bg-muted'}`}>
                        {selectedPlan === plan.id && <span>Selecionado</span>}
                      </div>
                      <CardContent className="p-6">
                        <div className="mb-4">
                          <h3 className="text-lg font-bold">{plan.name}</h3>
                          <div className="mt-1">
                            <span className="text-2xl font-bold">{plan.price}</span>
                            {plan.id !== 'free' && <span className="text-sm text-muted-foreground">/{plan.period}</span>}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                        </div>
                        <ul className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          variant={selectedPlan === plan.id ? "default" : "outline"}
                          className="w-full mt-4"
                          onClick={() => setSelectedPlan(plan.id)}
                        >
                          {selectedPlan === plan.id ? "Selecionado" : "Selecionar"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <form onSubmit={handleSubmit} className="mt-6">
                  <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full sm:w-auto"
                      onClick={() => setStep(1)}
                    >
                      Voltar
                    </Button>
                    <Button
                      type="submit"
                      className="w-full sm:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Criando conta...
                        </>
                      ) : (
                        "Criar conta grátis"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            )}
            
            <p className="mt-6 text-center text-xs text-gray-500">
              Ao criar uma conta, você concorda com nossos{" "}
              <a href="#" className="font-medium text-primary hover:underline">
                Termos de Serviço
              </a>{" "}
              e{" "}
              <a href="#" className="font-medium text-primary hover:underline">
                Política de Privacidade
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

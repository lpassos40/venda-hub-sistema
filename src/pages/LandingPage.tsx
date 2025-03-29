
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingCart, BarChart3, Package, Users, Truck, Shield } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white py-4 px-6 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">VendaHub</Link>
          <div className="space-x-4">
            <Link to="/login">
              <Button variant="outline">Entrar</Button>
            </Link>
            <Link to="/register">
              <Button>Cadastrar</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="bg-gradient-to-br from-primary to-accent py-20 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">O sistema completo para seu ponto de venda</h1>
            <p className="text-xl mb-8">
              Gerencie vendas, estoque, produtos, clientes e fornecedores em uma única plataforma intuitiva. Otimize seu negócio com o VendaHub.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Começar agora - É grátis!
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Tudo que você precisa para gerenciar seu negócio</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Vendas simplificadas</h3>
              <p className="text-gray-600">
                Interface intuitiva para processamento rápido de pedidos, com suporte a diversos métodos de pagamento.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gestão de produtos</h3>
              <p className="text-gray-600">
                Cadastre seus produtos, defina preços, categorias e acompanhe o desempenho de vendas de cada item.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Controle de estoque</h3>
              <p className="text-gray-600">
                Monitore seu estoque em tempo real, receba alertas de produtos com baixo estoque e gere relatórios.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gestão de clientes</h3>
              <p className="text-gray-600">
                Mantenha um cadastro completo de clientes, histórico de compras e preferências para fidelização.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gestão de fornecedores</h3>
              <p className="text-gray-600">
                Organize seus fornecedores, histórico de compras e melhore o relacionamento com seus parceiros.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Segurança e privacidade</h3>
              <p className="text-gray-600">
                Todos os seus dados são protegidos com criptografia e práticas avançadas de segurança.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para transformar seu negócio?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de empreendedores que já otimizaram seus negócios com o VendaHub.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Criar minha conta gratuitamente
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-bold text-white mb-4">VendaHub</h3>
              <p className="max-w-xs">
                A solução completa para seu ponto de venda, com tudo que você precisa para crescer seu negócio.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-medium text-white mb-4">Produto</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">Recursos</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Integrações</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Atualizações</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium text-white mb-4">Suporte</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">Ajuda</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Tutoriais</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium text-white mb-4">Empresa</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Legal</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-400">
            <p>© {new Date().getFullYear()} VendaHub. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

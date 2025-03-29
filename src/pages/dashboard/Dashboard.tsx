
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Bar, ResponsiveContainer } from "recharts";
import { ArrowUpRight, DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

// Mock data for charts
const salesData = [
  { name: 'Jan', value: 2400 },
  { name: 'Fev', value: 1398 },
  { name: 'Mar', value: 9800 },
  { name: 'Abr', value: 3908 },
  { name: 'Mai', value: 4800 },
  { name: 'Jun', value: 3800 },
  { name: 'Jul', value: 4300 },
];

const productCategoryData = [
  { name: 'Eletrônicos', value: 4000 },
  { name: 'Roupas', value: 3000 },
  { name: 'Alimentos', value: 2000 },
  { name: 'Livros', value: 2780 },
  { name: 'Outros', value: 1890 },
];

const recentOrders = [
  { id: '#5678', customer: 'Maria Silva', total: 'R$ 120,00', status: 'Concluído', date: '15/04/2023' },
  { id: '#5679', customer: 'João Santos', total: 'R$ 89,90', status: 'Processando', date: '15/04/2023' },
  { id: '#5680', customer: 'Ana Oliveira', total: 'R$ 250,75', status: 'Concluído', date: '14/04/2023' },
  { id: '#5681', customer: 'Carlos Pereira', total: 'R$ 62,50', status: 'Concluído', date: '14/04/2023' },
  { id: '#5682', customer: 'Luciana Costa', total: 'R$ 175,00', status: 'Cancelado', date: '13/04/2023' },
];

const lowStockProducts = [
  { id: '001', name: 'Smartphone X', stock: 3, min: 5 },
  { id: '015', name: 'Headphone Pro', stock: 2, min: 5 },
  { id: '022', name: 'Tablet Y', stock: 1, min: 3 },
];

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo de volta, {user?.name || "Usuário"}!
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Exportar</Button>
          <Button>Ver relatórios</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="stats-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Vendas Hoje
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 1.523,90</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+25%</span>
              <span className="ml-1">desde ontem</span>
            </p>
          </CardContent>
        </Card>

        <Card className="stats-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pedidos
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+12%</span>
              <span className="ml-1">desde ontem</span>
            </p>
          </CardContent>
        </Card>

        <Card className="stats-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Produtos
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">435</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span>3 com estoque baixo</span>
            </p>
          </CardContent>
        </Card>

        <Card className="stats-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Clientes
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">256</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+5</span>
              <span className="ml-1">novos hoje</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Vendas do Mês</CardTitle>
            <CardDescription>
              Resumo de vendas nos últimos 7 meses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    name="Vendas (R$)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Vendas por Categoria</CardTitle>
            <CardDescription>
              Distribuição de vendas por categoria de produto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productCategoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    name="Vendas (R$)" 
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders & Low Stock */}
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="dashboard-card md:col-span-4">
          <CardHeader>
            <CardTitle>Pedidos Recentes</CardTitle>
            <CardDescription>
              Últimos 5 pedidos realizados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-5 text-xs font-medium text-muted-foreground">
                <div>Pedido</div>
                <div className="col-span-2">Cliente</div>
                <div>Total</div>
                <div>Status</div>
              </div>
              <div className="divide-y">
                {recentOrders.map((order) => (
                  <div key={order.id} className="grid grid-cols-5 py-3 text-sm">
                    <div className="font-medium">{order.id}</div>
                    <div className="col-span-2">{order.customer}</div>
                    <div>{order.total}</div>
                    <div>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
                        order.status === "Concluído" 
                          ? "bg-green-100 text-green-800" 
                          : order.status === "Processando" 
                          ? "bg-blue-100 text-blue-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full">
                Ver todos os pedidos
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card md:col-span-3">
          <CardHeader>
            <CardTitle>Produtos com Estoque Baixo</CardTitle>
            <CardDescription>
              Produtos que precisam de reposição
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 text-xs font-medium text-muted-foreground">
                <div>Produto</div>
                <div>Estoque</div>
                <div>Mínimo</div>
              </div>
              <div className="divide-y">
                {lowStockProducts.map((product) => (
                  <div key={product.id} className="grid grid-cols-3 py-3 text-sm">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-red-500 font-bold">{product.stock}</div>
                    <div>{product.min}</div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full">
                Gerenciar estoque
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

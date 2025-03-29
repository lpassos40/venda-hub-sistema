
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, FileText, ChevronDown, ChevronUp, Eye, ShoppingCart, Clock, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockOrders = [
  { 
    id: "ORD-001", 
    customer: "Maria Silva", 
    date: "15/04/2023", 
    total: 550.75, 
    status: "completed", 
    paymentMethod: "Cartão de Crédito",
    items: [
      { id: "1", product: "Smartphone X", price: 1299.99, quantity: 1 },
      { id: "2", product: "Capa Protetora", price: 49.90, quantity: 1 },
    ]
  },
  { 
    id: "ORD-002", 
    customer: "João Santos", 
    date: "15/04/2023", 
    total: 89.90, 
    status: "processing", 
    paymentMethod: "Cartão de Débito",
    items: [
      { id: "1", product: "Mouse Wireless", price: 89.90, quantity: 1 }
    ]
  },
  { 
    id: "ORD-003", 
    customer: "Ana Oliveira", 
    date: "14/04/2023", 
    total: 2999.95, 
    status: "completed", 
    paymentMethod: "Pix",
    items: [
      { id: "1", product: "Laptop Pro", price: 2999.95, quantity: 1 }
    ]
  },
  { 
    id: "ORD-004", 
    customer: "Carlos Pereira", 
    date: "14/04/2023", 
    total: 449.97, 
    status: "completed", 
    paymentMethod: "Dinheiro",
    items: [
      { id: "1", product: "Headphone Premium", price: 299.99, quantity: 1 },
      { id: "2", product: "Mouse Wireless", price: 149.98, quantity: 1 }
    ]
  },
  { 
    id: "ORD-005", 
    customer: "Luciana Costa", 
    date: "13/04/2023", 
    total: 3249.97, 
    status: "cancelled", 
    paymentMethod: "Cartão de Crédito",
    items: [
      { id: "1", product: "Laptop Pro", price: 2999.99, quantity: 1 },
      { id: "2", product: "Mouse Wireless", price: 89.99, quantity: 1 },
      { id: "3", product: "Capa para Laptop", price: 159.99, quantity: 1 }
    ]
  },
  { 
    id: "ORD-006", 
    customer: "Roberto Almeida", 
    date: "12/04/2023", 
    total: 1399.98, 
    status: "completed", 
    paymentMethod: "Pix",
    items: [
      { id: "1", product: "Smartphone X", price: 1299.99, quantity: 1 },
      { id: "2", product: "Carregador Rápido", price: 99.99, quantity: 1 }
    ]
  },
];

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredOrders = mockOrders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleNewOrder = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "A criação de novos pedidos será implementada em breve."
    });
  };

  const handleViewOrder = (orderId: string) => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: `Visualização detalhada do pedido ${orderId} será implementada em breve.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
          <p className="text-muted-foreground">
            Visualize e gerencie os pedidos dos clientes
          </p>
        </div>
        <Button onClick={handleNewOrder}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Pedido
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockOrders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {mockOrders.filter(order => order.status === "completed").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Em Processamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">
              {mockOrders.filter(order => order.status === "processing").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cancelados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {mockOrders.filter(order => order.status === "cancelled").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="completed">Concluídos</TabsTrigger>
            <TabsTrigger value="processing">Em Processamento</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelados</TabsTrigger>
          </TabsList>

          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar pedidos..."
              className="pl-8 w-full md:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Nenhum pedido encontrado</h3>
                <p className="text-sm text-muted-foreground">
                  Tente ajustar sua busca ou crie um novo pedido.
                </p>
                <Button className="mt-4" onClick={handleNewOrder}>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Pedido
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <div className="text-right sm:text-left">
                          <p className="text-sm">{order.date}</p>
                          <p className="font-medium">R$ {order.total.toFixed(2)}</p>
                        </div>
                        <div>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                            order.status === "completed" 
                              ? "bg-green-100 text-green-800" 
                              : order.status === "processing" 
                              ? "bg-blue-100 text-blue-800" 
                              : "bg-red-100 text-red-800"
                          }`}>
                            {order.status === "completed" && <CheckCircle className="mr-1 h-3 w-3" />}
                            {order.status === "processing" && <Clock className="mr-1 h-3 w-3" />}
                            {order.status === "cancelled" && <XCircle className="mr-1 h-3 w-3" />}
                            {order.status === "completed" ? "Concluído" : 
                              order.status === "processing" ? "Em Processamento" : "Cancelado"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewOrder(order.id)}>
                          <Eye className="mr-2 h-3.5 w-3.5" />
                          Detalhes
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleToggleOrderDetails(order.id)}
                          className="px-2"
                        >
                          {expandedOrder === order.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    {expandedOrder === order.id && (
                      <div className="mt-6 border-t pt-4">
                        <h4 className="text-sm font-medium mb-2">Detalhes do Pedido</h4>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Método de Pagamento: {order.paymentMethod}</p>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium mb-2">Itens</h5>
                            <div className="space-y-2">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex justify-between text-sm">
                                  <span>{item.quantity}x {item.product}</span>
                                  <span>R$ {item.price.toFixed(2)}</span>
                                </div>
                              ))}
                              <div className="border-t pt-2 flex justify-between font-medium">
                                <span>Total</span>
                                <span>R$ {order.total.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pedidos Concluídos</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lista de pedidos concluídos será carregada aqui</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="processing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pedidos Em Processamento</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lista de pedidos em processamento será carregada aqui</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pedidos Cancelados</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lista de pedidos cancelados será carregada aqui</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Orders;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Edit, Trash2, UserPlus, UserCheck, Mail, Phone, MapPin, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockCustomers = [
  { id: "1", name: "Maria Silva", email: "maria@exemplo.com", phone: "(11) 98765-4321", address: "Rua das Flores, 123", city: "São Paulo", registered: "12/01/2023", lastPurchase: "15/04/2023", totalSpent: 1230.50, status: "active" },
  { id: "2", name: "João Santos", email: "joao@exemplo.com", phone: "(11) 97654-3210", address: "Av. Paulista, 1000", city: "São Paulo", registered: "05/02/2023", lastPurchase: "14/04/2023", totalSpent: 895.75, status: "active" },
  { id: "3", name: "Ana Oliveira", email: "ana@exemplo.com", phone: "(21) 98765-1234", address: "Rua Copacabana, 500", city: "Rio de Janeiro", registered: "20/12/2022", lastPurchase: "10/04/2023", totalSpent: 2450.00, status: "active" },
  { id: "4", name: "Carlos Pereira", email: "carlos@exemplo.com", phone: "(11) 91234-5678", address: "Rua Augusta, 200", city: "São Paulo", registered: "15/03/2023", lastPurchase: "08/04/2023", totalSpent: 375.25, status: "inactive" },
  { id: "5", name: "Luciana Costa", email: "luciana@exemplo.com", phone: "(31) 98877-6655", address: "Av. Afonso Pena, 1500", city: "Belo Horizonte", registered: "10/01/2023", lastPurchase: "05/04/2023", totalSpent: 1875.30, status: "active" },
  { id: "6", name: "Roberto Almeida", email: "roberto@exemplo.com", phone: "(11) 92233-4455", address: "Rua Oscar Freire, 300", city: "São Paulo", registered: "25/02/2023", lastPurchase: "01/04/2023", totalSpent: 765.90, status: "active" },
  { id: "7", name: "Fernanda Lima", email: "fernanda@exemplo.com", phone: "(21) 93344-5566", address: "Av. Atlântica, 2000", city: "Rio de Janeiro", registered: "05/03/2023", lastPurchase: "25/03/2023", totalSpent: 3250.75, status: "inactive" },
  { id: "8", name: "Ricardo Souza", email: "ricardo@exemplo.com", phone: "(41) 99988-7766", address: "Rua XV de Novembro, 100", city: "Curitiba", registered: "18/01/2023", lastPurchase: "20/03/2023", totalSpent: 950.00, status: "active" },
];

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredCustomers = mockCustomers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const handleAddCustomer = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "A adição de clientes será implementada em breve."
    });
  };

  const handleEditCustomer = (id: string) => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: `Edição do cliente ${id} será implementada em breve.`
    });
  };

  const handleDeleteCustomer = (id: string) => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: `Exclusão do cliente ${id} será implementada em breve.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <p className="text-muted-foreground">
            Gerencie seus clientes e visualize históricos de compra
          </p>
        </div>
        <Button onClick={handleAddCustomer}>
          <UserPlus className="mr-2 h-4 w-4" />
          Adicionar Cliente
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="active">Ativos</TabsTrigger>
            <TabsTrigger value="inactive">Inativos</TabsTrigger>
          </TabsList>

          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar clientes..."
              className="pl-8 w-full md:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockCustomers.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockCustomers.filter(c => c.status === "active").length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Média de Gastos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  R$ {(mockCustomers.reduce((acc, c) => acc + c.totalSpent, 0) / mockCustomers.length).toFixed(2)}
                </div>
              </CardContent>
            </Card>
          </div>

          {filteredCustomers.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <UserCheck className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Nenhum cliente encontrado</h3>
                <p className="text-sm text-muted-foreground">
                  Tente ajustar sua busca ou adicione novos clientes.
                </p>
                <Button className="mt-4" onClick={handleAddCustomer}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Adicionar Cliente
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs border-b">
                      <tr>
                        <th className="px-6 py-3">Nome</th>
                        <th className="px-6 py-3">Contato</th>
                        <th className="px-6 py-3">Cidade</th>
                        <th className="px-6 py-3">Cliente desde</th>
                        <th className="px-6 py-3">Última compra</th>
                        <th className="px-6 py-3">Total gasto</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCustomers.map((customer) => (
                        <tr key={customer.id} className="border-b hover:bg-muted/50">
                          <td className="px-6 py-4 font-medium">{customer.name}</td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col space-y-1">
                              <span className="flex items-center text-xs">
                                <Mail className="mr-1 h-3 w-3" />
                                {customer.email}
                              </span>
                              <span className="flex items-center text-xs">
                                <Phone className="mr-1 h-3 w-3" />
                                {customer.phone}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="flex items-center text-xs">
                              <MapPin className="mr-1 h-3 w-3" />
                              {customer.city}
                            </span>
                          </td>
                          <td className="px-6 py-4">{customer.registered}</td>
                          <td className="px-6 py-4">{customer.lastPurchase}</td>
                          <td className="px-6 py-4">
                            <span className="flex items-center text-xs">
                              <CreditCard className="mr-1 h-3 w-3" />
                              R$ {customer.totalSpent.toFixed(2)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
                              customer.status === "active" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-gray-100 text-gray-800" 
                            }`}>
                              {customer.status === "active" ? "Ativo" : "Inativo"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleEditCustomer(customer.id)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => handleDeleteCustomer(customer.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Clientes Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lista de clientes ativos será carregada aqui</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Clientes Inativos</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lista de clientes inativos será carregada aqui</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Customers;

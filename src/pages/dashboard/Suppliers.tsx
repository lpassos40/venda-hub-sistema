
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Edit, Trash2, Truck, Building, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockSuppliers = [
  { id: "1", name: "Tech Solutions", contact: "Carlos Silva", email: "contato@techsolutions.com", phone: "(11) 3456-7890", address: "Av. Paulista, 1000", city: "São Paulo", country: "Brasil", since: "12/01/2021", lastOrder: "10/04/2023", category: "Eletrônicos" },
  { id: "2", name: "Office Supplies Co.", contact: "Ana Rodrigues", email: "vendas@officesupplies.com", phone: "(11) 2345-6789", address: "Rua Augusta, 500", city: "São Paulo", country: "Brasil", since: "05/03/2022", lastOrder: "05/04/2023", category: "Escritório" },
  { id: "3", name: "Global Imports", contact: "Roberto Santos", email: "contato@globalimports.com", phone: "(21) 3456-7890", address: "Av. Rio Branco, 100", city: "Rio de Janeiro", country: "Brasil", since: "20/06/2021", lastOrder: "01/04/2023", category: "Importados" },
  { id: "4", name: "Digital World", contact: "Marina Lima", email: "vendas@digitalworld.com", phone: "(11) 4567-8901", address: "Rua Vergueiro, 200", city: "São Paulo", country: "Brasil", since: "15/04/2022", lastOrder: "25/03/2023", category: "Eletrônicos" },
  { id: "5", name: "Smart Devices", contact: "Fernando Costa", email: "contato@smartdevices.com", phone: "(31) 2345-6789", address: "Av. Afonso Pena, 500", city: "Belo Horizonte", country: "Brasil", since: "10/08/2021", lastOrder: "20/03/2023", category: "Eletrônicos" },
  { id: "6", name: "Clean Solutions", contact: "Carla Oliveira", email: "vendas@cleansolutions.com", phone: "(11) 5678-9012", address: "Av. Brigadeiro Faria Lima, 1500", city: "São Paulo", country: "Brasil", since: "25/11/2022", lastOrder: "15/03/2023", category: "Limpeza" },
];

const Suppliers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredSuppliers = mockSuppliers.filter(supplier => 
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSupplier = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "A adição de fornecedores será implementada em breve."
    });
  };

  const handleEditSupplier = (id: string) => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: `Edição do fornecedor ${id} será implementada em breve.`
    });
  };

  const handleDeleteSupplier = (id: string) => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: `Exclusão do fornecedor ${id} será implementada em breve.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fornecedores</h1>
          <p className="text-muted-foreground">
            Gerencie seus fornecedores e parcerias
          </p>
        </div>
        <Button onClick={handleAddSupplier}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Fornecedor
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="electronics">Eletrônicos</TabsTrigger>
            <TabsTrigger value="office">Escritório</TabsTrigger>
            <TabsTrigger value="other">Outros</TabsTrigger>
          </TabsList>

          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar fornecedores..."
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
                <CardTitle className="text-sm font-medium">Total de Fornecedores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockSuppliers.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Fornecedores de Eletrônicos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockSuppliers.filter(s => s.category === "Eletrônicos").length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Última Atualização</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15/04/2023</div>
              </CardContent>
            </Card>
          </div>

          {filteredSuppliers.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Truck className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Nenhum fornecedor encontrado</h3>
                <p className="text-sm text-muted-foreground">
                  Tente ajustar sua busca ou adicione novos fornecedores.
                </p>
                <Button className="mt-4" onClick={handleAddSupplier}>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Fornecedor
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredSuppliers.map((supplier) => (
                <Card key={supplier.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{supplier.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{supplier.category}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditSupplier(supplier.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleDeleteSupplier(supplier.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{supplier.contact}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{supplier.email}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{supplier.phone}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{supplier.city}, {supplier.country}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>Parceiro desde: {supplier.since}</span>
                      </div>
                      <div className="pt-2 border-t">
                        <span className="text-sm">Último pedido: <strong>{supplier.lastOrder}</strong></span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="electronics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fornecedores de Eletrônicos</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lista de fornecedores de eletrônicos será carregada aqui</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="office" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fornecedores de Escritório</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lista de fornecedores de materiais de escritório será carregada aqui</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="other" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Outros Fornecedores</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lista de outros tipos de fornecedores será carregada aqui</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Suppliers;

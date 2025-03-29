
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Search, Plus, Edit, Trash2, Grid2X2, List } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockProducts = [
  { id: "1", name: "Smartphone X", sku: "SP-001", price: 1299.99, category: "Eletrônicos", stock: 15 },
  { id: "2", name: "Laptop Pro", sku: "LP-002", price: 3499.99, category: "Eletrônicos", stock: 8 },
  { id: "3", name: "Headphone Premium", sku: "HP-003", price: 299.99, category: "Acessórios", stock: 22 },
  { id: "4", name: "Mouse Wireless", sku: "MW-004", price: 89.99, category: "Acessórios", stock: 34 },
  { id: "5", name: "Teclado Mecânico", sku: "TM-005", price: 199.99, category: "Acessórios", stock: 12 },
  { id: "6", name: "Monitor 27\"", sku: "MO-006", price: 899.99, category: "Eletrônicos", stock: 5 },
  { id: "7", name: "Caixa de Som Bluetooth", sku: "CS-007", price: 149.99, category: "Acessórios", stock: 18 },
  { id: "8", name: "Câmera DSLR", sku: "CD-008", price: 2999.99, category: "Eletrônicos", stock: 3 },
];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { toast } = useToast();

  const filteredProducts = mockProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "A adição de produtos será implementada em breve."
    });
  };

  const handleEditProduct = (id: string) => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: `Edição do produto ${id} será implementada em breve.`
    });
  };

  const handleDeleteProduct = (id: string) => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: `Exclusão do produto ${id} será implementada em breve.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
          <p className="text-muted-foreground">
            Gerencie seu catálogo de produtos
          </p>
        </div>
        <Button onClick={handleAddProduct}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Produto
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="electronics">Eletrônicos</TabsTrigger>
            <TabsTrigger value="accessories">Acessórios</TabsTrigger>
            <TabsTrigger value="lowstock">Estoque Baixo</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex border rounded-md">
              <Button
                variant="ghost"
                size="sm"
                className={`px-2 ${viewMode === 'grid' ? 'bg-muted' : ''}`}
                onClick={() => setViewMode("grid")}
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`px-2 ${viewMode === 'list' ? 'bg-muted' : ''}`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          {filteredProducts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Nenhum produto encontrado</h3>
                <p className="text-sm text-muted-foreground">
                  Tente ajustar sua busca ou adicione novos produtos.
                </p>
                <Button className="mt-4" onClick={handleAddProduct}>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Produto
                </Button>
              </CardContent>
            </Card>
          ) : viewMode === "grid" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="aspect-square bg-muted flex items-center justify-center">
                    <Package className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="line-clamp-1 text-lg">{product.name}</CardTitle>
                    <CardDescription className="line-clamp-1">
                      {product.sku} - {product.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex justify-between">
                      <p className="font-bold">R$ {product.price.toFixed(2)}</p>
                      <p className={`${product.stock < 5 ? 'text-red-500' : product.stock < 10 ? 'text-amber-500' : 'text-green-500'}`}>
                        Estoque: {product.stock}
                      </p>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full"
                        onClick={() => handleEditProduct(product.id)}
                      >
                        <Edit className="mr-2 h-3.5 w-3.5" />
                        Editar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full text-red-500 hover:text-red-600"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="mr-2 h-3.5 w-3.5" />
                        Excluir
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs border-b">
                      <tr>
                        <th className="px-6 py-3">Nome</th>
                        <th className="px-6 py-3">SKU</th>
                        <th className="px-6 py-3">Categoria</th>
                        <th className="px-6 py-3">Preço</th>
                        <th className="px-6 py-3">Estoque</th>
                        <th className="px-6 py-3">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="border-b hover:bg-muted/50">
                          <td className="px-6 py-4 font-medium">{product.name}</td>
                          <td className="px-6 py-4">{product.sku}</td>
                          <td className="px-6 py-4">{product.category}</td>
                          <td className="px-6 py-4">R$ {product.price.toFixed(2)}</td>
                          <td className="px-6 py-4">
                            <span className={`${product.stock < 5 ? 'text-red-500' : product.stock < 10 ? 'text-amber-500' : 'text-green-500'}`}>
                              {product.stock}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleEditProduct(product.id)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => handleDeleteProduct(product.id)}
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

        <TabsContent value="electronics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Produtos Eletrônicos</CardTitle>
              <CardDescription>
                Lista de todos os produtos na categoria Eletrônicos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Lista de eletrônicos será carregada aqui</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accessories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Acessórios</CardTitle>
              <CardDescription>
                Lista de todos os produtos na categoria Acessórios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Lista de acessórios será carregada aqui</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lowstock" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Estoque Baixo</CardTitle>
              <CardDescription>
                Produtos com estoque abaixo do mínimo recomendado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Lista de produtos com estoque baixo será carregada aqui</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Products;

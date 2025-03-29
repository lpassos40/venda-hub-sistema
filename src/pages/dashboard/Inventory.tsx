
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Plus, ArrowDown, ArrowUp, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock inventory data
const inventoryItems = [
  { id: "1", productName: "Smartphone X", sku: "SP-001", currentStock: 15, minStock: 5, maxStock: 30, location: "A-01-01" },
  { id: "2", productName: "Laptop Pro", sku: "LP-002", currentStock: 8, minStock: 5, maxStock: 20, location: "A-02-03" },
  { id: "3", productName: "Headphone Premium", sku: "HP-003", currentStock: 22, minStock: 10, maxStock: 40, location: "B-01-02" },
  { id: "4", productName: "Mouse Wireless", sku: "MW-004", currentStock: 4, minStock: 5, maxStock: 30, location: "B-02-01" },
  { id: "5", productName: "Teclado Mecânico", sku: "TM-005", currentStock: 12, minStock: 8, maxStock: 25, location: "B-02-02" },
  { id: "6", productName: "Monitor 27\"", sku: "MO-006", currentStock: 3, minStock: 5, maxStock: 15, location: "C-01-01" },
  { id: "7", productName: "Caixa de Som Bluetooth", sku: "CS-007", currentStock: 18, minStock: 10, maxStock: 35, location: "C-02-03" },
  { id: "8", productName: "Câmera DSLR", sku: "CD-008", currentStock: 2, minStock: 5, maxStock: 15, location: "D-01-02" },
];

// Mock stock movements
const stockMovements = [
  { id: "1", date: "15/04/2023", productName: "Laptop Pro", type: "entrada", quantity: 5, notes: "Reposição de estoque" },
  { id: "2", date: "15/04/2023", productName: "Smartphone X", type: "saída", quantity: 2, notes: "Venda #5678" },
  { id: "3", date: "14/04/2023", productName: "Headphone Premium", type: "entrada", quantity: 10, notes: "Reposição de estoque" },
  { id: "4", date: "14/04/2023", productName: "Monitor 27\"", type: "saída", quantity: 1, notes: "Venda #5680" },
  { id: "5", date: "13/04/2023", productName: "Câmera DSLR", type: "saída", quantity: 1, notes: "Venda #5682" },
];

const Inventory = () => {
  const { toast } = useToast();

  const handleAddMovement = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "O registro de movimentação será implementado em breve."
    });
  };

  const handleUpdateStock = (id: string) => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: `A atualização do estoque do produto ${id} será implementada em breve.`
    });
  };

  // Get low stock items
  const lowStockItems = inventoryItems.filter(item => item.currentStock < item.minStock);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Estoque</h1>
          <p className="text-muted-foreground">
            Gerencie o estoque de produtos e acompanhe movimentações
          </p>
        </div>
        <Button onClick={handleAddMovement}>
          <Plus className="mr-2 h-4 w-4" />
          Registrar Movimentação
        </Button>
      </div>

      {lowStockItems.length > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-4 flex items-start">
            <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium text-amber-800">Atenção: Produtos com estoque baixo</h3>
              <p className="text-sm text-amber-700">
                {lowStockItems.length} produto(s) estão com estoque abaixo do mínimo recomendado.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="stock">Estoque Atual</TabsTrigger>
          <TabsTrigger value="movements">Movimentações</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{inventoryItems.length}</div>
                <p className="text-xs text-muted-foreground">
                  produtos cadastrados no sistema
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Estoque Baixo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-500">{lowStockItems.length}</div>
                <p className="text-xs text-muted-foreground">
                  produtos abaixo do mínimo
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Entradas Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">
                  {stockMovements.filter(m => m.type === "entrada").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  nos últimos 30 dias
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Saídas Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-500">
                  {stockMovements.filter(m => m.type === "saída").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  nos últimos 30 dias
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Low stock items */}
          <Card>
            <CardHeader>
              <CardTitle>Produtos com Estoque Baixo</CardTitle>
            </CardHeader>
            <CardContent>
              {lowStockItems.length === 0 ? (
                <p className="text-muted-foreground">Nenhum produto com estoque baixo.</p>
              ) : (
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs border-b">
                      <tr>
                        <th className="px-6 py-3">Produto</th>
                        <th className="px-6 py-3">SKU</th>
                        <th className="px-6 py-3">Estoque Atual</th>
                        <th className="px-6 py-3">Estoque Mínimo</th>
                        <th className="px-6 py-3">Localização</th>
                        <th className="px-6 py-3">Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lowStockItems.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-muted/50">
                          <td className="px-6 py-4 font-medium">{item.productName}</td>
                          <td className="px-6 py-4">{item.sku}</td>
                          <td className="px-6 py-4 text-red-500 font-bold">{item.currentStock}</td>
                          <td className="px-6 py-4">{item.minStock}</td>
                          <td className="px-6 py-4">{item.location}</td>
                          <td className="px-6 py-4">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleUpdateStock(item.id)}
                            >
                              Adicionar Estoque
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent movements */}
          <Card>
            <CardHeader>
              <CardTitle>Movimentações Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs border-b">
                    <tr>
                      <th className="px-6 py-3">Data</th>
                      <th className="px-6 py-3">Produto</th>
                      <th className="px-6 py-3">Tipo</th>
                      <th className="px-6 py-3">Quantidade</th>
                      <th className="px-6 py-3">Observações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stockMovements.map((movement) => (
                      <tr key={movement.id} className="border-b hover:bg-muted/50">
                        <td className="px-6 py-4">{movement.date}</td>
                        <td className="px-6 py-4 font-medium">{movement.productName}</td>
                        <td className="px-6 py-4">
                          <span className={`flex items-center ${movement.type === "entrada" ? "text-green-500" : "text-blue-500"}`}>
                            {movement.type === "entrada" ? (
                              <ArrowUp className="mr-1 h-4 w-4" />
                            ) : (
                              <ArrowDown className="mr-1 h-4 w-4" />
                            )}
                            {movement.type === "entrada" ? "Entrada" : "Saída"}
                          </span>
                        </td>
                        <td className="px-6 py-4">{movement.quantity}</td>
                        <td className="px-6 py-4">{movement.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stock" className="space-y-4">
          <div className="flex justify-between mb-4">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar produtos..." className="pl-8" />
            </div>
            <Button variant="outline">
              Exportar relatório
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs border-b">
                    <tr>
                      <th className="px-6 py-3">Produto</th>
                      <th className="px-6 py-3">SKU</th>
                      <th className="px-6 py-3">Estoque Atual</th>
                      <th className="px-6 py-3">Mínimo</th>
                      <th className="px-6 py-3">Máximo</th>
                      <th className="px-6 py-3">Localização</th>
                      <th className="px-6 py-3">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryItems.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-muted/50">
                        <td className="px-6 py-4 font-medium">{item.productName}</td>
                        <td className="px-6 py-4">{item.sku}</td>
                        <td className={`px-6 py-4 font-bold ${
                          item.currentStock < item.minStock 
                            ? "text-red-500" 
                            : item.currentStock >= item.maxStock 
                              ? "text-amber-500" 
                              : "text-green-500"
                        }`}>
                          {item.currentStock}
                        </td>
                        <td className="px-6 py-4">{item.minStock}</td>
                        <td className="px-6 py-4">{item.maxStock}</td>
                        <td className="px-6 py-4">{item.location}</td>
                        <td className="px-6 py-4">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleUpdateStock(item.id)}
                          >
                            Atualizar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movements" className="space-y-4">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Registrar Nova Movimentação</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="product">Produto</Label>
                    <Input id="product" placeholder="Selecione o produto" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo</Label>
                    <select 
                      id="type" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Selecione o tipo</option>
                      <option value="entrada">Entrada</option>
                      <option value="saída">Saída</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantidade</Label>
                    <Input id="quantity" type="number" min="1" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Data</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="notes">Observações</Label>
                    <textarea 
                      id="notes" 
                      rows={3}
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Adicione observações sobre esta movimentação"
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <Button onClick={handleAddMovement}>Registrar Movimentação</Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Histórico de Movimentações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs border-b">
                      <tr>
                        <th className="px-6 py-3">Data</th>
                        <th className="px-6 py-3">Produto</th>
                        <th className="px-6 py-3">Tipo</th>
                        <th className="px-6 py-3">Quantidade</th>
                        <th className="px-6 py-3">Observações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stockMovements.map((movement) => (
                        <tr key={movement.id} className="border-b hover:bg-muted/50">
                          <td className="px-6 py-4">{movement.date}</td>
                          <td className="px-6 py-4 font-medium">{movement.productName}</td>
                          <td className="px-6 py-4">
                            <span className={`flex items-center ${movement.type === "entrada" ? "text-green-500" : "text-blue-500"}`}>
                              {movement.type === "entrada" ? (
                                <ArrowUp className="mr-1 h-4 w-4" />
                              ) : (
                                <ArrowDown className="mr-1 h-4 w-4" />
                              )}
                              {movement.type === "entrada" ? "Entrada" : "Saída"}
                            </span>
                          </td>
                          <td className="px-6 py-4">{movement.quantity}</td>
                          <td className="px-6 py-4">{movement.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Inventory;


import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Search, Plus, Download, Eye, AlertCircle, Check, Clock, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockInvoices = [
  {
    id: "NF-001",
    customer: "Empresa ABC Ltda",
    date: "15/05/2023",
    total: "R$ 1.250,00",
    status: "emitida"
  },
  {
    id: "NF-002",
    customer: "Mercado XYZ",
    date: "18/05/2023",
    total: "R$ 3.780,50",
    status: "emitida"
  },
  {
    id: "NF-003",
    customer: "Distribuidora 123",
    date: "20/05/2023",
    total: "R$ 5.490,00",
    status: "pendente"
  },
  {
    id: "NF-004",
    customer: "Farmácia Bem Estar",
    date: "22/05/2023",
    total: "R$ 890,25",
    status: "cancelada"
  },
  {
    id: "NF-005",
    customer: "Restaurante Sabor Gourmet",
    date: "25/05/2023",
    total: "R$ 2.350,00",
    status: "emitida"
  }
];

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredInvoices = mockInvoices.filter(
    (invoice) =>
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "emitida":
        return <Check className="h-4 w-4 text-green-500" />;
      case "pendente":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "cancelada":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "emitida":
        return "Emitida";
      case "pendente":
        return "Pendente";
      case "cancelada":
        return "Cancelada";
      default:
        return status;
    }
  };

  const handleEmitInvoice = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "O sistema de emissão de notas fiscais será implementado em uma atualização futura.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notas Fiscais</h1>
          <p className="text-muted-foreground">
            Gerencie as notas fiscais do seu negócio
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleEmitInvoice}>
            <Plus className="mr-2 h-4 w-4" />
            Emitir Nota Fiscal
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="issued">Emitidas</TabsTrigger>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
          <TabsTrigger value="canceled">Canceladas</TabsTrigger>
        </TabsList>

        <div className="mb-4 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por número ou cliente..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="all" className="m-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Todas as Notas Fiscais</CardTitle>
              <CardDescription>
                Lista de todas as notas fiscais geradas no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table className="border">
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.length > 0 ? (
                    filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.customer}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.total}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(invoice.status)}
                            <span 
                              className={
                                invoice.status === "emitida" 
                                  ? "text-green-600" 
                                  : invoice.status === "pendente" 
                                  ? "text-amber-600" 
                                  : "text-red-600"
                              }
                            >
                              {getStatusText(invoice.status)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="flex justify-end gap-2">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Visualizar</span>
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Printer className="h-4 w-4" />
                            <span className="sr-only">Imprimir</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">
                        <div className="flex flex-col items-center justify-center text-center">
                          <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                          <h3 className="font-medium">Nenhuma nota fiscal encontrada</h3>
                          <p className="text-sm text-muted-foreground">
                            {searchTerm ? "Tente ajustar sua busca." : "Você ainda não emitiu nenhuma nota fiscal."}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issued" className="m-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Notas Fiscais Emitidas</CardTitle>
              <CardDescription>
                Lista de notas fiscais emitidas com sucesso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table className="border">
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.filter(i => i.status === "emitida").length > 0 ? (
                    filteredInvoices
                      .filter(i => i.status === "emitida")
                      .map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.id}</TableCell>
                          <TableCell>{invoice.customer}</TableCell>
                          <TableCell>{invoice.date}</TableCell>
                          <TableCell>{invoice.total}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="text-green-600">Emitida</span>
                            </div>
                          </TableCell>
                          <TableCell className="flex justify-end gap-2">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">Visualizar</span>
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Printer className="h-4 w-4" />
                              <span className="sr-only">Imprimir</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">
                        <div className="flex flex-col items-center justify-center text-center">
                          <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                          <h3 className="font-medium">Nenhuma nota fiscal emitida encontrada</h3>
                          <p className="text-sm text-muted-foreground">
                            {searchTerm ? "Tente ajustar sua busca." : "Você ainda não emitiu nenhuma nota fiscal."}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="m-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Notas Fiscais Pendentes</CardTitle>
              <CardDescription>
                Lista de notas fiscais em processo de emissão
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table className="border">
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.filter(i => i.status === "pendente").length > 0 ? (
                    filteredInvoices
                      .filter(i => i.status === "pendente")
                      .map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.id}</TableCell>
                          <TableCell>{invoice.customer}</TableCell>
                          <TableCell>{invoice.date}</TableCell>
                          <TableCell>{invoice.total}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-amber-500" />
                              <span className="text-amber-600">Pendente</span>
                            </div>
                          </TableCell>
                          <TableCell className="flex justify-end gap-2">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">Visualizar</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">
                        <div className="flex flex-col items-center justify-center text-center">
                          <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                          <h3 className="font-medium">Nenhuma nota fiscal pendente encontrada</h3>
                          <p className="text-sm text-muted-foreground">
                            {searchTerm ? "Tente ajustar sua busca." : "Não há notas fiscais pendentes no momento."}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="canceled" className="m-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Notas Fiscais Canceladas</CardTitle>
              <CardDescription>
                Lista de notas fiscais canceladas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table className="border">
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.filter(i => i.status === "cancelada").length > 0 ? (
                    filteredInvoices
                      .filter(i => i.status === "cancelada")
                      .map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.id}</TableCell>
                          <TableCell>{invoice.customer}</TableCell>
                          <TableCell>{invoice.date}</TableCell>
                          <TableCell>{invoice.total}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <AlertCircle className="h-4 w-4 text-red-500" />
                              <span className="text-red-600">Cancelada</span>
                            </div>
                          </TableCell>
                          <TableCell className="flex justify-end gap-2">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">Visualizar</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">
                        <div className="flex flex-col items-center justify-center text-center">
                          <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                          <h3 className="font-medium">Nenhuma nota fiscal cancelada encontrada</h3>
                          <p className="text-sm text-muted-foreground">
                            {searchTerm ? "Tente ajustar sua busca." : "Não há notas fiscais canceladas no momento."}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-10 w-10 text-amber-500 mt-1" />
            <div>
              <h3 className="text-lg font-medium text-amber-800 mb-1">Sistema de emissão de notas fiscais</h3>
              <p className="text-amber-700">
                O módulo completo de emissão de notas fiscais está em desenvolvimento. Em breve você poderá:
              </p>
              <ul className="mt-2 space-y-1 text-amber-700">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Emitir notas fiscais diretamente pelo sistema
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Integração com a SEFAZ
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Geração automática a partir de pedidos
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Envio automático para clientes
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Relatórios fiscais completos
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Invoices;

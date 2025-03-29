
import React, { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Search, 
  Plus, 
  ShoppingCart, 
  User, 
  Trash2, 
  Tag,
  PackageCheck,
  CreditCard, 
  Banknote, 
  Smartphone,
  Receipt,
  Minus,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockProducts = [
  { id: 1, code: "P001", name: "Notebook Acer Aspire 5", price: 3299.90, stock: 15 },
  { id: 2, code: "P002", name: "Monitor Dell 24\"", price: 999.90, stock: 23 },
  { id: 3, code: "P003", name: "Mouse Logitech MX Master", price: 349.90, stock: 42 },
  { id: 4, code: "P004", name: "Teclado Mecânico Redragon", price: 259.90, stock: 18 },
  { id: 5, code: "P005", name: "Headset HyperX Cloud", price: 399.90, stock: 27 },
  { id: 6, code: "P006", name: "SSD Kingston 480GB", price: 329.90, stock: 56 },
  { id: 7, code: "P007", name: "Cadeira Gamer ThunderX3", price: 1299.90, stock: 8 },
  { id: 8, code: "P008", name: "Mousepad Gamer XL", price: 89.90, stock: 31 },
  { id: 9, code: "P009", name: "Webcam Logitech C920", price: 499.90, stock: 12 },
  { id: 10, code: "P010", name: "Caixa de Som JBL", price: 199.90, stock: 24 },
];

// Mock customers data
const mockCustomers = [
  { id: 1, code: "C001", name: "João da Silva", email: "joao@email.com", phone: "(11) 98765-4321" },
  { id: 2, code: "C002", name: "Maria Oliveira", email: "maria@email.com", phone: "(11) 91234-5678" },
  { id: 3, code: "C003", name: "Pedro Santos", email: "pedro@email.com", phone: "(11) 92345-6789" },
];

interface CartItem {
  id: number;
  code: string;
  name: string;
  price: number;
  quantity: number;
}

const paymentMethods = [
  { id: "credit", name: "Cartão de Crédito", icon: <CreditCard className="h-5 w-5" /> },
  { id: "debit", name: "Cartão de Débito", icon: <CreditCard className="h-5 w-5" /> },
  { id: "cash", name: "Dinheiro", icon: <Banknote className="h-5 w-5" /> },
  { id: "pix", name: "PIX", icon: <Smartphone className="h-5 w-5" /> },
];

const POS = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<typeof mockCustomers[0] | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [productCode, setProductCode] = useState("");
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "payment" | "complete">("cart");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const productCodeInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const filteredProducts = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(productSearchTerm.toLowerCase())
  );

  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
      customer.code.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(customerSearchTerm.toLowerCase())
  );

  const addProductToCart = (product: typeof mockProducts[0]) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Product already in cart, increment quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        // Add new product to cart
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    
    toast({
      title: "Produto adicionado",
      description: `${product.name} foi adicionado ao carrinho.`,
    });
  };

  const handleProductCodeSearch = () => {
    if (!productCode) return;
    
    const product = mockProducts.find(p => p.code === productCode);
    
    if (product) {
      addProductToCart(product);
      setProductCode("");
      productCodeInputRef.current?.focus();
    } else {
      toast({
        title: "Produto não encontrado",
        description: `Nenhum produto com o código ${productCode} foi encontrado.`,
        variant: "destructive"
      });
    }
  };

  const selectCustomer = (customer: typeof mockCustomers[0]) => {
    setSelectedCustomer(customer);
    setCustomerSearchTerm("");
    toast({
      title: "Cliente selecionado",
      description: `${customer.name} foi selecionado para esta venda.`,
    });
  };

  const removeCustomer = () => {
    setSelectedCustomer(null);
    toast({
      title: "Cliente removido",
      description: "Cliente foi removido desta venda.",
    });
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    toast({
      title: "Item removido",
      description: "O item foi removido do carrinho.",
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const startCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione produtos ao carrinho antes de finalizar a venda.",
        variant: "destructive"
      });
      return;
    }
    
    setCheckoutStep("payment");
  };

  const cancelCheckout = () => {
    setCheckoutStep("cart");
    setSelectedPaymentMethod(null);
  };

  const processPayment = () => {
    if (!selectedPaymentMethod) {
      toast({
        title: "Selecione um método de pagamento",
        description: "Por favor, selecione um método de pagamento para continuar.",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessingPayment(false);
      setCheckoutStep("complete");
      toast({
        title: "Pagamento realizado com sucesso!",
        description: "A venda foi finalizada e o pagamento foi processado.",
      });
    }, 1500);
  };

  const startNewSale = () => {
    setCartItems([]);
    setSelectedCustomer(null);
    setCheckoutStep("cart");
    setSelectedPaymentMethod(null);
    setProductCode("");
    productCodeInputRef.current?.focus();
  };

  const renderCartStep = () => (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column - Product search and list */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Produtos</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Product code input */}
              <div className="mb-4 flex items-center gap-2">
                <div className="relative flex-1">
                  <PackageCheck className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Código do produto..."
                    className="pl-8"
                    value={productCode}
                    onChange={(e) => setProductCode(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleProductCodeSearch()}
                    ref={productCodeInputRef}
                    autoFocus
                  />
                </div>
                <Button onClick={handleProductCodeSearch}>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar
                </Button>
              </div>
              
              {/* Product search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar produtos..."
                    className="pl-8"
                    value={productSearchTerm}
                    onChange={(e) => setProductSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Product list */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Produto</TableHead>
                      <TableHead>Preço</TableHead>
                      <TableHead>Estoque</TableHead>
                      <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.code}</TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => addProductToCart(product)}
                            >
                              <Plus className="h-4 w-4" />
                              <span className="sr-only">Adicionar</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          Nenhum produto encontrado.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Customer and cart */}
        <div>
          {/* Customer selection */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedCustomer ? (
                <div className="rounded-md border p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{selectedCustomer.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedCustomer.email}</p>
                      <p className="text-sm text-muted-foreground">{selectedCustomer.phone}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={removeCustomer}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-3 relative">
                    <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Buscar cliente..."
                      className="pl-8"
                      value={customerSearchTerm}
                      onChange={(e) => setCustomerSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  {customerSearchTerm && (
                    <div className="rounded-md border max-h-[200px] overflow-y-auto">
                      {filteredCustomers.length > 0 ? (
                        filteredCustomers.map((customer) => (
                          <div
                            key={customer.id}
                            className="flex items-center justify-between p-2 border-b last:border-b-0 hover:bg-muted/50 cursor-pointer"
                            onClick={() => selectCustomer(customer)}
                          >
                            <div>
                              <p className="font-medium">{customer.name}</p>
                              <p className="text-sm text-muted-foreground">{customer.email}</p>
                            </div>
                            <Plus className="h-4 w-4 text-muted-foreground" />
                          </div>
                        ))
                      ) : (
                        <div className="p-2 text-center text-sm text-muted-foreground">
                          Nenhum cliente encontrado.
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-muted-foreground">ou</span>
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Novo Cliente
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          
          {/* Cart */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Carrinho</CardTitle>
                <span className="text-sm text-muted-foreground">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              {cartItems.length > 0 ? (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between rounded-md border p-3"
                    >
                      <div className="flex-1 pr-3">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          R$ {item.price.toFixed(2)} un. | Total: R$ {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7 rounded-r-none"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <div className="flex h-7 w-10 items-center justify-center bg-background border-y border-input">
                          {item.quantity}
                        </div>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7 rounded-l-none"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 ml-1"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <ShoppingCart className="h-10 w-10 text-muted-foreground mb-2" />
                  <h3 className="font-medium">Carrinho vazio</h3>
                  <p className="text-sm text-muted-foreground">
                    Adicione produtos ao carrinho para iniciar uma venda.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">R$ {calculateTotal().toFixed(2)}</p>
              </div>
              <Button 
                disabled={cartItems.length === 0} 
                onClick={startCheckout}
              >
                <Tag className="mr-2 h-4 w-4" />
                Finalizar Venda
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );

  const renderPaymentStep = () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Resumo da venda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedCustomer && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Cliente</h3>
                  <div className="rounded-md border p-3">
                    <p className="font-medium">{selectedCustomer.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedCustomer.email}</p>
                    <p className="text-sm text-muted-foreground">{selectedCustomer.phone}</p>
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Itens</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead className="text-right">Qtd</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">R$ {(item.price * item.quantity).toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div className="pt-2">
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>R$ {calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Desconto</span>
                  <span>R$ 0,00</span>
                </div>
                <div className="flex justify-between py-1 font-medium text-lg">
                  <span>Total</span>
                  <span>R$ {calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Forma de Pagamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {paymentMethods.map((method) => (
                <Button
                  key={method.id}
                  variant={selectedPaymentMethod === method.id ? "default" : "outline"}
                  className={`h-auto justify-start p-4 ${selectedPaymentMethod === method.id ? "" : "bg-background"}`}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                >
                  <div className="flex items-center">
                    <div className="mr-3">{method.icon}</div>
                    <div>{method.name}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4 gap-3">
            <Button variant="outline" onClick={cancelCheckout}>Voltar</Button>
            <Button onClick={processPayment} disabled={!selectedPaymentMethod || isProcessingPayment}>
              {isProcessingPayment ? (
                <>
                  <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Processando...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Finalizar Pagamento
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );

  const renderCompleteStep = () => (
    <div className="flex justify-center">
      <Card className="max-w-md w-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold mb-2">Venda Finalizada</h2>
            <p className="mb-6 text-muted-foreground">
              O pagamento foi processado com sucesso.
            </p>
            
            <div className="w-full rounded-md border p-4 mb-6">
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Número da venda</span>
                <span className="font-medium">#{Math.floor(Math.random() * 100000)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Data</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Forma de pagamento</span>
                <span className="font-medium">
                  {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Itens</span>
                <span className="font-medium">{cartItems.length}</span>
              </div>
              <div className="flex justify-between py-1 text-lg">
                <span className="font-medium">Total</span>
                <span className="font-bold">R$ {calculateTotal().toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex gap-3 w-full">
              <Button variant="outline" className="flex-1">
                <Receipt className="mr-2 h-4 w-4" />
                Imprimir Recibo
              </Button>
              <Button className="flex-1" onClick={startNewSale}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Nova Venda
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {checkoutStep === "cart" 
              ? "Atendimento" 
              : checkoutStep === "payment" 
              ? "Finalizar Venda" 
              : "Venda Concluída"}
          </h1>
          <p className="text-muted-foreground">
            {checkoutStep === "cart" 
              ? "Registre uma nova venda" 
              : checkoutStep === "payment" 
              ? "Selecione o método de pagamento" 
              : "A venda foi processada com sucesso"}
          </p>
        </div>
      </div>

      {checkoutStep === "cart" && renderCartStep()}
      {checkoutStep === "payment" && renderPaymentStep()}
      {checkoutStep === "complete" && renderCompleteStep()}
    </div>
  );
};

export default POS;

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calculator, ArrowRightLeft, Hash, Plus, Minus, X, Divide } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type NumberBase = "binary" | "octal" | "decimal" | "hexadecimal";

const baseInfo: Record<NumberBase, { radix: number; name: string; digits: string }> = {
  binary: { radix: 2, name: "Binary", digits: "0, 1" },
  octal: { radix: 8, name: "Octal", digits: "0-7" },
  decimal: { radix: 10, name: "Decimal", digits: "0-9" },
  hexadecimal: { radix: 16, name: "Hexadecimal", digits: "0-9, A-F" },
};

function convertNumber(value: string, fromBase: NumberBase, toBase: NumberBase): string {
  if (!value.trim()) return "";
  try {
    const radixFrom = baseInfo[fromBase].radix;
    const radixTo = baseInfo[toBase].radix;
    const decimal = parseInt(value.toUpperCase(), radixFrom);
    if (isNaN(decimal)) return "Invalid";
    return decimal.toString(radixTo).toUpperCase();
  } catch {
    return "Invalid";
  }
}

function performArithmetic(a: string, b: string, base: NumberBase, operation: string): string {
  if (!a.trim() || !b.trim()) return "";
  try {
    const radix = baseInfo[base].radix;
    const numA = parseInt(a.toUpperCase(), radix);
    const numB = parseInt(b.toUpperCase(), radix);
    if (isNaN(numA) || isNaN(numB)) return "Invalid";
    
    let result: number;
    switch (operation) {
      case "add": result = numA + numB; break;
      case "subtract": result = numA - numB; break;
      case "multiply": result = numA * numB; break;
      case "divide": result = Math.floor(numA / numB); break;
      default: return "Invalid";
    }
    return result.toString(radix).toUpperCase();
  } catch {
    return "Invalid";
  }
}

export function NumberSystemsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Converter state
  const [inputValue, setInputValue] = useState("");
  const [fromBase, setFromBase] = useState<NumberBase>("decimal");
  const [toBase, setToBase] = useState<NumberBase>("binary");

  // Arithmetic state
  const [operandA, setOperandA] = useState("");
  const [operandB, setOperandB] = useState("");
  const [arithmeticBase, setArithmeticBase] = useState<NumberBase>("binary");
  const [operation, setOperation] = useState("add");

  const conversionResult = convertNumber(inputValue, fromBase, toBase);
  const arithmeticResult = performArithmetic(operandA, operandB, arithmeticBase, operation);

  // Show all conversions
  const allConversions = Object.keys(baseInfo).map((base) => ({
    base: base as NumberBase,
    value: convertNumber(inputValue, fromBase, base as NumberBase),
  }));

  return (
    <section id="number-systems" className="section-padding" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Section B</span>
          <h2 className="heading-2 mt-2 mb-4">Number Systems</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Understanding different radix number systems and their conversions
          </p>
        </motion.div>

        {/* Description Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {Object.entries(baseInfo).map(([key, info], index) => (
            <div
              key={key}
              className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all card-3d"
            >
              <div className="flex items-center gap-2 mb-3">
                <Hash className="w-5 h-5 text-primary" />
                <span className="font-semibold">{info.name}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Radix:</strong> {info.radix}
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Digits:</strong> {info.digits}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Interactive Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tabs defaultValue="converter" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="converter" className="gap-2">
                <ArrowRightLeft className="w-4 h-4" /> Converter
              </TabsTrigger>
              <TabsTrigger value="calculator" className="gap-2">
                <Calculator className="w-4 h-4" /> Calculator
              </TabsTrigger>
            </TabsList>

            {/* Converter Tab */}
            <TabsContent value="converter">
              <div className="bg-card rounded-2xl p-8 shadow-card max-w-3xl mx-auto">
                <h3 className="heading-3 mb-6 text-center">Number System Converter</h3>
                
                <div className="grid md:grid-cols-3 gap-4 items-end mb-8">
                  <div>
                    <label className="block text-sm font-medium mb-2">Input Value</label>
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Enter number..."
                      className="font-mono text-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">From Base</label>
                    <Select value={fromBase} onValueChange={(v) => setFromBase(v as NumberBase)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="binary">Binary (2)</SelectItem>
                        <SelectItem value="octal">Octal (8)</SelectItem>
                        <SelectItem value="decimal">Decimal (10)</SelectItem>
                        <SelectItem value="hexadecimal">Hexadecimal (16)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">To Base</label>
                    <Select value={toBase} onValueChange={(v) => setToBase(v as NumberBase)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="binary">Binary (2)</SelectItem>
                        <SelectItem value="octal">Octal (8)</SelectItem>
                        <SelectItem value="decimal">Decimal (10)</SelectItem>
                        <SelectItem value="hexadecimal">Hexadecimal (16)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* All Conversions Display */}
                {inputValue && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {allConversions.map((conv) => (
                      <div
                        key={conv.base}
                        className={`p-4 rounded-xl transition-all ${
                          conv.base === toBase
                            ? "bg-primary text-primary-foreground shadow-glow"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-xs font-medium opacity-80 mb-1">{baseInfo[conv.base].name}</p>
                        <p className="font-mono text-lg font-bold truncate">{conv.value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Calculator Tab */}
            <TabsContent value="calculator">
              <div className="bg-card rounded-2xl p-8 shadow-card max-w-3xl mx-auto">
                <h3 className="heading-3 mb-6 text-center">Arithmetic Operations Calculator</h3>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Number System</label>
                    <Select value={arithmeticBase} onValueChange={(v) => setArithmeticBase(v as NumberBase)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="binary">Binary</SelectItem>
                        <SelectItem value="octal">Octal</SelectItem>
                        <SelectItem value="decimal">Decimal</SelectItem>
                        <SelectItem value="hexadecimal">Hexadecimal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Operation</label>
                    <div className="flex gap-2">
                      {[
                        { key: "add", icon: Plus, label: "Add" },
                        { key: "subtract", icon: Minus, label: "Subtract" },
                        { key: "multiply", icon: X, label: "Multiply" },
                        { key: "divide", icon: Divide, label: "Divide" },
                      ].map((op) => (
                        <Button
                          key={op.key}
                          variant={operation === op.key ? "default" : "outline"}
                          size="icon"
                          onClick={() => setOperation(op.key)}
                          title={op.label}
                        >
                          <op.icon className="w-4 h-4" />
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
                  <Input
                    value={operandA}
                    onChange={(e) => setOperandA(e.target.value)}
                    placeholder="First number"
                    className="font-mono text-lg text-center"
                  />
                  <span className="text-2xl font-bold text-muted-foreground">
                    {operation === "add" && "+"}
                    {operation === "subtract" && "−"}
                    {operation === "multiply" && "×"}
                    {operation === "divide" && "÷"}
                  </span>
                  <Input
                    value={operandB}
                    onChange={(e) => setOperandB(e.target.value)}
                    placeholder="Second number"
                    className="font-mono text-lg text-center"
                  />
                  <span className="text-2xl font-bold text-muted-foreground">=</span>
                  <div className="min-w-[120px] p-3 rounded-xl bg-primary text-primary-foreground font-mono text-lg font-bold text-center">
                    {arithmeticResult || "?"}
                  </div>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  All inputs and output are in <strong>{baseInfo[arithmeticBase].name}</strong> format
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}

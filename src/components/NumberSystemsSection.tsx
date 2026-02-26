import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Calculator,
  ArrowRightLeft,
  Hash,
  Plus,
  Minus,
  X,
  Divide,
  ChevronDown,
  ChevronRight,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

/* ═══════════════════════════════════════════
   Types & Data
   ═══════════════════════════════════════════ */

type NumberBase = "binary" | "octal" | "decimal" | "hexadecimal";

interface SymbolInfo {
  symbol: string;
  decimalValue: number;
  label: string;
}

interface NumberSystemInfo {
  name: string;
  base: number;
  symbols: SymbolInfo[];
  meaning: string;
  examples: string[];
  whyUsed: string;
  color: string;
  gradient: string;
}

const numberSystems: Record<NumberBase, NumberSystemInfo> = {
  binary: {
    name: "Binary Number System",
    base: 2,
    symbols: [
      { symbol: "0", decimalValue: 0, label: "0 in Decimal" },
      { symbol: "1", decimalValue: 1, label: "1 in Decimal" },
    ],
    meaning:
      "The fundamental language of computers. Every piece of data is represented as a combination of 0s (OFF) and 1s (ON), corresponding to electrical signals in circuits.",
    examples: ["1010₂", "11111₂", "101₂", "11001100₂", "10000001₂"],
    whyUsed:
      "Computers use binary because digital circuits have two stable states — ON (1) and OFF (0). All data, instructions, and addresses are ultimately stored and processed in binary.",
    color: "text-primary",
    gradient: "from-primary/20 to-primary/5",
  },
  octal: {
    name: "Octal Number System",
    base: 8,
    symbols: [
      { symbol: "0", decimalValue: 0, label: "0 in Decimal" },
      { symbol: "1", decimalValue: 1, label: "1 in Decimal" },
      { symbol: "2", decimalValue: 2, label: "2 in Decimal" },
      { symbol: "3", decimalValue: 3, label: "3 in Decimal" },
      { symbol: "4", decimalValue: 4, label: "4 in Decimal" },
      { symbol: "5", decimalValue: 5, label: "5 in Decimal" },
      { symbol: "6", decimalValue: 6, label: "6 in Decimal" },
      { symbol: "7", decimalValue: 7, label: "7 in Decimal" },
    ],
    meaning:
      "Base-8 system that groups binary digits in sets of three. Each octal digit represents exactly 3 binary bits, making it a compact shorthand for binary.",
    examples: ["17₈", "377₈", "52₈", "144₈", "2501₈"],
    whyUsed:
      "Used in computing as a shorthand for binary (3 bits = 1 octal digit). Common in Unix/Linux file permissions (e.g., chmod 755) and older assembly languages.",
    color: "text-green-600",
    gradient: "from-green-500/20 to-green-500/5",
  },
  decimal: {
    name: "Decimal Number System",
    base: 10,
    symbols: [
      { symbol: "0", decimalValue: 0, label: "0" },
      { symbol: "1", decimalValue: 1, label: "1" },
      { symbol: "2", decimalValue: 2, label: "2" },
      { symbol: "3", decimalValue: 3, label: "3" },
      { symbol: "4", decimalValue: 4, label: "4" },
      { symbol: "5", decimalValue: 5, label: "5" },
      { symbol: "6", decimalValue: 6, label: "6" },
      { symbol: "7", decimalValue: 7, label: "7" },
      { symbol: "8", decimalValue: 8, label: "8" },
      { symbol: "9", decimalValue: 9, label: "9" },
    ],
    meaning:
      "The standard number system humans use every day. It has 10 unique digits (0-9), likely originating from counting on 10 fingers.",
    examples: ["255₁₀", "1024₁₀", "42₁₀", "99999₁₀", "7₁₀"],
    whyUsed:
      "The most natural number system for humans. All everyday counting, money, measurements, and arithmetic use decimal. It is the reference point for all other number systems.",
    color: "text-orange-600",
    gradient: "from-orange-500/20 to-orange-500/5",
  },
  hexadecimal: {
    name: "Hexadecimal Number System",
    base: 16,
    symbols: [
      { symbol: "0", decimalValue: 0, label: "0 in Decimal" },
      { symbol: "1", decimalValue: 1, label: "1 in Decimal" },
      { symbol: "2", decimalValue: 2, label: "2 in Decimal" },
      { symbol: "3", decimalValue: 3, label: "3 in Decimal" },
      { symbol: "4", decimalValue: 4, label: "4 in Decimal" },
      { symbol: "5", decimalValue: 5, label: "5 in Decimal" },
      { symbol: "6", decimalValue: 6, label: "6 in Decimal" },
      { symbol: "7", decimalValue: 7, label: "7 in Decimal" },
      { symbol: "8", decimalValue: 8, label: "8 in Decimal" },
      { symbol: "9", decimalValue: 9, label: "9 in Decimal" },
      { symbol: "A", decimalValue: 10, label: "A = 10 in Decimal" },
      { symbol: "B", decimalValue: 11, label: "B = 11 in Decimal" },
      { symbol: "C", decimalValue: 12, label: "C = 12 in Decimal" },
      { symbol: "D", decimalValue: 13, label: "D = 13 in Decimal" },
      { symbol: "E", decimalValue: 14, label: "E = 14 in Decimal" },
      { symbol: "F", decimalValue: 15, label: "F = 15 in Decimal" },
    ],
    meaning:
      "Base-16 system using 0-9 and A-F. Each hex digit represents exactly 4 binary bits (a nibble), making it the most compact way to represent binary data.",
    examples: ["FF₁₆", "1A3₁₆", "BEEF₁₆", "7D₁₆", "C0FFEE₁₆"],
    whyUsed:
      "Widely used in computing for memory addresses, color codes (#FF5733), MAC addresses, and error codes. 1 hex digit = 4 bits, so a byte = 2 hex digits — very compact.",
    color: "text-purple-600",
    gradient: "from-purple-500/20 to-purple-500/5",
  },
};

/* ═══════════════════════════════════════════
   Step-by-step conversion algorithms
   ═══════════════════════════════════════════ */

interface ConversionStep {
  description: string;
  highlight?: string;
}

const HEX_MAP: Record<string, number> = { A: 10, B: 11, C: 12, D: 13, E: 14, F: 15 };
const HEX_REV: Record<number, string> = { 10: "A", 11: "B", 12: "C", 13: "D", 14: "E", 15: "F" };

function digitValue(ch: string): number {
  const u = ch.toUpperCase();
  if (HEX_MAP[u] !== undefined) return HEX_MAP[u];
  return parseInt(u, 10);
}

function digitChar(n: number): string {
  return n >= 10 ? HEX_REV[n] : String(n);
}

// Decimal → any base via repeated division (integer) and repeated multiplication (fractional)
function decimalToBaseSteps(decimal: number, base: number, baseName: string): { steps: ConversionStep[]; result: string } {
  if (decimal === 0) return { steps: [{ description: "0 in decimal is 0 in any base." }], result: "0" };

  const steps: ConversionStep[] = [];
  const integerPart = Math.floor(decimal);
  const fractionalPart = decimal - integerPart;

  // 1. Integer Part
  let n = integerPart;
  const intRemainders: string[] = [];
  if (n === 0) {
    intRemainders.push("0");
  } else {
    steps.push({ description: `--- Integer Part (${integerPart}) ---` });
    while (n > 0) {
      const quotient = Math.floor(n / base);
      const remainder = n % base;
      const remChar = digitChar(remainder);
      steps.push({
        description: `${n} ÷ ${base} = ${quotient}  remainder ${remChar}${remainder >= 10 ? ` (${remainder})` : ""}`,
      });
      intRemainders.push(remChar);
      n = quotient;
    }
  }
  const intResult = intRemainders.reverse().join("");

  // 2. Fractional Part
  let fracResult = "";
  if (fractionalPart > 0) {
    steps.push({ description: `--- Fractional Part (${fractionalPart.toFixed(10).replace(/\.?0+$/, "")}) ---` });
    let f = fractionalPart;
    let limit = 10; // Limit to 10 fractional digits to avoid infinite loops
    while (f > 0 && limit > 0) {
      const product = f * base;
      const digit = Math.floor(product);
      const digitCh = digitChar(digit);
      steps.push({
        description: `${f.toFixed(4)} × ${base} = ${product.toFixed(4)} → digit ${digitCh}`,
      });
      fracResult += digitCh;
      f = product - digit;
      limit--;
    }
  }

  const result = fracResult ? `${intResult}.${fracResult}` : intResult;
  steps.push({
    description: `Combined Result`,
    highlight: result,
  });
  return { steps, result };
}

// Any base → Decimal via positional multiplication
function baseToDecimalSteps(value: string, base: number, baseName: string): { steps: ConversionStep[]; result: string } {
  const [intStr, fracStr] = value.split(".");
  const steps: ConversionStep[] = [];
  const terms: string[] = [];
  let total = 0;

  // 1. Integer Part
  const intDigits = intStr.toUpperCase().split("");
  intDigits.forEach((d, i) => {
    const power = intDigits.length - 1 - i;
    const val = digitValue(d);
    const contribution = val * Math.pow(base, power);
    terms.push(`${d}×${base}^${power}=${contribution}`);
    total += contribution;
  });

  // 2. Fractional Part
  if (fracStr) {
    const fracDigits = fracStr.toUpperCase().split("");
    fracDigits.forEach((d, i) => {
      const power = -(i + 1);
      const val = digitValue(d);
      const contribution = val * Math.pow(base, power);
      // Format contribution to avoid too many decimals in the step description
      const formattedContrib = contribution.toFixed(6).replace(/\.?0+$/, "");
      terms.push(`${d}×${base}^(${power})=${formattedContrib}`);
      total += contribution;
    });
  }

  steps.push({ description: `Position values: ${terms.join("  +  ")}` });
  // Final total formatting to avoid precision artifacts like 0.30000000000000004
  const finalResult = String(Number(total.toFixed(10)));
  steps.push({ description: `Sum: ${finalResult}`, highlight: finalResult });
  return { steps, result: finalResult };
}

// Binary ↔ Octal grouping
function binaryToOctalSteps(binary: string): { steps: ConversionStep[]; result: string } {
  const [intPart, fracPart] = binary.split(".");
  const steps: ConversionStep[] = [];

  // 1. Integer Part
  let intPadded = intPart;
  while (intPadded.length % 3 !== 0) intPadded = "0" + intPadded;
  const intGroups: string[] = [];
  const intOctals: string[] = [];
  for (let i = 0; i < intPadded.length; i += 3) {
    const group = intPadded.substring(i, i + 3);
    intGroups.push(group);
    intOctals.push(String(parseInt(group, 2)));
  }
  const intResult = intOctals.join("") || "0";

  // 2. Fractional Part
  let fracResult = "";
  let fracGroups: string[] = [];
  let fracOctals: string[] = [];
  if (fracPart) {
    let fracPadded = fracPart;
    while (fracPadded.length % 3 !== 0) fracPadded = fracPadded + "0";
    for (let i = 0; i < fracPadded.length; i += 3) {
      const group = fracPadded.substring(i, i + 3);
      fracGroups.push(group);
      fracOctals.push(String(parseInt(group, 2)));
    }
    fracResult = fracOctals.join("");
  }

  const result = fracResult ? `${intResult}.${fracResult}` : intResult;
  steps.push({ description: `Split into integer and fractional: ${intPart}${fracPart ? ` | .${fracPart}` : ""}` });
  steps.push({ description: `Group integer Part from right in 3s: ${intGroups.join(" | ")}` });
  if (fracPart) {
    steps.push({ description: `Group fractional Part from left in 3s: ${fracGroups.join(" | ")}` });
  }
  steps.push({ description: `Convert each group: ${[...intOctals, ...fracOctals].join(", ")}` });
  steps.push({ description: `Result`, highlight: result });
  return { steps, result };
}

function octalToBinarySteps(octal: string): { steps: ConversionStep[]; result: string } {
  const [intPart, fracPart] = octal.split(".");
  const expand = (s: string) => s.split("").map((d) => parseInt(d, 10).toString(2).padStart(3, "0"));

  const intGroups = expand(intPart);
  const intBinary = intGroups.join("").replace(/^0+(?!$)/, "") || "0";

  let fracBinary = "";
  let fracGroups: string[] = [];
  if (fracPart) {
    fracGroups = expand(fracPart);
    fracBinary = fracGroups.join("");
  }

  const result = fracBinary ? `${intBinary}.${fracBinary}` : intBinary;
  const steps: ConversionStep[] = [
    { description: `Expand each octal digit to 3 binary bits:` },
    { description: `Integer: ${intPart.split("").map((d, i) => `${d}→${intGroups[i]}`).join(" | ")}` },
  ];
  if (fracPart) {
    steps.push({ description: `Fractional: ${fracPart.split("").map((d, i) => `${d}→${fracGroups[i]}`).join(" | ")}` });
  }
  steps.push({ description: `Combined`, highlight: result });
  return { steps, result };
}

// Binary ↔ Hex grouping
function binaryToHexSteps(binary: string): { steps: ConversionStep[]; result: string } {
  const [intPart, fracPart] = binary.split(".");
  const steps: ConversionStep[] = [];

  // 1. Integer Part
  let intPadded = intPart;
  while (intPadded.length % 4 !== 0) intPadded = "0" + intPadded;
  const intGroups: string[] = [];
  const intHexs: string[] = [];
  for (let i = 0; i < intPadded.length; i += 4) {
    const group = intPadded.substring(i, i + 4);
    intGroups.push(group);
    intHexs.push(digitChar(parseInt(group, 2)));
  }
  const intResult = intHexs.join("") || "0";

  // 2. Fractional Part
  let fracResult = "";
  let fracGroups: string[] = [];
  let fracHexs: string[] = [];
  if (fracPart) {
    let fracPadded = fracPart;
    while (fracPadded.length % 4 !== 0) fracPadded = fracPadded + "0";
    for (let i = 0; i < fracPadded.length; i += 4) {
      const group = fracPadded.substring(i, i + 4);
      fracGroups.push(group);
      fracHexs.push(digitChar(parseInt(group, 2)));
    }
    fracResult = fracHexs.join("");
  }

  const result = fracResult ? `${intResult}.${fracResult}` : intResult;
  steps.push({ description: `Split into integer and fractional: ${intPart}${fracPart ? ` | .${fracPart}` : ""}` });
  steps.push({ description: `Group integer Part from right in 4s: ${intGroups.join(" | ")}` });
  if (fracPart) {
    steps.push({ description: `Group fractional Part from left in 4s: ${fracGroups.join(" | ")}` });
  }
  steps.push({ description: `Convert each group: ${[...intHexs, ...fracHexs].join(", ")}` });
  steps.push({ description: `Result`, highlight: result });
  return { steps, result };
}

function hexToBinarySteps(hex: string): { steps: ConversionStep[]; result: string } {
  const [intPart, fracPart] = hex.split(".");
  const expand = (s: string) => s.toUpperCase().split("").map((d) => digitValue(d).toString(2).padStart(4, "0"));

  const intGroups = expand(intPart);
  const intBinary = intGroups.join("").replace(/^0+(?!$)/, "") || "0";

  let fracBinary = "";
  let fracGroups: string[] = [];
  if (fracPart) {
    fracGroups = expand(fracPart);
    fracBinary = fracGroups.join("");
  }

  const result = fracBinary ? `${intBinary}.${fracBinary}` : intBinary;
  const steps: ConversionStep[] = [
    { description: `Expand each hex digit to 4 binary bits:` },
    { description: `Integer: ${intPart.split("").map((d, i) => `${d}→${intGroups[i]}`).join(" | ")}` },
  ];
  if (fracPart) {
    steps.push({ description: `Fractional: ${fracPart.split("").map((d, i) => `${d}→${fracGroups[i]}`).join(" | ")}` });
  }
  steps.push({ description: `Combined`, highlight: result });
  return { steps, result };
}

// Octal ↔ Hex via binary intermediate
function octalToHexSteps(octal: string): { steps: ConversionStep[]; result: string } {
  const bResult = octalToBinarySteps(octal);
  const hResult = binaryToHexSteps(bResult.result);
  const steps: ConversionStep[] = [
    { description: `Step 1: Octal → Binary` },
    ...bResult.steps,
    { description: `Step 2: Binary → Hexadecimal` },
    ...hResult.steps,
  ];
  return { steps, result: hResult.result };
}

function hexToOctalSteps(hex: string): { steps: ConversionStep[]; result: string } {
  const bResult = hexToBinarySteps(hex);
  const oResult = binaryToOctalSteps(bResult.result);
  const steps: ConversionStep[] = [
    { description: `Step 1: Hexadecimal → Binary` },
    ...bResult.steps,
    { description: `Step 2: Binary → Octal` },
    ...oResult.steps,
  ];
  return { steps, result: oResult.result };
}

/* ───── Master dispatcher ───── */

interface ConversionPair {
  from: NumberBase;
  to: NumberBase;
  label: string;
  convert: (input: string) => { steps: ConversionStep[]; result: string } | null;
  placeholder: string;
}

function makePairs(): ConversionPair[] {
  return [
    {
      from: "decimal", to: "binary", label: "Decimal → Binary",
      placeholder: "e.g. 25.5",
      convert: (v) => { const n = Number(v); return isNaN(n) || n < 0 ? null : decimalToBaseSteps(n, 2, "Binary"); },
    },
    {
      from: "decimal", to: "octal", label: "Decimal → Octal",
      placeholder: "e.g. 100.25",
      convert: (v) => { const n = Number(v); return isNaN(n) || n < 0 ? null : decimalToBaseSteps(n, 8, "Octal"); },
    },
    {
      from: "decimal", to: "hexadecimal", label: "Decimal → Hexadecimal",
      placeholder: "e.g. 255.75",
      convert: (v) => { const n = Number(v); return isNaN(n) || n < 0 ? null : decimalToBaseSteps(n, 16, "Hex"); },
    },
    {
      from: "binary", to: "decimal", label: "Binary → Decimal",
      placeholder: "e.g. 11001.101",
      convert: (v) => /^[01.]+$/.test(v) ? baseToDecimalSteps(v, 2, "Binary") : null,
    },
    {
      from: "binary", to: "octal", label: "Binary → Octal",
      placeholder: "e.g. 11001.101",
      convert: (v) => /^[01.]+$/.test(v) ? binaryToOctalSteps(v) : null,
    },
    {
      from: "binary", to: "hexadecimal", label: "Binary → Hexadecimal",
      placeholder: "e.g. 11111111.101",
      convert: (v) => /^[01.]+$/.test(v) ? binaryToHexSteps(v) : null,
    },
    {
      from: "octal", to: "decimal", label: "Octal → Decimal",
      placeholder: "e.g. 31.4",
      convert: (v) => /^[0-7.]+$/.test(v) ? baseToDecimalSteps(v, 8, "Octal") : null,
    },
    {
      from: "octal", to: "binary", label: "Octal → Binary",
      placeholder: "e.g. 17.2",
      convert: (v) => /^[0-7.]+$/.test(v) ? octalToBinarySteps(v) : null,
    },
    {
      from: "octal", to: "hexadecimal", label: "Octal → Hexadecimal",
      placeholder: "e.g. 377.5",
      convert: (v) => /^[0-7.]+$/.test(v) ? octalToHexSteps(v) : null,
    },
    {
      from: "hexadecimal", to: "decimal", label: "Hexadecimal → Decimal",
      placeholder: "e.g. FF.A",
      convert: (v) => /^[0-9A-Fa-f.]+$/.test(v) ? baseToDecimalSteps(v, 16, "Hex") : null,
    },
    {
      from: "hexadecimal", to: "binary", label: "Hexadecimal → Binary",
      placeholder: "e.g. 1A3.C",
      convert: (v) => /^[0-9A-Fa-f.]+$/.test(v) ? hexToBinarySteps(v) : null,
    },
    {
      from: "hexadecimal", to: "octal", label: "Hexadecimal → Octal",
      placeholder: "e.g. FF.8",
      convert: (v) => /^[0-9A-Fa-f.]+$/.test(v) ? hexToOctalSteps(v) : null,
    },
  ];
}

/* ═══════════════════════════════════════════
   Sub-components
   ═══════════════════════════════════════════ */

function SymbolBadge({ info }: { info: SymbolInfo }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-muted font-mono font-bold text-sm cursor-default hover:bg-primary hover:text-primary-foreground transition-colors">
          {info.symbol}
        </span>
      </TooltipTrigger>
      <TooltipContent side="top" className="font-mono text-sm">
        {info.label}
      </TooltipContent>
    </Tooltip>
  );
}

function ConversionVisualizer({ pair }: { pair: ConversionPair }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [result, setResult] = useState<{ steps: ConversionStep[]; result: string } | null>(null);
  const [error, setError] = useState("");

  const handleConvert = () => {
    const val = inputVal.trim();
    if (!val) { setError("Please enter a number"); setResult(null); return; }
    if (val.endsWith(".")) { setError("Invalid format: Cannot end with a decimal point."); setResult(null); return; }
    if (val.split(".").length > 2) { setError("Invalid format: Cannot contain multiple decimal points."); setResult(null); return; }

    const r = pair.convert(val);
    if (!r) { setError(`Invalid ${numberSystems[pair.from].name.split(" ")[0]} number`); setResult(null); return; }
    setError("");
    setResult(r);
  };

  const handleReset = () => { setInputVal(""); setResult(null); setError(""); };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <button className="w-full flex items-center justify-between p-4 rounded-xl bg-card shadow-card hover:shadow-card-hover transition-all text-left group">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <ArrowRightLeft className="w-4 h-4 text-primary" />
            </div>
            <span className="font-semibold">{pair.label}</span>
          </div>
          {isOpen ? (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          )}
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 p-6 rounded-xl bg-card shadow-sm border border-border"
        >
          {/* Input Row */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <Input
              value={inputVal}
              onChange={(e) => { setInputVal(e.target.value); setResult(null); setError(""); }}
              placeholder={pair.placeholder}
              className="font-mono text-lg flex-1"
              onKeyDown={(e) => e.key === "Enter" && handleConvert()}
            />
            <div className="flex gap-2">
              <Button onClick={handleConvert} className="gap-2">
                <Play className="w-4 h-4" /> Convert
              </Button>
              <Button variant="outline" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </div>

          {error && <p className="text-destructive text-sm mb-3">{error}</p>}

          {/* Steps */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                {result.steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className={`p-3 rounded-lg font-mono text-sm ${step.highlight
                      ? "bg-primary/10 border border-primary/30"
                      : "bg-muted"
                      }`}
                  >
                    <span>{step.description}</span>
                    {step.highlight && (
                      <span className="ml-2 font-bold text-primary text-base">
                        {step.highlight}
                      </span>
                    )}
                  </motion.div>
                ))}

                {/* Final Result Badge */}
                <div className="mt-4 p-4 rounded-xl bg-primary text-primary-foreground text-center">
                  <p className="text-xs font-medium opacity-80 mb-1">Final Result</p>
                  <p className="font-mono text-2xl font-bold">{result.result}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </CollapsibleContent>
    </Collapsible>
  );
}

/* ═══════════════════════════════════════════
   Quick converter & calculator (kept)
   ═══════════════════════════════════════════ */

function convertNumber(value: string, fromBase: NumberBase, toBase: NumberBase): string {
  if (!value.trim()) return "";
  try {
    const radixFrom = numberSystems[fromBase].base;
    const radixTo = numberSystems[toBase].base;
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
    const radix = numberSystems[base].base;
    const numA = parseInt(a.toUpperCase(), radix);
    const numB = parseInt(b.toUpperCase(), radix);
    if (isNaN(numA) || isNaN(numB)) return "Invalid";
    let result: number;
    switch (operation) {
      case "add": result = numA + numB; break;
      case "subtract": result = numA - numB; break;
      case "multiply": result = numA * numB; break;
      case "divide": result = numB === 0 ? NaN : Math.floor(numA / numB); break;
      default: return "Invalid";
    }
    if (isNaN(result)) return "Invalid";
    return result.toString(radix).toUpperCase();
  } catch {
    return "Invalid";
  }
}

/* ═══════════════════════════════════════════
   Main Section
   ═══════════════════════════════════════════ */

export function NumberSystemsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const conversionPairs = makePairs();

  // Converter state
  const [inputValue, setInputValue] = useState("");
  const [fromBase, setFromBase] = useState<NumberBase>("decimal");
  const [toBase, setToBase] = useState<NumberBase>("binary");

  // Arithmetic state
  const [operandA, setOperandA] = useState("");
  const [operandB, setOperandB] = useState("");
  const [arithmeticBase, setArithmeticBase] = useState<NumberBase>("binary");
  const [operation, setOperation] = useState("add");

  const arithmeticResult = performArithmetic(operandA, operandB, arithmeticBase, operation);

  const allConversions = (Object.keys(numberSystems) as NumberBase[]).map((base) => ({
    base,
    value: convertNumber(inputValue, fromBase, base),
  }));

  return (
    <TooltipProvider delayDuration={100}>
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
              Understanding different radix number systems, their symbols, and step-by-step conversions
            </p>
          </motion.div>

          {/* ───── 2.1 Rich Number System Detail Cards ───── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid md:grid-cols-2 gap-6 mb-16"
          >
            {(Object.entries(numberSystems) as [NumberBase, NumberSystemInfo][]).map(
              ([key, sys], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className={`bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all overflow-hidden`}
                >
                  {/* Gradient header */}
                  <div className={`bg-gradient-to-r ${sys.gradient} p-6`}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`font-bold text-lg ${sys.color}`}>{sys.name}</h3>
                      <span className="px-3 py-1 rounded-full bg-card text-sm font-mono font-bold">
                        Base {sys.base}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{sys.meaning}</p>
                  </div>

                  <div className="p-6 space-y-5">
                    {/* Symbols */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Symbols (hover for value)
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {sys.symbols.map((s) => (
                          <SymbolBadge key={s.symbol} info={s} />
                        ))}
                      </div>
                    </div>

                    {/* Examples */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Examples
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {sys.examples.map((ex) => (
                          <span
                            key={ex}
                            className="px-3 py-1 rounded-lg bg-muted font-mono text-sm"
                          >
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Why used */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Why It's Used
                      </p>
                      <p className="text-sm text-muted-foreground">{sys.whyUsed}</p>
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </motion.div>

          {/* ───── 2.2 Step-by-Step Conversion Visualizers ───── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <h3 className="heading-3 mb-2 text-center">Step-by-Step Conversion Visualizer</h3>
            <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
              Expand any conversion below, enter a number, and see every step of the algorithm
            </p>

            <div className="space-y-3 max-w-3xl mx-auto">
              {conversionPairs.map((pair) => (
                <ConversionVisualizer key={pair.label} pair={pair} />
              ))}
            </div>
          </motion.div>

          {/* ───── 2.3 Quick Converter & Calculator ───── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Tabs defaultValue="converter" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="converter" className="gap-2">
                  <ArrowRightLeft className="w-4 h-4" /> Quick Converter
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
                        <SelectTrigger><SelectValue /></SelectTrigger>
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
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="binary">Binary (2)</SelectItem>
                          <SelectItem value="octal">Octal (8)</SelectItem>
                          <SelectItem value="decimal">Decimal (10)</SelectItem>
                          <SelectItem value="hexadecimal">Hexadecimal (16)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {inputValue && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {allConversions.map((conv) => (
                        <div
                          key={conv.base}
                          className={`p-4 rounded-xl transition-all ${conv.base === toBase
                            ? "bg-primary text-primary-foreground shadow-glow"
                            : "bg-muted"
                            }`}
                        >
                          <p className="text-xs font-medium opacity-80 mb-1">
                            {numberSystems[conv.base].name.split(" ")[0]}
                          </p>
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
                        <SelectTrigger><SelectValue /></SelectTrigger>
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
                    <Input value={operandA} onChange={(e) => setOperandA(e.target.value)} placeholder="First number" className="font-mono text-lg text-center" />
                    <span className="text-2xl font-bold text-muted-foreground">
                      {operation === "add" && "+"}
                      {operation === "subtract" && "−"}
                      {operation === "multiply" && "×"}
                      {operation === "divide" && "÷"}
                    </span>
                    <Input value={operandB} onChange={(e) => setOperandB(e.target.value)} placeholder="Second number" className="font-mono text-lg text-center" />
                    <span className="text-2xl font-bold text-muted-foreground">=</span>
                    <div className="min-w-[120px] p-3 rounded-xl bg-primary text-primary-foreground font-mono text-lg font-bold text-center">
                      {arithmeticResult || "?"}
                    </div>
                  </div>
                  <p className="text-center text-sm text-muted-foreground">
                    All inputs and output are in <strong>{numberSystems[arithmeticBase].name.split(" ")[0]}</strong> format
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>
    </TooltipProvider>
  );
}

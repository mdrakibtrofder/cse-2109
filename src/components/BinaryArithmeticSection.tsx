import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
    Plus,
    Minus,
    X,
    Divide,
    ChevronRight,
    ChevronDown,
    Info,
    Play,
    RotateCcw,
    BookOpen,
    Calculator,
    ArrowRight,
    AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Badge } from "@/components/ui/badge";

/* ═══════════════════════════════════════════
   Types & Utilities
   ═══════════════════════════════════════════ */

type ArithmeticOp = "addition" | "subtraction" | "multiplication" | "division" | "complement2" | "complementAddition";

/* ═══════════════════════════════════════════
   Arithmetic Logic
   ═══════════════════════════════════════════ */

function padBinary(a: string, b: string): [string, string] {
    const maxLen = Math.max(a.length, b.length);
    return [a.padStart(maxLen, "0"), b.padStart(maxLen, "0")];
}

function getBinaryAdditionSteps(a: string, b: string) {
    const [pA, pB] = padBinary(a, b);
    const n = pA.length;
    const steps = [];
    let carry = 0;
    let result = "";
    const carries = new Array(n + 1).fill(0);

    for (let i = n - 1; i >= 0; i--) {
        const bitA = parseInt(pA[i]);
        const bitB = parseInt(pB[i]);
        const sum = bitA + bitB + carry;
        const currentBit = sum % 2;
        const oldCarry = carry;
        carry = Math.floor(sum / 2);
        result = currentBit + result;
        carries[i] = carry;

        steps.push({
            index: i,
            bitA,
            bitB,
            prevCarry: oldCarry,
            sum: currentBit,
            newCarry: carry,
            currentResult: result.padStart(n, " "),
        });
    }

    if (carry) {
        result = "1" + result;
    }

    return { pA, pB, steps, finalResult: result, finalCarries: carries };
}

function getBinarySubtractionSteps(a: string, b: string) {
    const [pA, pB] = padBinary(a, b);
    const n = pA.length;
    const steps = [];
    let borrow = 0;
    let result = "";
    const borrows = new Array(n + 1).fill(0);

    for (let i = n - 1; i >= 0; i--) {
        let bitA = parseInt(pA[i]);
        const bitB = parseInt(pB[i]);

        let sub = bitA - bitB - borrow;
        let currentBit;
        let newBorrow = 0;

        if (sub < 0) {
            currentBit = sub + 2;
            newBorrow = 1;
        } else {
            currentBit = sub;
            newBorrow = 0;
        }

        result = currentBit + result;
        borrows[i] = newBorrow;

        steps.push({
            index: i,
            bitA,
            bitB,
            prevBorrow: borrow,
            diff: currentBit,
            newBorrow,
            currentResult: result.padStart(n, " "),
        });

        borrow = newBorrow;
    }

    return { pA, pB, steps, finalResult: result.replace(/^0+(?!$)/, "") || "0", borrows };
}

function getBinaryMultiplicationSteps(a: string, b: string) {
    const nA = a.length;
    const nB = b.length;
    const partialProducts: string[] = [];
    const bBits = b.split("").reverse();

    for (let i = 0; i < nB; i++) {
        if (bBits[i] === "1") {
            partialProducts.push(a.padEnd(nA + i, "0").padStart(nA + nB, "0"));
        } else {
            partialProducts.push("".padStart(nA + nB, "0"));
        }
    }

    const finalResult = (parseInt(a, 2) * parseInt(b, 2)).toString(2);
    return { a, b, partialProducts, finalResult };
}

function getBinaryDivisionSteps(dividend: string, divisor: string) {
    const steps = [];
    let currentVal = "";
    const divisorVal = parseInt(divisor, 2);

    if (divisorVal === 0) return { error: "Division by zero" };

    let quotient = "";
    for (let i = 0; i < dividend.length; i++) {
        currentVal += dividend[i];
        const currentInt = parseInt(currentVal, 2);

        if (currentInt >= divisorVal) {
            quotient += "1";
            steps.push({
                index: i,
                dividendPart: currentVal,
                divisor,
                quotientBit: "1",
                subtract: divisor,
                newRemainder: (currentInt - divisorVal).toString(2)
            });
            currentVal = (currentInt - divisorVal).toString(2);
            if (currentVal === "0") currentVal = "";
        } else {
            quotient += "0";
            steps.push({
                index: i,
                dividendPart: currentVal,
                divisor,
                quotientBit: "0",
                subtract: null,
                newRemainder: currentVal
            });
        }
    }

    return { dividend, divisor, quotient: quotient.replace(/^0+(?!$)/, "") || "0", steps, finalRemainder: currentVal || "0" };
}

function getComplement2(bin: string, bits: number = 8) {
    const padded = bin.padStart(bits, "0").slice(-bits);
    const ones = padded.split("").map(b => b === "0" ? "1" : "0").join("");
    const twos = (parseInt(ones, 2) + 1).toString(2).padStart(bits, "0").slice(-bits);
    return { original: padded, ones, twos };
}

/* ═══════════════════════════════════════════
   Components
   ═══════════════════════════════════════════ */

const TheoryCard = ({ title, content, rules }: { title: string, content: string, rules?: string[] }) => (
    <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
        <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
                <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-bold text-lg">{title}</h4>
        </div>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{content}</p>
        {rules && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {rules.map((rule, i) => (
                    <div key={i} className="bg-card p-3 rounded-lg border border-border shadow-sm text-center font-mono text-sm">
                        {rule}
                    </div>
                ))}
            </div>
        )}
    </div>
);

const AdditionVisualizer = ({ a, b }: { a: string, b: string }) => {
    const { pA, pB, steps, finalResult, finalCarries } = getBinaryAdditionSteps(a, b);
    const [stepIdx, setStepIdx] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        let timer: any;
        if (isPlaying && stepIdx < steps.length - 1) {
            timer = setTimeout(() => setStepIdx(s => s + 1), 1500);
        } else {
            setIsPlaying(false);
        }
        return () => clearTimeout(timer);
    }, [isPlaying, stepIdx, steps.length]);

    const reset = () => { setStepIdx(-1); setIsPlaying(false); };
    const currentStep = stepIdx >= 0 ? steps[stepIdx] : null;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setStepIdx(s => Math.min(s + 1, steps.length - 1))} disabled={stepIdx >= steps.length - 1}>
                        <ChevronRight className="w-4 h-4 mr-1" /> Next Step
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setIsPlaying(!isPlaying)}>
                        {isPlaying ? "Pause" : "Auto Play"}
                    </Button>
                    <Button size="sm" variant="ghost" onClick={reset}>
                        <RotateCcw className="w-4 h-4" />
                    </Button>
                </div>
                <div className="text-xs font-mono font-bold px-3 py-1 bg-muted rounded-full">
                    BIT {currentStep ? currentStep.index : "READY"}
                </div>
            </div>

            <div className="relative font-mono text-2xl md:text-5xl flex flex-col items-end p-12 bg-card rounded-3xl border border-border shadow-2xl max-w-lg mx-auto overflow-hidden">
                {/* Carry Row */}
                <div className="flex h-12 mb-4">
                    {finalCarries.map((c, i) => {
                        const isLatestCarry = currentStep && currentStep.index === i && currentStep.newCarry === 1;
                        const isExistingCarry = currentStep && (currentStep.index > i || (currentStep.index === i && stepIdx > 0)) && finalCarries[i] === 1;

                        return (
                            <div key={i} className="w-12 md:w-16 flex items-center justify-center relative">
                                <AnimatePresence>
                                    {(isLatestCarry || isExistingCarry) && (
                                        <motion.div
                                            initial={isLatestCarry ? { y: 150, x: 50, opacity: 0, scale: 2 } : { opacity: 1 }}
                                            animate={{ y: 0, x: 0, opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.8, ease: "circOut" }}
                                            className="absolute text-primary text-xs md:text-sm font-black bg-primary/10 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center border border-primary/30"
                                        >
                                            1
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                {/* Number A Row */}
                <div className="flex mb-2">
                    {pA.split("").map((bit, i) => {
                        const isActive = currentStep && currentStep.index === i;
                        return (
                            <motion.div
                                key={i}
                                animate={isActive ? { scale: 1.2, color: "hsl(var(--primary))" } : { scale: 1, color: "inherit" }}
                                className={`w-12 md:w-16 text-center transition-colors duration-500 ${isActive ? "font-bold" : "text-muted-foreground/30"}`}
                            >
                                {bit}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Number B Row */}
                <div className="flex mb-4 border-b-4 border-foreground/10 pb-4 relative">
                    <div className="absolute left-[-3rem] top-0 text-3xl font-light text-primary">+</div>
                    {pB.split("").map((bit, i) => {
                        const isActive = currentStep && currentStep.index === i;
                        return (
                            <motion.div
                                key={i}
                                animate={isActive ? { scale: 1.2, color: "hsl(var(--primary))" } : { scale: 1, color: "inherit" }}
                                className={`w-12 md:w-16 text-center transition-colors duration-500 ${isActive ? "font-bold" : "text-muted-foreground/30"}`}
                            >
                                {bit}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Result Row */}
                <div className="flex min-h-[4rem]">
                    {finalResult.padStart(pA.length + 1, " ").split("").map((bit, i) => {
                        const fromRight = finalResult.length - 1 - i;
                        const show = stepIdx >= fromRight;

                        return (
                            <div key={i} className="w-12 md:w-16 flex items-center justify-center">
                                <AnimatePresence>
                                    {show && bit !== " " && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                            className="text-secondary font-black text-3xl md:text-5xl"
                                        >
                                            {bit}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-primary/10 bg-primary/5">
                <h5 className="text-sm font-bold mb-3 flex items-center gap-2 text-primary">
                    <Play className="w-4 h-4" /> BIT-BY-BIT EXPLANATION
                </h5>
                <div className="text-sm leading-relaxed min-h-[3rem]">
                    {currentStep ? (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={stepIdx}>
                            Column <span className="font-bold underline">{currentStep.index}</span>:
                            Adding {currentStep.bitA} and {currentStep.bitB}
                            {currentStep.prevCarry > 0 ? <span className="text-primary font-bold"> + carry 1</span> : ""}.
                            <br />
                            The result is <span className="font-bold">{currentStep.sum}</span>
                            {currentStep.newCarry === 1 ? <span className="text-primary font-bold"> with a carry of 1 to the next column.</span> : "."}
                        </motion.p>
                    ) : (
                        "Ready to compute. Animations will show bit-level operations."
                    )}
                </div>
            </div>
        </div>
    );
};

const SubtractionVisualizer = ({ a, b }: { a: string, b: string }) => {
    const { pA, pB, steps, finalResult, borrows } = getBinarySubtractionSteps(a, b);
    const [stepIdx, setStepIdx] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        let timer: any;
        if (isPlaying && stepIdx < steps.length - 1) {
            timer = setTimeout(() => setStepIdx(s => s + 1), 1500);
        } else {
            setIsPlaying(false);
        }
        return () => clearTimeout(timer);
    }, [isPlaying, stepIdx, steps.length]);

    const currentStep = stepIdx >= 0 ? steps[stepIdx] : null;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setStepIdx(s => Math.min(s + 1, steps.length - 1))} disabled={stepIdx >= steps.length - 1}>
                        <ChevronRight className="w-4 h-4 mr-1" /> Next Step
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setIsPlaying(!isPlaying)}>
                        {isPlaying ? "Pause" : "Auto Play"}
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setStepIdx(-1)}>
                        <RotateCcw className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="relative font-mono text-2xl md:text-5xl flex flex-col items-end p-12 bg-card rounded-3xl border border-border shadow-2xl max-w-lg mx-auto">
                {/* Borrow Row */}
                <div className="flex h-12 mb-4">
                    {borrows.map((bor, i) => {
                        const isLatest = currentStep && currentStep.index === i && currentStep.newBorrow === 1;
                        const isExisting = currentStep && currentStep.index > i && borrows[i] === 1;
                        return (
                            <div key={i} className="w-12 md:w-16 flex items-center justify-center relative">
                                <AnimatePresence>
                                    {(isLatest || isExisting) && (
                                        <motion.div
                                            initial={isLatest ? { x: -50, opacity: 0 } : { opacity: 1 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            className="absolute text-destructive text-xs font-bold"
                                        >
                                            BORROW 1
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                <div className="flex mb-2">
                    {pA.split("").map((bit, i) => {
                        const isActive = currentStep && currentStep.index === i;
                        return (
                            <motion.div
                                key={i}
                                animate={isActive ? { scale: 1.2, color: "hsl(var(--destructive))" } : {}}
                                className={`w-12 md:w-16 text-center ${isActive ? "font-bold" : "text-muted-foreground/30"}`}
                            >
                                {bit}
                            </motion.div>
                        );
                    })}
                </div>

                <div className="flex border-b-4 border-foreground/10 pb-4 relative mb-4">
                    <span className="absolute left-[-3rem] top-0 text-xl md:text-3xl text-destructive">-</span>
                    {pB.split("").map((bit, i) => {
                        const isActive = currentStep && currentStep.index === i;
                        return (
                            <motion.div
                                key={i}
                                animate={isActive ? { scale: 1.2, color: "hsl(var(--destructive))" } : {}}
                                className={`w-12 md:w-16 text-center ${isActive ? "font-bold" : "text-muted-foreground/30"}`}
                            >
                                {bit}
                            </motion.div>
                        );
                    })}
                </div>

                <div className="flex min-h-[4rem]">
                    {finalResult.padStart(pA.length, " ").split("").map((bit, i) => {
                        const show = stepIdx >= (pA.length - 1 - i);
                        return (
                            <div key={i} className="w-12 md:w-16 flex items-center justify-center">
                                <AnimatePresence>
                                    {show && bit !== " " && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="w-12 md:w-16 text-center font-bold text-orange-500"
                                        >
                                            {bit}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="bg-destructive/5 p-6 rounded-2xl border border-destructive/10">
                <h5 className="text-xs font-bold uppercase tracking-wider text-destructive mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4" /> Borrow Logic
                </h5>
                <p className="text-sm text-muted-foreground">
                    {currentStep ? (
                        <>In binary, borrowing 1 from the left position is equivalent to adding 2 to the current position. (0 - 1 = 1 after borrowing)</>
                    ) : "Visualizing bit-level borrowing mechanics."}
                </p>
            </div>
        </div>
    );
};

const MultiplicationVisualizer = ({ a, b }: { a: string, b: string }) => {
    const { partialProducts, finalResult } = getBinaryMultiplicationSteps(a, b);

    return (
        <div className="space-y-6">
            <div className="relative font-mono text-xl md:text-2xl flex flex-col items-end p-8 bg-card rounded-2xl border border-border shadow-inner max-w-lg mx-auto overflow-x-auto">
                <div className="mb-1">{a.padStart(a.length + b.length, " ")}</div>
                <div className="border-b-2 border-foreground pb-1 relative mb-2">
                    <span className="absolute left-[-2rem] top-0">×</span>
                    {b.padStart(a.length + b.length, " ")}
                </div>
                {partialProducts.map((pp, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.3 }}
                        className="text-muted-foreground"
                    >
                        {pp}
                    </motion.div>
                ))}
                <div className="border-t-2 border-foreground mt-2 pt-2 font-bold text-primary text-3xl">
                    {finalResult.padStart(a.length + b.length, " ")}
                </div>
            </div>
        </div>
    );
};

const DivisionVisualizer = ({ a, b }: { a: string, b: string }) => {
    const data = getBinaryDivisionSteps(a, b);
    const [stepIdx, setStepIdx] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        let timer: any;
        if (isPlaying && "steps" in data && stepIdx < data.steps.length - 1) {
            timer = setTimeout(() => setStepIdx(s => s + 1), 1500);
        } else {
            setIsPlaying(false);
        }
        return () => clearTimeout(timer);
    }, [isPlaying, stepIdx, data]);

    if ("error" in data) return <div className="text-destructive p-4 bg-destructive/10 rounded-lg">Error: {data.error}</div>;

    const currentStep = stepIdx >= 0 ? data.steps[stepIdx] : null;
    const reset = () => { setStepIdx(-1); setIsPlaying(false); };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setStepIdx(s => Math.min(s + 1, data.steps.length - 1))} disabled={stepIdx >= data.steps.length - 1}>
                        <ChevronRight className="w-4 h-4 mr-1" /> Next Step
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setIsPlaying(!isPlaying)}>
                        {isPlaying ? "Pause" : "Auto Play"}
                    </Button>
                    <Button size="sm" variant="ghost" onClick={reset}>
                        <RotateCcw className="w-4 h-4" />
                    </Button>
                </div>
                <div className="text-xs font-mono font-bold px-3 py-1 bg-muted rounded-full uppercase tracking-widest">
                    Step {stepIdx + 1} of {data.steps.length}
                </div>
            </div>

            <div className="relative font-mono text-xl md:text-2xl p-8 bg-card rounded-3xl border border-border shadow-2xl max-w-2xl mx-auto overflow-x-auto">
                <div className="inline-flex flex-col items-start min-w-full lg:min-w-0">
                    {/* Quotient Row */}
                    <div className="flex mb-2 ml-[calc(var(--divisor-width)+1.5rem)]">
                        <div className="flex items-center relative">
                            {/* Placeholder to align with dividend start */}
                            <AnimatePresence>
                                {stepIdx >= 0 && (
                                    <div className="flex">
                                        {data.steps.slice(0, stepIdx + 1).map((s, idx) => (
                                            <motion.span
                                                key={idx}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="w-8 text-center text-secondary font-black"
                                            >
                                                {s.quotientBit}
                                            </motion.span>
                                        ))}
                                    </div>
                                )}
                            </AnimatePresence>
                            <Badge variant="outline" className="absolute -top-6 left-0 text-[8px] opacity-50">QUOTIENT</Badge>
                        </div>
                    </div>

                    <div className="flex items-start">
                        {/* Divisor and Bracket */}
                        <div
                            className="flex items-center text-muted-foreground pr-4 border-r-2 border-foreground h-10 select-none"
                            style={{ "--divisor-width": `${b.length * 2}rem` } as any}
                        >
                            {b}
                        </div>

                        {/* Dividend area */}
                        <div className="flex flex-col pl-2">
                            {/* Dividend */}
                            <div className="flex mb-4 relative">
                                {a.split("").map((bit, idx) => (
                                    <span key={idx} className="w-8 text-center">{bit}</span>
                                ))}
                                <Badge variant="outline" className="absolute -top-6 left-0 text-[8px] opacity-50">DIVIDEND</Badge>
                            </div>

                            {/* Long Division Steps */}
                            <div className="space-y-1">
                                {data.steps.slice(0, stepIdx + 1).map((step, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex flex-col"
                                    >
                                        {step.subtract && (
                                            <div className="text-destructive/60 font-medium">
                                                <div className="flex" style={{ marginLeft: `${(step.index - b.length + 1) * 2}rem` }}>
                                                    {b.split("").map((bit, idx) => (
                                                        <span key={idx} className="w-8 text-center">{bit}</span>
                                                    ))}
                                                </div>
                                                <div className="border-t border-muted-foreground/30 w-full my-1"></div>
                                            </div>
                                        )}
                                        <div className="text-primary font-bold flex">
                                            {/* Align remainder with the bits above */}
                                            <div className="flex" style={{ marginLeft: `${(step.index - step.newRemainder.length + 1) * 2}rem` }}>
                                                {step.newRemainder.split("").map((bit, idx) => (
                                                    <span key={idx} className="w-8 text-center">{bit}</span>
                                                ))}
                                                {/* Show the bit being brought down */}
                                                {i < data.steps.length - 1 && stepIdx > i && (
                                                    <span className="w-8 text-center text-muted-foreground/30">{a[step.index + 1]}</span>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between gap-6">
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase font-bold text-muted-foreground opacity-60">Final Result</p>
                        <div className="flex gap-4">
                            <div className="text-sm">Quotient: <span className="font-bold text-secondary text-xl">{data.quotient}</span></div>
                            <div className="text-sm">Remainder: <span className="font-bold text-orange-500 text-xl">{data.finalRemainder}</span></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-primary/10 bg-primary/5">
                <h5 className="text-sm font-bold mb-3 flex items-center gap-2 text-primary uppercase tracking-widest">
                    <Play className="w-4 h-4" /> Division Step Logic
                </h5>
                <div className="text-sm leading-relaxed min-h-[4rem]">
                    {currentStep ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={stepIdx} className="space-y-2">
                            <p>
                                Column {currentStep.index + 1}: Bring down '{a[currentStep.index]}' to get <span className="font-bold">{currentStep.dividendPart}</span>.
                            </p>
                            <p>
                                {parseInt(currentStep.dividendPart, 2) >= parseInt(b, 2) ? (
                                    <>
                                        Compare: {currentStep.dividendPart} ≥ {b}? <span className="text-green-500 font-bold">YES</span>.
                                        Quotient bit is <span className="text-secondary font-bold">1</span>. Subtract {b}.
                                    </>
                                ) : (
                                    <>
                                        Compare: {currentStep.dividendPart} ≥ {b}? <span className="text-destructive font-bold">NO</span>.
                                        Quotient bit is <span className="text-secondary font-bold">0</span>.
                                    </>
                                )}
                            </p>
                        </motion.div>
                    ) : (
                        "Ready to start. Click 'Next Step' to visualize the long division process."
                    )}
                </div>
            </div>
        </div>
    );
};

const ComplementVisualizer = ({ val }: { val: string }) => {
    const bits = 8;
    const { original, ones, twos } = getComplement2(val, bits);

    return (
        <div className="space-y-6">
            <div className="grid sm:grid-cols-3 gap-4">
                {[
                    { label: "Original (8-bit)", value: original, color: "bg-muted" },
                    { label: "1's Complement", value: ones, color: "bg-blue-500/10 text-blue-600" },
                    { label: "2's Complement", value: twos, color: "bg-primary/10 text-primary font-bold" },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`p-4 rounded-xl border border-border text-center ${item.color} shadow-sm`}
                    >
                        <p className="text-[10px] uppercase font-bold tracking-widest opacity-60 mb-1">{item.label}</p>
                        <p className="font-mono text-lg">{item.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="p-6 bg-card rounded-3xl border border-border shadow-xl">
                <h5 className="font-bold mb-6 flex items-center gap-2 text-primary uppercase text-sm tracking-widest">
                    <Info className="w-4 h-4" /> Conversion Algorithm
                </h5>
                <div className="space-y-8 text-sm relative">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black shrink-0 border border-primary/20">1</div>
                        <div>
                            <p className="font-bold text-base mb-1">1's Complement</p>
                            <p className="text-muted-foreground italic">Flip all bits: Change every 0 to 1 and every 1 to 0.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black shrink-0 border border-primary/20">2</div>
                        <div>
                            <p className="font-bold text-base mb-1">2's Complement</p>
                            <p className="text-muted-foreground italic">Add binary 1 to the result of Step 1.</p>
                        </div>
                    </div>
                    <div className="absolute left-5 top-10 bottom-4 w-0.5 bg-gradient-to-b from-primary/30 to-transparent"></div>
                </div>
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════
   Main Section Component
   ═══════════════════════════════════════════ */

export function BinaryArithmeticSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const [op, setOp] = useState<ArithmeticOp>("addition");
    const [valA, setValA] = useState("1010");
    const [valB, setValB] = useState("1101");
    const [error, setError] = useState("");

    const validateBinary = (val: string) => /^[01]*$/.test(val);

    const handleValA = (v: string) => {
        if (validateBinary(v)) {
            setValA(v);
            setError("");
        } else {
            setError("Please enter only 0s and 1s");
        }
    };

    const handleValB = (v: string) => {
        if (validateBinary(v)) {
            setValB(v);
            setError("");
        } else {
            setError("Please enter only 0s and 1s");
        }
    };

    return (
        <section id="binary-arithmetic" className="section-padding overflow-hidden" ref={ref}>
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-secondary font-bold text-sm uppercase tracking-[0.2em] px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20">Section C</span>
                    <h2 className="heading-2 mt-6 mb-4">Binary Arithmetic & Complements</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                        Master the fundamental mathematics behind modern computing through high-fidelity, step-by-step interactive visualizations.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-10 items-start">
                    {/* Navigation */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="glass-card p-3 rounded-3xl border border-border shadow-xl backdrop-blur-xl">
                            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                                {[
                                    { id: "addition", label: "Binary Addition", icon: Plus, color: "text-blue-500", bg: "bg-blue-500/10" },
                                    { id: "subtraction", label: "Binary Subtraction", icon: Minus, color: "text-red-500", bg: "bg-red-500/10" },
                                    { id: "multiplication", label: "Binary Multiplication", icon: X, color: "text-purple-500", bg: "bg-purple-500/10" },
                                    { id: "division", label: "Binary Division", icon: Divide, color: "text-green-500", bg: "bg-green-500/10" },
                                    { id: "complement2", label: "2's Complement", icon: Info, color: "text-orange-500", bg: "bg-orange-500/10" },
                                    { id: "complementAddition", label: "Signed Addition", icon: Plus, color: "text-primary", bg: "bg-primary/10" },
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setOp(item.id as ArithmeticOp)}
                                        className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 group ${op === item.id
                                            ? "bg-card shadow-lg ring-1 ring-border translate-x-1"
                                            : "hover:bg-muted/50 text-muted-foreground grayscale hover:grayscale-0"
                                            }`}
                                    >
                                        <div className={`p-2 rounded-xl transition-transform group-hover:scale-110 ${item.bg}`}>
                                            <item.icon className={`w-5 h-5 ${item.color}`} />
                                        </div>
                                        <span className={`font-bold text-xs md:text-sm ${op === item.id ? "text-foreground" : ""}`}>{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Input Box */}
                        <div className="bg-card p-8 rounded-3xl shadow-card border border-border hover:shadow-card-hover transition-shadow">
                            <h4 className="font-black mb-6 flex items-center gap-3 text-xs uppercase tracking-widest text-primary">
                                <Calculator className="w-5 h-5" /> Global Input
                            </h4>
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-muted-foreground uppercase flex justify-between">
                                        <span>Value A (Binary)</span>
                                        <span className="text-primary italic opacity-50">Base-2</span>
                                    </label>
                                    <Input
                                        value={valA}
                                        onChange={(e) => handleValA(e.target.value)}
                                        className="font-mono text-xl py-6 rounded-xl border-2 focus-visible:ring-primary h-14"
                                        placeholder="0101"
                                    />
                                </div>
                                {op !== "complement2" && (
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-muted-foreground uppercase flex justify-between">
                                            <span>Value B (Binary)</span>
                                            <span className="text-primary italic opacity-50">Base-2</span>
                                        </label>
                                        <Input
                                            value={valB}
                                            onChange={(e) => handleValB(e.target.value)}
                                            className="font-mono text-xl py-6 rounded-xl border-2 focus-visible:ring-primary h-14"
                                            placeholder="1100"
                                        />
                                    </div>
                                )}
                                {error && (
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-destructive text-xs font-bold flex items-center gap-2">
                                        <AlertCircle className="w-3 h-3" /> {error}
                                    </motion.p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Content Display */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={op}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-8"
                            >
                                {op === "addition" && (
                                    <>
                                        <TheoryCard
                                            title="Binary Addition"
                                            content="Binary addition operates on place values of 2^n. It is conceptually identical to decimal addition but produces a carry whenever the sum is > 1."
                                            rules={["0 + 0 = 0", "0 + 1 = 1", "1 + 0 = 1", "1 + 1 = 10 (2)"]}
                                        />
                                        <div className="bg-card rounded-[2.5rem] shadow-2xl border border-border p-8 md:p-12 relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                                <Plus className="w-32 h-32" />
                                            </div>
                                            <AdditionVisualizer a={valA || "0"} b={valB || "0"} />
                                        </div>
                                    </>
                                )}

                                {op === "subtraction" && (
                                    <>
                                        <TheoryCard
                                            title="Binary Subtraction"
                                            content="Uses the 'borrow' method. Borrowing from the next bit provides a value of 2 to the current column. It is the logical basis for internal ALU subtraction."
                                            rules={["0 - 0 = 0", "1 - 0 = 1", "1 - 1 = 0", "10 - 1 = 1"]}
                                        />
                                        <div className="bg-card rounded-[2.5rem] shadow-2xl border border-border p-8 md:p-12 relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                                <Minus className="w-32 h-32" />
                                            </div>
                                            <SubtractionVisualizer a={valA || "0"} b={valB || "0"} />
                                        </div>
                                    </>
                                )}

                                {op === "multiplication" && (
                                    <>
                                        <TheoryCard
                                            title="Binary Multiplication"
                                            content="A process of repeated 'Shift-and-Add'. If the multiplier bit is 1, the multiplicand is added; otherwise, zero is effectively added."
                                        />
                                        <div className="bg-card rounded-[2.5rem] shadow-2xl border border-border p-8 md:p-12">
                                            <MultiplicationVisualizer a={valA || "0"} b={valB || "0"} />
                                        </div>
                                    </>
                                )}

                                {op === "division" && (
                                    <>
                                        <TheoryCard
                                            title="Binary Division"
                                            content="Similar to decimal long division. We determine how many times the divisor fits into the current part of the dividend, record a 1 or 0, and subtract."
                                        />
                                        <div className="bg-card rounded-[2.5rem] shadow-2xl border border-border p-8 md:p-12">
                                            <DivisionVisualizer a={valA || "0"} b={valB || "1"} />
                                        </div>
                                    </>
                                )}

                                {op === "complement2" && (
                                    <>
                                        <TheoryCard
                                            title="2's Complement Representation"
                                            content="The industry-standard way to represent negative integers. It allows computers to perform subtraction using only addition circuitry, simplifying hardware design."
                                        />
                                        <div className="bg-card rounded-[2.5rem] shadow-2xl border border-border p-8 md:p-12">
                                            <ComplementVisualizer val={valA || "0"} />
                                        </div>
                                    </>
                                )}

                                {op === "complementAddition" && (
                                    <>
                                        <TheoryCard
                                            title="Signed Arithmetic Logic"
                                            content="Computers rarely subtract. They add positive or negative numbers. Represent a negative number in 2's complement, then add it to your value to perform subtraction."
                                        />
                                        <div className="bg-muted/30 p-12 rounded-[2.5rem] border-2 border-dashed border-border text-center backdrop-blur-sm">
                                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                                                <AlertCircle className="w-8 h-8 text-primary" />
                                            </div>
                                            <p className="text-muted-foreground font-medium mb-4">To see 2's complement addition in action:</p>
                                            <ol className="text-left max-w-sm mx-auto space-y-2 text-sm text-muted-foreground mb-8">
                                                <li>1. Enter a binary value above.</li>
                                                <li>2. Switch to 'Addition' to see the process.</li>
                                                <li>3. The result is valid for signed numbers!</li>
                                            </ol>
                                            <Button variant="default" size="lg" className="rounded-xl px-10 shadow-glow" onClick={() => setOp("addition")}>
                                                Try Addition Visualizer
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}

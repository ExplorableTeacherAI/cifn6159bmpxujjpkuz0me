import { useState } from "react";
import { Section } from "@/components/templates";
import { Heading } from "@/components/molecules/Heading";
import { Paragraph } from "@/components/molecules/Paragraph";
import { Mafs, Coordinates, Plot } from "mafs";
import { Button } from "@/components/atoms/ui/button";
import { Minus, Plus } from "lucide-react";

/**
 * Section 4: Calculating Basic Derivatives
 *
 * Introduces the power rule and lets students explore how changing
 * the exponent affects both the function and its derivative.
 */
export const BasicDerivativesSection = () => {
    const [exponent, setExponent] = useState(2);

    // Function: f(x) = xⁿ
    const f = (x: number) => Math.pow(x, exponent);

    // Derivative: f'(x) = n·xⁿ⁻¹
    const fPrime = (x: number) => exponent * Math.pow(x, exponent - 1);

    // Format the derivative expression nicely
    const getDerivativeExpression = () => {
        if (exponent === 0) return "0";
        if (exponent === 1) return "1";
        if (exponent === 2) return "2x";
        if (exponent - 1 === 1) return `${exponent}x`;
        return `${exponent}x^${exponent - 1}`;
    };

    const getFunctionExpression = () => {
        if (exponent === 0) return "1";
        if (exponent === 1) return "x";
        return `x^${exponent}`;
    };

    // Adjust view based on exponent to keep things visible
    const getViewBox = () => {
        if (exponent <= 2) return { x: [-3, 3] as [number, number], y: [-2, 6] as [number, number] };
        if (exponent <= 3) return { x: [-2.5, 2.5] as [number, number], y: [-4, 8] as [number, number] };
        return { x: [-2, 2] as [number, number], y: [-5, 10] as [number, number] };
    };

    return (
        <Section id="basic-derivatives">
            <Heading level={2}>Calculating Basic Derivatives: The Power Rule</Heading>

            <Paragraph className="text-lg text-muted-foreground mb-4">
                Good news: you don't need to compute limits every time you want a derivative!
                Mathematicians have discovered patterns — <strong>derivative rules</strong> — that
                let us find derivatives quickly.
            </Paragraph>

            <Paragraph className="mb-6">
                The most fundamental rule is the <strong>Power Rule</strong>. It tells us how to
                differentiate any power of x:
            </Paragraph>

            {/* Power Rule Box */}
            <div className="bg-primary/10 border-2 border-primary/30 rounded-xl p-6 mb-6 text-center">
                <div className="text-sm text-muted-foreground mb-2">The Power Rule</div>
                <div className="text-2xl md:text-3xl font-mono font-bold text-primary">
                    d/dx (x<sup>n</sup>) = n · x<sup>n-1</sup>
                </div>
                <div className="text-sm text-muted-foreground mt-3">
                    "Bring down the exponent, then reduce it by 1"
                </div>
            </div>

            {/* Interactive Exploration */}
            <div className="bg-card rounded-xl p-4 shadow-lg border border-border mb-6">
                {/* Exponent Control */}
                <div className="flex items-center justify-center gap-4 mb-4">
                    <span className="text-muted-foreground">Choose exponent n:</span>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setExponent(Math.max(0, exponent - 1))}
                            disabled={exponent <= 0}
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        <div className="w-16 text-center text-2xl font-bold text-primary">
                            {exponent}
                        </div>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setExponent(Math.min(5, exponent + 1))}
                            disabled={exponent >= 5}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Function and Derivative Display */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-primary/10 rounded-lg p-4 text-center border border-primary/20">
                        <div className="text-sm text-muted-foreground mb-1">Function</div>
                        <div className="text-xl font-mono font-bold text-primary">
                            f(x) = {getFunctionExpression()}
                        </div>
                    </div>
                    <div className="bg-destructive/10 rounded-lg p-4 text-center border border-destructive/20">
                        <div className="text-sm text-muted-foreground mb-1">Derivative</div>
                        <div className="text-xl font-mono font-bold text-destructive">
                            f'(x) = {getDerivativeExpression()}
                        </div>
                    </div>
                </div>

                {/* Graph */}
                <div className="rounded-lg overflow-hidden">
                    <Mafs
                        height={300}
                        viewBox={getViewBox()}
                    >
                        <Coordinates.Cartesian
                            xAxis={{ lines: 1, labels: (x) => x.toString() }}
                            yAxis={{ lines: 1, labels: (y) => y.toString() }}
                        />

                        {/* Original function f(x) = xⁿ */}
                        <Plot.OfX
                            y={f}
                            color="#2563eb"
                            weight={3}
                        />

                        {/* Derivative f'(x) = n·xⁿ⁻¹ */}
                        <Plot.OfX
                            y={fPrime}
                            color="#dc2626"
                            weight={3}
                        />
                    </Mafs>
                </div>

                {/* Legend */}
                <div className="flex justify-center gap-6 mt-3 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-1 bg-primary rounded" />
                        <span>f(x) = {getFunctionExpression()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-1 bg-destructive rounded" />
                        <span>f'(x) = {getDerivativeExpression()}</span>
                    </div>
                </div>
            </div>

            {/* Examples by exponent */}
            <div className="space-y-3 mb-6">
                <Paragraph className="font-semibold">Examples using the Power Rule:</Paragraph>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className={`p-3 rounded-lg border transition-all ${exponent === 2 ? "bg-primary/10 border-primary" : "bg-muted/30 border-border"}`}>
                        <div className="font-mono text-sm">f(x) = x²</div>
                        <div className="font-mono text-sm text-muted-foreground">f'(x) = 2x</div>
                    </div>
                    <div className={`p-3 rounded-lg border transition-all ${exponent === 3 ? "bg-primary/10 border-primary" : "bg-muted/30 border-border"}`}>
                        <div className="font-mono text-sm">f(x) = x³</div>
                        <div className="font-mono text-sm text-muted-foreground">f'(x) = 3x²</div>
                    </div>
                    <div className={`p-3 rounded-lg border transition-all ${exponent === 4 ? "bg-primary/10 border-primary" : "bg-muted/30 border-border"}`}>
                        <div className="font-mono text-sm">f(x) = x⁴</div>
                        <div className="font-mono text-sm text-muted-foreground">f'(x) = 4x³</div>
                    </div>
                </div>
            </div>

            <Paragraph className="mb-4">
                Notice the pattern: when n = {exponent}, the derivative brings down the {exponent} and
                reduces the exponent to {exponent - 1}.
                {exponent === 1 && " When n = 1, the derivative is just 1 (a constant), because x¹ = x is a straight line with slope 1."}
                {exponent === 0 && " When n = 0, f(x) = 1 is a constant, and the derivative of any constant is 0!"}
            </Paragraph>

            <div className="bg-secondary/30 border-l-4 border-secondary p-4 rounded-r-lg">
                <Paragraph className="mb-0">
                    <strong>Why it works:</strong> The power rule comes directly from the limit definition.
                    When you expand (x+h)ⁿ using the binomial theorem and take the limit as h→0,
                    all terms except n·xⁿ⁻¹ vanish. The power rule is just a shortcut!
                </Paragraph>
            </div>
        </Section>
    );
};

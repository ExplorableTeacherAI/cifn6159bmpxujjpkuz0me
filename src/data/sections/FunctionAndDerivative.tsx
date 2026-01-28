import { useState } from "react";
import { Section } from "@/components/templates";
import { Heading } from "@/components/molecules/Heading";
import { Paragraph } from "@/components/molecules/Paragraph";
import { Mafs, Coordinates, Plot, Line } from "mafs";
import { Button } from "@/components/atoms/ui/button";

type FunctionType = "quadratic" | "cubic" | "sine";

interface FunctionOption {
    name: string;
    f: (x: number) => number;
    fPrime: (x: number) => number;
    fLabel: string;
    fPrimeLabel: string;
    viewBoxF: { x: [number, number]; y: [number, number] };
    viewBoxFPrime: { x: [number, number]; y: [number, number] };
    zeros: number[]; // x values where f'(x) = 0
}

const functionOptions: Record<FunctionType, FunctionOption> = {
    quadratic: {
        name: "Quadratic",
        f: (x) => -x * x + 4,
        fPrime: (x) => -2 * x,
        fLabel: "f(x) = -x² + 4",
        fPrimeLabel: "f'(x) = -2x",
        viewBoxF: { x: [-4, 4], y: [-2, 6] },
        viewBoxFPrime: { x: [-4, 4], y: [-6, 6] },
        zeros: [0],
    },
    cubic: {
        name: "Cubic",
        f: (x) => x * x * x - 3 * x,
        fPrime: (x) => 3 * x * x - 3,
        fLabel: "f(x) = x³ - 3x",
        fPrimeLabel: "f'(x) = 3x² - 3",
        viewBoxF: { x: [-3, 3], y: [-4, 4] },
        viewBoxFPrime: { x: [-3, 3], y: [-4, 10] },
        zeros: [-1, 1],
    },
    sine: {
        name: "Sine Wave",
        f: (x) => Math.sin(x),
        fPrime: (x) => Math.cos(x),
        fLabel: "f(x) = sin(x)",
        fPrimeLabel: "f'(x) = cos(x)",
        viewBoxF: { x: [-2 * Math.PI, 2 * Math.PI], y: [-2, 2] },
        viewBoxFPrime: { x: [-2 * Math.PI, 2 * Math.PI], y: [-2, 2] },
        zeros: [-Math.PI / 2, Math.PI / 2, (3 * Math.PI) / 2, (-3 * Math.PI) / 2],
    },
};

/**
 * Section 5: The Function and Its Derivative Side-by-Side
 *
 * Shows the visual relationship between f(x) and f'(x).
 * Highlights where f' = 0 corresponds to extrema of f.
 */
export const FunctionAndDerivativeSection = () => {
    const [selectedFunction, setSelectedFunction] = useState<FunctionType>("quadratic");

    const current = functionOptions[selectedFunction];

    return (
        <Section id="function-and-derivative">
            <Heading level={2}>The Function and Its Derivative: A Visual Connection</Heading>

            <Paragraph className="text-lg text-muted-foreground mb-4">
                The derivative doesn't just give us numbers — it tells a <em>story</em> about the
                original function. By looking at f(x) and f'(x) together, we can see powerful
                connections.
            </Paragraph>

            {/* Key Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <div className="font-semibold text-green-700 mb-1">When f'(x) {">"} 0</div>
                    <div className="text-sm text-muted-foreground">
                        f(x) is <strong>increasing</strong> — the curve goes upward
                    </div>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <div className="font-semibold text-red-700 mb-1">When f'(x) {"<"} 0</div>
                    <div className="text-sm text-muted-foreground">
                        f(x) is <strong>decreasing</strong> — the curve goes downward
                    </div>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                    <div className="font-semibold text-purple-700 mb-1">When f'(x) = 0</div>
                    <div className="text-sm text-muted-foreground">
                        f(x) has a <strong>peak or valley</strong> — a local maximum or minimum
                    </div>
                </div>
            </div>

            {/* Function Selector */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
                {(Object.keys(functionOptions) as FunctionType[]).map((key) => (
                    <Button
                        key={key}
                        variant={selectedFunction === key ? "default" : "outline"}
                        onClick={() => setSelectedFunction(key)}
                    >
                        {functionOptions[key].name}
                    </Button>
                ))}
            </div>

            {/* Graphs */}
            <div className="bg-card rounded-xl p-4 shadow-lg border border-border mb-6">
                {/* Original Function f(x) */}
                <div className="mb-2">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-4 h-1 bg-primary rounded" />
                        <span className="font-mono text-sm font-medium">{current.fLabel}</span>
                    </div>
                    <div className="rounded-lg overflow-hidden">
                        <Mafs height={200} viewBox={current.viewBoxF}>
                            <Coordinates.Cartesian
                                xAxis={{ lines: 1 }}
                                yAxis={{ lines: 1 }}
                            />

                            {/* Function plot */}
                            <Plot.OfX y={current.f} color="#2563eb" weight={3} />

                            {/* Vertical lines at zeros of derivative (extrema of f) */}
                            {current.zeros.map((x, i) => (
                                <Line.Segment
                                    key={i}
                                    point1={[x, current.viewBoxF.y[0]]}
                                    point2={[x, current.viewBoxF.y[1]]}
                                    color="#a855f7"
                                    weight={1}
                                    opacity={0.5}
                                />
                            ))}
                        </Mafs>
                    </div>
                </div>

                {/* Derivative f'(x) */}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-4 h-1 bg-destructive rounded" />
                        <span className="font-mono text-sm font-medium">{current.fPrimeLabel}</span>
                    </div>
                    <div className="rounded-lg overflow-hidden">
                        <Mafs height={200} viewBox={current.viewBoxFPrime}>
                            <Coordinates.Cartesian
                                xAxis={{ lines: 1 }}
                                yAxis={{ lines: 1 }}
                            />

                            {/* Zero line */}
                            <Line.Segment
                                point1={[current.viewBoxFPrime.x[0], 0]}
                                point2={[current.viewBoxFPrime.x[1], 0]}
                                color="#888"
                                weight={1}
                                opacity={0.5}
                            />

                            {/* Derivative plot */}
                            <Plot.OfX y={current.fPrime} color="#dc2626" weight={3} />

                            {/* Vertical lines at zeros */}
                            {current.zeros.map((x, i) => (
                                <Line.Segment
                                    key={i}
                                    point1={[x, current.viewBoxFPrime.y[0]]}
                                    point2={[x, current.viewBoxFPrime.y[1]]}
                                    color="#a855f7"
                                    weight={1}
                                    opacity={0.5}
                                />
                            ))}
                        </Mafs>
                    </div>
                </div>

                {/* Explanation for current function */}
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    {selectedFunction === "quadratic" && (
                        <Paragraph className="text-sm mb-0">
                            The parabola f(x) = -x² + 4 has its <span className="text-purple-600 font-semibold">peak at x = 0</span>.
                            Notice that f'(0) = 0 exactly there! To the left (x {"<"} 0), f' is positive and f rises.
                            To the right (x {">"} 0), f' is negative and f falls.
                        </Paragraph>
                    )}
                    {selectedFunction === "cubic" && (
                        <Paragraph className="text-sm mb-0">
                            The cubic f(x) = x³ - 3x has <span className="text-purple-600 font-semibold">two turning points</span>:
                            a local maximum at x = -1 and a local minimum at x = 1. The derivative f'(x) = 3x² - 3
                            equals zero at both points. Between them, f' is negative (f decreases).
                        </Paragraph>
                    )}
                    {selectedFunction === "sine" && (
                        <Paragraph className="text-sm mb-0">
                            The sine wave oscillates between peaks and valleys. The derivative cos(x) equals zero
                            at every <span className="text-purple-600 font-semibold">peak and valley</span> of sine.
                            When sine is climbing, cosine is positive; when sine is falling, cosine is negative.
                        </Paragraph>
                    )}
                </div>
            </div>

            <Paragraph className="mb-4">
                The <span className="text-purple-600 font-semibold">purple vertical lines</span> show
                where f'(x) = 0. Look at both graphs: every time the derivative crosses zero,
                the original function has a peak or valley!
            </Paragraph>

            <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg">
                <Paragraph className="mb-0">
                    <strong>Key Insight:</strong> Finding where f'(x) = 0 is one of the most powerful
                    applications of derivatives — it lets us locate maximum and minimum values of functions,
                    which is essential in optimization problems across science, engineering, and economics.
                </Paragraph>
            </div>
        </Section>
    );
};

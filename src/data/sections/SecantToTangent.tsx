import { useState } from "react";
import { Section } from "@/components/templates";
import { Heading } from "@/components/molecules/Heading";
import { Paragraph } from "@/components/molecules/Paragraph";
import { Mafs, Coordinates, Plot, Point, Line, vec } from "mafs";
import { Slider } from "@/components/atoms/ui/slider";

/**
 * Section 3: From Secant to Tangent (The Limit Definition)
 *
 * Shows how the derivative is defined using limits.
 * Students adjust h to see the secant line approach the tangent line.
 */
export const SecantToTangentSection = () => {
    const [h, setH] = useState(1.5);
    const xPoint = 1; // Fixed point where we're finding the derivative

    // Function: f(x) = x²
    const f = (x: number) => x * x;

    // Derivative: f'(x) = 2x
    const fPrime = (x: number) => 2 * x;

    // Points on the curve
    const y1 = f(xPoint);
    const y2 = f(xPoint + h);

    // Secant slope: [f(x+h) - f(x)] / h
    const secantSlope = (y2 - y1) / h;

    // True derivative at x = 1
    const trueDerivative = fPrime(xPoint);

    // Secant line function
    const secantLine = (x: number) => secantSlope * (x - xPoint) + y1;

    // Tangent line function (for comparison)
    const tangentLine = (x: number) => trueDerivative * (x - xPoint) + y1;

    // Line endpoints
    const secantStart: vec.Vector2 = [xPoint - 1, secantLine(xPoint - 1)];
    const secantEnd: vec.Vector2 = [xPoint + h + 0.5, secantLine(xPoint + h + 0.5)];

    const tangentStart: vec.Vector2 = [xPoint - 1.5, tangentLine(xPoint - 1.5)];
    const tangentEnd: vec.Vector2 = [xPoint + 2, tangentLine(xPoint + 2)];

    // Calculate how close we are to the true derivative
    const error = Math.abs(secantSlope - trueDerivative);
    const isVeryClose = h < 0.2;

    return (
        <Section id="secant-to-tangent">
            <Heading level={2}>From Secant to Tangent: The Limit Definition</Heading>

            <Paragraph className="text-lg text-muted-foreground mb-4">
                How do we actually <em>calculate</em> the slope at a single point? We can't use the
                usual "rise over run" formula with just one point. The brilliant idea behind calculus
                is to use <strong>two points that get closer and closer together</strong>.
            </Paragraph>

            <Paragraph className="mb-6">
                A line connecting two points on a curve is called a <strong>secant line</strong>.
                As those two points get closer, the secant line approaches the <strong>tangent line</strong>.
            </Paragraph>

            {/* Interactive Graph */}
            <div className="bg-card rounded-xl p-4 shadow-lg border border-border mb-6">
                <div className="rounded-lg overflow-hidden">
                    <Mafs
                        height={350}
                        viewBox={{ x: [-1, 4], y: [-1, 7] }}
                    >
                        <Coordinates.Cartesian
                            xAxis={{ lines: 1, labels: (x) => x.toString() }}
                            yAxis={{ lines: 1, labels: (y) => y.toString() }}
                        />

                        {/* The curve f(x) = x² */}
                        <Plot.OfX
                            y={f}
                            color="#2563eb"
                            weight={3}
                        />

                        {/* Tangent line (reference - faded) */}
                        <Line.Segment
                            point1={tangentStart}
                            point2={tangentEnd}
                            color="#22c55e"
                            weight={2}
                            opacity={0.4}
                        />

                        {/* Secant line */}
                        <Line.Segment
                            point1={secantStart}
                            point2={secantEnd}
                            color="#dc2626"
                            weight={2}
                        />

                        {/* Vertical line showing h */}
                        <Line.Segment
                            point1={[xPoint, 0]}
                            point2={[xPoint + h, 0]}
                            color="#f59e0b"
                            weight={3}
                            opacity={0.6}
                        />

                        {/* First point (x, f(x)) */}
                        <Point
                            x={xPoint}
                            y={y1}
                            color="#2563eb"
                        />

                        {/* Second point (x+h, f(x+h)) */}
                        <Point
                            x={xPoint + h}
                            y={y2}
                            color="#dc2626"
                        />

                        {/* Rise indicator */}
                        <Line.Segment
                            point1={[xPoint + h, y1]}
                            point2={[xPoint + h, y2]}
                            color="#a855f7"
                            weight={2}
                            opacity={0.6}
                        />

                        {/* Run indicator */}
                        <Line.Segment
                            point1={[xPoint, y1]}
                            point2={[xPoint + h, y1]}
                            color="#f59e0b"
                            weight={2}
                            opacity={0.6}
                        />
                    </Mafs>
                </div>

                {/* h Slider */}
                <div className="mt-4 px-2">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">
                            Adjust h (distance between points):
                        </span>
                        <span className="text-sm font-medium font-mono">h = {h.toFixed(2)}</span>
                    </div>
                    <Slider
                        value={[h]}
                        onValueChange={([v]) => setH(v)}
                        min={0.05}
                        max={2}
                        step={0.05}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>← Closer (h → 0)</span>
                        <span>Farther apart →</span>
                    </div>
                </div>

                {/* Display values */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-center">
                    <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
                        <div className="text-xs text-muted-foreground mb-1">Point 1</div>
                        <div className="text-sm font-bold text-primary">
                            ({xPoint}, {y1.toFixed(2)})
                        </div>
                    </div>
                    <div className="bg-destructive/10 rounded-lg p-3 border border-destructive/20">
                        <div className="text-xs text-muted-foreground mb-1">Point 2</div>
                        <div className="text-sm font-bold text-destructive">
                            ({(xPoint + h).toFixed(2)}, {y2.toFixed(2)})
                        </div>
                    </div>
                    <div className="bg-destructive/10 rounded-lg p-3 border border-destructive/20">
                        <div className="text-xs text-muted-foreground mb-1">Secant Slope</div>
                        <div className="text-lg font-bold text-destructive">
                            {secantSlope.toFixed(3)}
                        </div>
                    </div>
                    <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
                        <div className="text-xs text-muted-foreground mb-1">True Derivative</div>
                        <div className="text-lg font-bold text-green-600">
                            {trueDerivative.toFixed(3)}
                        </div>
                    </div>
                </div>

                {/* Convergence indicator */}
                <div className={`mt-4 p-3 rounded-lg text-center transition-all ${isVeryClose
                        ? "bg-green-500/20 border border-green-500/30"
                        : "bg-muted/50"
                    }`}>
                    <div className="text-sm">
                        {isVeryClose ? (
                            <span className="text-green-600 font-medium">
                                The secant slope ({secantSlope.toFixed(3)}) is very close to the true derivative ({trueDerivative})!
                            </span>
                        ) : (
                            <span className="text-muted-foreground">
                                Difference from true derivative: <strong>{error.toFixed(3)}</strong>
                                — make h smaller to get closer!
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <Paragraph className="mb-4">
                The <span className="text-destructive font-semibold">red secant line</span> connects
                two points on the curve. The <span className="text-green-600 font-semibold">faded green line</span> is
                the true tangent line we're trying to find.
            </Paragraph>

            <Paragraph className="mb-4">
                As you make h smaller, notice how the secant line rotates to match the tangent line,
                and the secant slope gets closer to the true derivative value of {trueDerivative}.
            </Paragraph>

            <div className="bg-card border border-border p-4 rounded-lg mb-4">
                <Paragraph className="mb-2 font-semibold">The Limit Definition of the Derivative:</Paragraph>
                <div className="text-center py-4 text-lg">
                    <span className="font-mono bg-muted px-3 py-2 rounded">
                        f'(x) = lim<sub>h→0</sub> [f(x+h) - f(x)] / h
                    </span>
                </div>
                <Paragraph className="text-sm text-muted-foreground mb-0">
                    This formula captures exactly what you're seeing: as h approaches 0,
                    the secant slope approaches the derivative.
                </Paragraph>
            </div>

            <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg">
                <Paragraph className="mb-0">
                    <strong>Key Insight:</strong> The derivative isn't magic — it's the limit of
                    something we <em>can</em> calculate (the slope between two points) as those
                    points get infinitely close together.
                </Paragraph>
            </div>
        </Section>
    );
};

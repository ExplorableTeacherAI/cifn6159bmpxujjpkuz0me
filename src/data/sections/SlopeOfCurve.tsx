import { useState } from "react";
import { Section } from "@/components/templates";
import { Heading } from "@/components/molecules/Heading";
import { Paragraph } from "@/components/molecules/Paragraph";
import { Mafs, Coordinates, Plot, Point, Line, vec } from "mafs";
import { Slider } from "@/components/atoms/ui/slider";

/**
 * Section 2: The Slope of a Curve
 *
 * Visualizes derivatives as the slope of a tangent line.
 * Students can move a point along a curve and see the tangent line change.
 */
export const SlopeOfCurveSection = () => {
    const [xValue, setXValue] = useState(1);

    // Function: f(x) = x² (same as our car example!)
    const f = (x: number) => x * x;

    // Derivative: f'(x) = 2x (the slope at any point)
    const fPrime = (x: number) => 2 * x;

    // Current point on the curve
    const currentY = f(xValue);
    const currentSlope = fPrime(xValue);

    // Tangent line: y - y0 = m(x - x0) => y = m(x - x0) + y0
    const tangentLine = (x: number) => currentSlope * (x - xValue) + currentY;

    // Calculate tangent line endpoints for visualization
    const tangentStart: vec.Vector2 = [xValue - 1.5, tangentLine(xValue - 1.5)];
    const tangentEnd: vec.Vector2 = [xValue + 1.5, tangentLine(xValue + 1.5)];

    // Determine slope description
    const getSlopeDescription = () => {
        if (Math.abs(currentSlope) < 0.1) return "nearly flat (slope ≈ 0)";
        if (currentSlope > 0) return `rising (slope = ${currentSlope.toFixed(2)})`;
        return `falling (slope = ${currentSlope.toFixed(2)})`;
    };

    return (
        <Section id="slope-of-curve">
            <Heading level={2}>The Slope of a Curve</Heading>

            <Paragraph className="text-lg text-muted-foreground mb-6">
                For a straight line, the slope is constant — it's the same everywhere.
                But for a <strong>curve</strong>, the steepness changes from point to point.
                The derivative tells us the slope of the curve at any specific location.
            </Paragraph>

            {/* Interactive Graph */}
            <div className="bg-card rounded-xl p-4 shadow-lg border border-border mb-6">
                <div className="rounded-lg overflow-hidden">
                    <Mafs
                        height={350}
                        viewBox={{ x: [-3, 3], y: [-1, 6] }}
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

                        {/* Tangent line */}
                        <Line.Segment
                            point1={tangentStart}
                            point2={tangentEnd}
                            color="#dc2626"
                            weight={2}
                        />

                        {/* Point on the curve */}
                        <Point
                            x={xValue}
                            y={currentY}
                            color="#dc2626"
                        />

                        {/* Visual slope indicator triangle */}
                        {Math.abs(currentSlope) > 0.1 && (
                            <>
                                {/* Horizontal line (run = 1) */}
                                <Line.Segment
                                    point1={[xValue, currentY]}
                                    point2={[xValue + 0.5, currentY]}
                                    color="#22c55e"
                                    weight={2}
                                    opacity={0.7}
                                />
                                {/* Vertical line (rise) */}
                                <Line.Segment
                                    point1={[xValue + 0.5, currentY]}
                                    point2={[xValue + 0.5, currentY + currentSlope * 0.5]}
                                    color="#22c55e"
                                    weight={2}
                                    opacity={0.7}
                                />
                            </>
                        )}
                    </Mafs>
                </div>

                {/* Slider Control */}
                <div className="mt-4 px-2">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Move along the curve:</span>
                        <span className="text-sm font-medium">x = {xValue.toFixed(2)}</span>
                    </div>
                    <Slider
                        value={[xValue]}
                        onValueChange={([v]) => setXValue(v)}
                        min={-2.5}
                        max={2.5}
                        step={0.05}
                    />
                </div>

                {/* Display values */}
                <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                    <div className="bg-muted/50 rounded-lg p-3">
                        <div className="text-xs text-muted-foreground mb-1">x position</div>
                        <div className="text-xl font-bold text-foreground">
                            {xValue.toFixed(2)}
                        </div>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
                        <div className="text-xs text-muted-foreground mb-1">f(x) = x²</div>
                        <div className="text-xl font-bold text-primary">
                            {currentY.toFixed(2)}
                        </div>
                    </div>
                    <div className="bg-destructive/10 rounded-lg p-3 border border-destructive/20">
                        <div className="text-xs text-muted-foreground mb-1">Slope (f'(x) = 2x)</div>
                        <div className="text-xl font-bold text-destructive">
                            {currentSlope.toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>

            <Paragraph className="mb-4">
                The <span className="text-primary font-semibold">blue curve</span> is our function f(x) = x².
                The <span className="text-destructive font-semibold">red line</span> is the <strong>tangent line</strong> —
                it just barely touches the curve at one point and shows the direction the curve is heading.
            </Paragraph>

            <Paragraph className="mb-4">
                Right now, at x = {xValue.toFixed(2)}, the curve is {getSlopeDescription()}.
                {xValue < 0 && " Notice how the slope is negative on the left side — the curve is going downward!"}
                {xValue > 0 && " The positive slope means the curve is climbing upward."}
                {Math.abs(xValue) < 0.3 && " At the bottom of the parabola, the curve is momentarily flat before changing direction."}
            </Paragraph>

            <div className="bg-secondary/30 border-l-4 border-secondary p-4 rounded-r-lg">
                <Paragraph className="mb-0">
                    <strong>The Connection:</strong> The slope of the tangent line at any point
                    is exactly the value of the derivative at that point. For f(x) = x²,
                    the derivative is f'(x) = 2x. That's why at x = {xValue.toFixed(2)},
                    the slope is 2 × {xValue.toFixed(2)} = {currentSlope.toFixed(2)}.
                </Paragraph>
            </div>
        </Section>
    );
};

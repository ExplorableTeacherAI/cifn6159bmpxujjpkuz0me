import { useState, useEffect } from "react";
import { Section } from "@/components/templates";
import { Heading } from "@/components/molecules/Heading";
import { Paragraph } from "@/components/molecules/Paragraph";
import { Mafs, Coordinates, Plot, Point, Line } from "mafs";
import { Button } from "@/components/atoms/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

/**
 * Section 6: Real-World Application
 *
 * Shows derivatives in action: position → velocity → acceleration.
 * Demonstrates how each quantity is the derivative of the previous one.
 */
export const RealWorldApplicationSection = () => {
    const [time, setTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const maxTime = 4;

    // Position function: s(t) = -t² + 4t (a ball thrown upward)
    // This creates a parabola peaking at t = 2
    const position = (t: number) => -t * t + 4 * t;

    // Velocity (first derivative): v(t) = -2t + 4
    const velocity = (t: number) => -2 * t + 4;

    // Acceleration (second derivative): a(t) = -2 (constant - gravity!)
    const acceleration = () => -2;

    // Current values
    const currentPosition = position(time);
    const currentVelocity = velocity(time);
    const currentAcceleration = acceleration();

    // Animation loop
    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            setTime((prev) => {
                if (prev >= maxTime) {
                    setIsPlaying(false);
                    return maxTime;
                }
                return prev + 0.03;
            });
        }, 30);

        return () => clearInterval(interval);
    }, [isPlaying]);

    const handleReset = () => {
        setTime(0);
        setIsPlaying(false);
    };

    const togglePlay = () => {
        if (time >= maxTime) {
            setTime(0);
        }
        setIsPlaying(!isPlaying);
    };

    // Ball height for animation (scaled for display)
    const ballHeight = Math.max(0, currentPosition);

    return (
        <Section id="real-world-application">
            <Heading level={2}>Real-World Application: Motion and Derivatives</Heading>

            <Paragraph className="text-lg text-muted-foreground mb-4">
                Let's bring everything together with a classic physics example: <strong>a ball thrown
                straight up into the air</strong>. This example shows how derivatives connect
                position, velocity, and acceleration.
            </Paragraph>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                    <div className="font-semibold text-primary mb-1">Position s(t)</div>
                    <div className="text-sm text-muted-foreground">
                        <em>Where</em> the ball is
                    </div>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <div className="font-semibold text-green-600 mb-1">Velocity v(t) = s'(t)</div>
                    <div className="text-sm text-muted-foreground">
                        <em>How fast</em> position changes
                    </div>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                    <div className="font-semibold text-orange-600 mb-1">Acceleration a(t) = v'(t)</div>
                    <div className="text-sm text-muted-foreground">
                        <em>How fast</em> velocity changes
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-xl p-4 shadow-lg border border-border mb-6">
                {/* Ball Animation and Values */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    {/* Ball animation */}
                    <div className="flex flex-col items-center">
                        <div className="text-sm text-muted-foreground mb-2">Ball Motion</div>
                        <div className="relative w-20 h-48 bg-gradient-to-b from-sky-200 to-sky-100 rounded-lg border border-border overflow-hidden">
                            {/* Ground */}
                            <div className="absolute bottom-0 left-0 right-0 h-2 bg-green-600" />
                            {/* Height markers */}
                            <div className="absolute left-1 top-2 text-xs text-muted-foreground">4m</div>
                            <div className="absolute left-1 top-1/2 text-xs text-muted-foreground">2m</div>
                            <div className="absolute left-1 bottom-3 text-xs text-muted-foreground">0m</div>
                            {/* Ball */}
                            <div
                                className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-red-500 shadow-lg transition-all duration-75 flex items-center justify-center text-white text-lg"
                                style={{ bottom: `${8 + (ballHeight / 4) * 180}px` }}
                            >
                                ⚾
                            </div>
                        </div>
                    </div>

                    {/* Current values */}
                    <div className="flex flex-col justify-center">
                        <div className="bg-muted/50 rounded-lg p-3 mb-2">
                            <div className="text-xs text-muted-foreground">Time</div>
                            <div className="text-xl font-bold">{time.toFixed(2)}s</div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center space-y-2">
                        <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
                            <div className="text-xs text-muted-foreground">Position</div>
                            <div className="text-lg font-bold text-primary">{currentPosition.toFixed(2)}m</div>
                        </div>
                        <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
                            <div className="text-xs text-muted-foreground">Velocity</div>
                            <div className="text-lg font-bold text-green-600">{currentVelocity.toFixed(2)} m/s</div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center">
                        <div className="bg-orange-500/10 rounded-lg p-3 border border-orange-500/20">
                            <div className="text-xs text-muted-foreground">Acceleration</div>
                            <div className="text-lg font-bold text-orange-600">{currentAcceleration.toFixed(2)} m/s²</div>
                            <div className="text-xs text-muted-foreground mt-1">(constant gravity)</div>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4 mb-4">
                    <Button variant="outline" size="icon" onClick={togglePlay}>
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleReset}>
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                    <div className="text-sm text-muted-foreground">
                        {time < 2 ? "Ball rising..." : time < maxTime ? "Ball falling..." : "Landed!"}
                    </div>
                </div>

                {/* Three graphs stacked */}
                <div className="space-y-2">
                    {/* Position graph */}
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-3 h-1 bg-primary rounded" />
                            <span className="text-xs font-medium">Position: s(t) = -t² + 4t</span>
                        </div>
                        <div className="rounded-lg overflow-hidden">
                            <Mafs height={120} viewBox={{ x: [0, 4.5], y: [-0.5, 5] }}>
                                <Coordinates.Cartesian xAxis={{ lines: 1 }} yAxis={{ lines: 1 }} />
                                <Plot.OfX y={position} color="#2563eb" weight={2} />
                                <Point x={time} y={currentPosition} color="#2563eb" />
                                <Line.Segment
                                    point1={[time, 0]}
                                    point2={[time, currentPosition]}
                                    color="#2563eb"
                                    opacity={0.3}
                                    weight={1}
                                />
                            </Mafs>
                        </div>
                    </div>

                    {/* Velocity graph */}
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-3 h-1 bg-green-500 rounded" />
                            <span className="text-xs font-medium">Velocity: v(t) = -2t + 4 (derivative of position)</span>
                        </div>
                        <div className="rounded-lg overflow-hidden">
                            <Mafs height={120} viewBox={{ x: [0, 4.5], y: [-5, 5] }}>
                                <Coordinates.Cartesian xAxis={{ lines: 1 }} yAxis={{ lines: 2 }} />
                                {/* Zero line */}
                                <Line.Segment point1={[0, 0]} point2={[4.5, 0]} color="#888" opacity={0.5} weight={1} />
                                <Plot.OfX y={velocity} color="#22c55e" weight={2} />
                                <Point x={time} y={currentVelocity} color="#22c55e" />
                                <Line.Segment
                                    point1={[time, 0]}
                                    point2={[time, currentVelocity]}
                                    color="#22c55e"
                                    opacity={0.3}
                                    weight={1}
                                />
                            </Mafs>
                        </div>
                    </div>

                    {/* Acceleration graph */}
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-3 h-1 bg-orange-500 rounded" />
                            <span className="text-xs font-medium">Acceleration: a(t) = -2 (derivative of velocity)</span>
                        </div>
                        <div className="rounded-lg overflow-hidden">
                            <Mafs height={100} viewBox={{ x: [0, 4.5], y: [-4, 1] }}>
                                <Coordinates.Cartesian xAxis={{ lines: 1 }} yAxis={{ lines: 1 }} />
                                {/* Zero line */}
                                <Line.Segment point1={[0, 0]} point2={[4.5, 0]} color="#888" opacity={0.5} weight={1} />
                                <Plot.OfX y={acceleration} color="#f97316" weight={2} />
                                <Point x={time} y={currentAcceleration} color="#f97316" />
                            </Mafs>
                        </div>
                    </div>
                </div>
            </div>

            <Paragraph className="mb-4">
                Watch how the three quantities relate as the ball moves:
            </Paragraph>

            <ul className="space-y-2 mb-6 ml-4">
                <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>At t = 0, velocity is <strong>positive</strong> (+4 m/s) — the ball is moving upward</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>At t = 2, velocity is <strong>zero</strong> — the ball reaches its peak (maximum height)</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>After t = 2, velocity is <strong>negative</strong> — the ball is falling back down</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Acceleration is <strong>always -2 m/s²</strong> — gravity constantly pulls downward</span>
                </li>
            </ul>

            <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg">
                <Paragraph className="mb-0">
                    <strong>The Big Picture:</strong> Derivatives let us move from position to velocity
                    to acceleration. Each derivative reveals <em>how fast</em> the previous quantity
                    is changing. This chain of relationships is the foundation of physics and engineering!
                </Paragraph>
            </div>
        </Section>
    );
};

import { useState, useEffect } from "react";
import { Section } from "@/components/templates";
import { Heading } from "@/components/molecules/Heading";
import { Paragraph } from "@/components/molecules/Paragraph";
import { Slider } from "@/components/atoms/ui/slider";
import { Button } from "@/components/atoms/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

/**
 * Section 1: What is a Derivative?
 *
 * Introduces the concept of rate of change through a car position/velocity example.
 * Students control time and observe how position changes, with velocity displayed.
 */
export const WhatIsDerivativeSection = () => {
    const [time, setTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    // Position function: s(t) = t² (simple parabola - car accelerates)
    const position = (t: number) => t * t;

    // Velocity (derivative): v(t) = 2t
    const velocity = (t: number) => 2 * t;

    // Animation loop
    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            setTime(prev => {
                if (prev >= 5) {
                    setIsPlaying(false);
                    return 5;
                }
                return prev + 0.05;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [isPlaying]);

    const handleReset = () => {
        setTime(0);
        setIsPlaying(false);
    };

    const togglePlay = () => {
        if (time >= 5) {
            setTime(0);
        }
        setIsPlaying(!isPlaying);
    };

    // Calculate car position on the track (0-100% of track width)
    const carPositionPercent = (position(time) / position(5)) * 100;

    return (
        <Section id="what-is-derivative">
            <Heading level={1}>What is a Derivative?</Heading>

            <Paragraph className="text-lg text-muted-foreground mb-6">
                Imagine you're watching a car drive along a road. At any moment, you might ask:
                <strong> "How fast is it going right now?"</strong> This simple question is at the
                heart of what a derivative measures — the <em>instantaneous rate of change</em>.
            </Paragraph>

            {/* Car Animation */}
            <div className="bg-card rounded-xl p-6 shadow-lg border border-border mb-6">
                <div className="relative h-32 mb-6">
                    {/* Road */}
                    <div className="absolute bottom-8 left-0 right-0 h-3 bg-muted rounded-full">
                        {/* Road markings */}
                        <div className="absolute inset-0 flex items-center justify-around">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="w-6 h-1 bg-muted-foreground/30 rounded" />
                            ))}
                        </div>
                    </div>

                    {/* Distance markers */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-xs text-muted-foreground">
                        <span>0m</span>
                        <span>6.25m</span>
                        <span>12.5m</span>
                        <span>18.75m</span>
                        <span>25m</span>
                    </div>

                    {/* Car */}
                    <div
                        className="absolute bottom-10 transition-all duration-100 ease-linear"
                        style={{ left: `calc(${carPositionPercent}% - 20px)` }}
                    >
                        <div className="text-4xl">🚗</div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4 mb-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={togglePlay}
                    >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleReset}
                    >
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                    <div className="flex-1">
                        <Slider
                            value={[time]}
                            onValueChange={([v]) => {
                                setTime(v);
                                setIsPlaying(false);
                            }}
                            min={0}
                            max={5}
                            step={0.1}
                        />
                    </div>
                </div>

                {/* Display values */}
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-muted/50 rounded-lg p-4">
                        <div className="text-sm text-muted-foreground mb-1">Time</div>
                        <div className="text-2xl font-bold text-foreground">
                            {time.toFixed(1)}s
                        </div>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                        <div className="text-sm text-muted-foreground mb-1">Position</div>
                        <div className="text-2xl font-bold text-primary">
                            {position(time).toFixed(1)}m
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">s(t) = t²</div>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-4 border border-secondary">
                        <div className="text-sm text-muted-foreground mb-1">Velocity</div>
                        <div className="text-2xl font-bold text-secondary-foreground">
                            {velocity(time).toFixed(1)} m/s
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">v(t) = 2t ← derivative!</div>
                    </div>
                </div>
            </div>

            <Paragraph className="mb-4">
                The car's <strong>position</strong> tells us <em>where</em> it is at any moment.
                But the <strong>velocity</strong> — the derivative of position — tells us
                <em> how fast</em> that position is changing.
            </Paragraph>

            <Paragraph className="mb-4">
                Notice something important: as time increases, the velocity also increases.
                The car is <strong>accelerating</strong>! At t = 0, the car isn't moving (velocity = 0).
                By t = 5 seconds, it's traveling at {velocity(5)} m/s.
            </Paragraph>

            <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg">
                <Paragraph className="mb-0">
                    <strong>Key Insight:</strong> The derivative gives us the <em>instantaneous</em> rate
                    of change — not the average speed over a trip, but exactly how fast something is
                    changing at one precise moment in time.
                </Paragraph>
            </div>
        </Section>
    );
};

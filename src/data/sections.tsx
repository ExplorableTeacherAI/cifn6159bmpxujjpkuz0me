import { type ReactElement } from "react";
import { Section } from "@/components/templates";
import { FullWidthLayout } from "@/components/layouts";
import { WhatIsDerivativeSection } from "./sections/WhatIsDerivative";
import { SlopeOfCurveSection } from "./sections/SlopeOfCurve";
import { SecantToTangentSection } from "./sections/SecantToTangent";
import { BasicDerivativesSection } from "./sections/BasicDerivatives";
import { Heading } from "@/components/molecules/Heading";
import { Paragraph } from "@/components/molecules/Paragraph";

/**
 * ------------------------------------------------------------------
 * DERIVATIVES LESSON
 * ------------------------------------------------------------------
 * An interactive explorable explanation teaching the concept of derivatives
 * to undergraduate students.
 *
 * Learning Objectives:
 * 1. Understanding what a derivative represents (rate of change)
 * 2. Learning how to calculate basic derivatives
 * 3. Visualizing the relationship between a function and its derivative
 */

export const sections: ReactElement[] = [
    // Title Section
    <FullWidthLayout key="title" maxWidth="xl">
        <Section id="lesson-title" padding="lg">
            <div className="text-center py-8">
                <Heading level={1} className="text-5xl mb-4">
                    Understanding Derivatives
                </Heading>
                <Paragraph className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Discover how calculus lets us measure change — from the speed of a car
                    to the slope of any curve, one instant at a time.
                </Paragraph>
            </div>
        </Section>
    </FullWidthLayout>,

    // Section 1: What is a Derivative?
    <FullWidthLayout key="what-is-derivative" maxWidth="xl">
        <WhatIsDerivativeSection />
    </FullWidthLayout>,

    // Section 2: The Slope of a Curve
    <FullWidthLayout key="slope-of-curve" maxWidth="xl">
        <SlopeOfCurveSection />
    </FullWidthLayout>,

    // Section 3: From Secant to Tangent
    <FullWidthLayout key="secant-to-tangent" maxWidth="xl">
        <SecantToTangentSection />
    </FullWidthLayout>,

    // Section 4: Calculating Basic Derivatives
    <FullWidthLayout key="basic-derivatives" maxWidth="xl">
        <BasicDerivativesSection />
    </FullWidthLayout>,
];

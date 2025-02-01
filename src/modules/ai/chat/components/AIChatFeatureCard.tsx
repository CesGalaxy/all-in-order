"use client";

import type { CardProps } from "@heroui/card";
import { Card, CardBody, CardHeader } from "@heroui/card";

import React from "react";

export type FeatureCardProps = CardProps & {
    title: string;
    descriptions: string[];
    icon: React.ReactNode;
};

export default function AIChatFeatureCard({ title, descriptions = [], icon, ...props }: FeatureCardProps) {
    return <Card className="bg-content2" shadow="none" {...props}>
        <CardHeader className="flex flex-col gap-2 px-4 pb-4 pt-6">
            {icon}
            <p className="text-medium text-content2-foreground">{title}</p>
        </CardHeader>
        <CardBody className="flex flex-col gap-2">
            {descriptions.map((description, index) => (
                <div
                    key={index}
                    className="flex min-h-[50px] rounded-medium bg-content3 px-3 py-2 text-content3-foreground"
                >
                    <p className="text-small">{description}</p>
                </div>
            ))}
        </CardBody>
    </Card>;
}
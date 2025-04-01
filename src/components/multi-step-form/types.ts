import { FC } from 'react';
import { LucideIcon } from 'lucide-react';

export interface Step {
    title: string;
    icon: LucideIcon;
    component: FC;
    color: 'personal' | 'company' | 'job' | 'compensation';
}

export interface StepColors {
    [key: string]: {
        base: string;
        light: string;
        border: string;
    };
}
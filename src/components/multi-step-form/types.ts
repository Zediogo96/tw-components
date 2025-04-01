import { LucideIcon } from 'lucide-react';
import { FC } from 'react';

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

export interface JobFormData {
    // Personal Info step
    specialization: 'specialized' | 'non-specialized';
    jobTitle: string;
    workArea: string;
    scheduleType: 'full-time' | 'semanal' | 'personalizado';
    jobDescription?: string;

    // Company Details step
    workType: 'local' | 'remoto';
    district?: string;
    workAddress?: string;
    geolocationRadius?: number;

    // Job Details step
    startDate?: Date;
    endDate?: Date;
    numberOfPositions: number;

    // Compensation step
    paymentFrequency?: 'monthly' | 'hourly' | 'per-shift' | 'agreement';
    salary?: number;
    benefits?: string;
    paymentMethod?: 'unilinkr' | 'green-receipts' | 'isolated-acts' | 'employment-contract' | 'other';
    candidateType?: 'public' | 'teams-only';
}

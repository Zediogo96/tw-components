import { BanknoteIcon, Briefcase, Calendar as CalendarIcon, MapPin } from 'lucide-react';
import CompanyDetails from './steps/company-details';
import Compensation from './steps/compensation';
import JobDetails from './steps/job-details';
import PersonalInfo from './steps/personal-info';
import { JobFormData, Step, StepColors } from './types';

export const stepColors: StepColors = {
    personal: {
        base: 'rgb(var(--color-blue-500))',
        light: 'rgb(var(--color-blue-50))',
        border: 'rgb(var(--color-blue-200))',
    },
    company: {
        base: 'rgb(var(--color-purple-500))',
        light: 'rgb(var(--color-purple-50))',
        border: 'rgb(var(--color-purple-200))',
    },
    job: {
        base: 'rgb(var(--color-amber-500))',
        light: 'rgb(var(--color-amber-50))',
        border: 'rgb(var(--color-amber-200))',
    },
    compensation: {
        base: 'rgb(var(--color-rose-500))',
        light: 'rgb(var(--color-rose-50))',
        border: 'rgb(var(--color-rose-200))',
    },
};

export const steps: Step[] = [
    { title: 'Informações Básicas', icon: Briefcase, component: PersonalInfo, color: 'personal' },
    { title: 'Localização', icon: MapPin, component: CompanyDetails, color: 'company' },
    { title: 'Horário & Vagas', icon: CalendarIcon, component: JobDetails, color: 'job' },
    { title: 'Remuneração', icon: BanknoteIcon, component: Compensation, color: 'compensation' },
];

export const defaultJobFormData: JobFormData = {
    specialization: undefined,
    jobTitle: '',
    workArea: '',
    scheduleType: undefined,
    workType: 'local',
    startDate: undefined,
    endDate: undefined,
    numberOfPositions: 1,
    paymentFrequency: 'monthly',
    salary: undefined,
    benefits: '',
    paymentMethod: 'unilinkr',
    candidateType: 'public',
};

import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Briefcase, Building, Check, HelpCircle, Send, User } from 'lucide-react';
import { FC, useState } from 'react';

const stepColors = {
    personal: {
        base: 'rgb(var(--color-blue-500))', // Blue
        light: 'rgb(var(--color-blue-50))',
        border: 'rgb(var(--color-blue-200))',
    },
    company: {
        base: 'rgb(var(--color-purple-500))', // Purple
        light: 'rgb(var(--color-purple-50))',
        border: 'rgb(var(--color-purple-200))',
    },
    job: {
        base: 'rgb(var(--color-emerald-500))', // Emerald
        light: 'rgb(var(--color-emerald-50))',
        border: 'rgb(var(--color-emerald-200))',
    },
    confirmation: {
        base: 'rgb(var(--color-amber-500))', // Amber
        light: 'rgb(var(--color-amber-50))',
        border: 'rgb(var(--color-amber-200))',
    },
};

interface Step {
    title: string;
    icon: FC;
    component: FC;
    color: keyof typeof stepColors;
}

interface StepIndicatorProps {
    step: Step;
    index: number;
    currentStep: number;
    totalSteps: number;
}

const FormField: FC<{
    label: string;
    tooltip?: string;
    tooltipContent?: React.ReactNode;
    children: React.ReactNode;
}> = ({ label, tooltip, tooltipContent, children }) => (
    <div className="space-y-2">
        <div className="flex items-center gap-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
            </label>
            {(tooltipContent || tooltip) && (
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <div className="cursor-help">
                            <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                        <div className="space-y-2 text-sm">{tooltipContent || tooltip}</div>
                    </HoverCardContent>
                </HoverCard>
            )}
        </div>
        {children}
    </div>
);

const PersonalInfo: FC = () => (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
                label="Grau de especialização"
                tooltipContent={
                    <div className="space-y-2">
                        <p>
                            <strong>Especializado</strong> - a formação do candidato importa
                        </p>
                        <p>
                            <strong>Não especializado</strong> - a formação do colaborador não importa
                        </p>
                    </div>
                }
            >
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="select">Selecionar</SelectItem>
                        <SelectItem value="specialized">Especializado</SelectItem>
                        <SelectItem value="non-specialized">Não Especializado</SelectItem>
                    </SelectContent>
                </Select>
            </FormField>
            <FormField label="Titulo do Trabalho" tooltip="Título do trabalho visível para os candidatos">
                <Input placeholder="Ex: Desenvolvedor Full Stack" />
            </FormField>
            <FormField
                label="Área de trabalho"
                tooltip="A categoria que melhor se adequa às tarefas dos colaboradores neste trabalho"
            >
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecionar área" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="comercial">Comercial</SelectItem>
                        <SelectItem value="empregado-mesa">Empregado de Mesa</SelectItem>
                        <SelectItem value="tecnico-saude">Tecnico de Saude</SelectItem>
                        <SelectItem value="explicacao">Explicação</SelectItem>
                        <SelectItem value="programacao">Programação</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="hospedeiro-evento">Hospedeiro em Evento</SelectItem>
                        <SelectItem value="motorista-driver">Motorista Driver</SelectItem>
                        <SelectItem value="operador-logistico">Operador Logístico</SelectItem>
                        <SelectItem value="promotor-vendas">Promotor de Vendas</SelectItem>
                        <SelectItem value="secretario">Secretário</SelectItem>
                        <SelectItem value="consultor">Consultor</SelectItem>
                        <SelectItem value="assistente">Assistente</SelectItem>
                        <SelectItem value="atendimento-publico">Atendimento ao Público</SelectItem>
                        <SelectItem value="restaurantes">Restaurantes</SelectItem>
                        <SelectItem value="balcao">Balcão</SelectItem>
                        <SelectItem value="fotografia-video">Fotografia e Vídeo</SelectItem>
                        <SelectItem value="ativacao-marca">Ativaçao de Marca</SelectItem>
                        <SelectItem value="administrativo">Administrativo</SelectItem>
                        <SelectItem value="personal-fitness">Personal Fitness</SelectItem>
                        <SelectItem value="catering">Catering</SelectItem>
                        <SelectItem value="hotelaria">Hotelaria</SelectItem>
                        <SelectItem value="retalho-alimentar">Retalho Alimentar</SelectItem>
                        <SelectItem value="retalho-moda">Retalho Moda</SelectItem>
                    </SelectContent>
                </Select>
            </FormField>
            <FormField
                label="Tipo de horário"
                tooltipContent={
                    <div className="space-y-2">
                        <p>
                            <strong>Personalizado</strong> - Especifique exatamente quais dias e horários os
                            colaboradores precisam de trabalhar. Ideal para trabalhos pontuais
                        </p>
                        <p>
                            <strong>Recorrente semanalmente</strong> - Especifique o horário semanal do colaborador, que
                            deve se repetir durante um período de tempo. Ideal para part-times.
                        </p>
                        <p>
                            <strong>Full-time</strong> - Ideal se precisar de um colaborador para aproximadamente 35h+
                            por semana.
                        </p>
                    </div>
                }
            >
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="full-time">Full time</SelectItem>
                        <SelectItem value="semanal">Semanal</SelectItem>
                        <SelectItem value="personalizado">Personalizado</SelectItem>
                    </SelectContent>
                </Select>
            </FormField>
        </div>
    </div>
);

const CompanyDetails: FC = () => (
    <div className="space-y-6">
        <h2 className="text-xl font-semibold">Company Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Company Name" tooltip="Enter your company's legal name">
                <Input placeholder="Acme Inc." />
            </FormField>
            <FormField label="Industry" tooltip="Select your company's primary industry">
                <Input placeholder="Technology" />
            </FormField>
            <FormField label="Company Size" tooltip="Number of employees">
                <Input placeholder="50-100" />
            </FormField>
            <FormField label="Company Website" tooltip="Your company's website URL">
                <Input type="url" placeholder="https://example.com" />
            </FormField>
        </div>
    </div>
);

const JobDetails: FC = () => (
    <div className="space-y-6">
        <h2 className="text-xl font-semibold">Job Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Job Title" tooltip="Your current or desired position">
                <Input placeholder="Software Engineer" />
            </FormField>
            <FormField label="Department" tooltip="Which department will you work in">
                <Input placeholder="Engineering" />
            </FormField>
            <FormField label="Experience Level" tooltip="Years of relevant experience">
                <Input placeholder="5+ years" />
            </FormField>
            <FormField label="Expected Salary" tooltip="Your salary expectations">
                <Input placeholder="$100,000" />
            </FormField>
        </div>
    </div>
);

const Confirmation: FC = () => (
    <div className="space-y-6">
        <h2 className="text-xl font-semibold">Review Your Information</h2>
        <div className="space-y-4">
            <p className="text-muted-foreground">
                Please review your information before submitting. You will not be able to edit this information after
                submission.
            </p>
            <div className="rounded-lg border p-6 space-y-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <span className="text-muted-foreground">Name:</span>
                    <span>John Doe</span>
                    <span className="text-muted-foreground">Email:</span>
                    <span>john.doe@example.com</span>
                    <span className="text-muted-foreground">Company:</span>
                    <span>Acme Inc.</span>
                    <span className="text-muted-foreground">Position:</span>
                    <span>Software Engineer</span>
                </div>
            </div>
        </div>
    </div>
);

const steps: Step[] = [
    { title: 'Basic Information', icon: User, component: PersonalInfo, color: 'personal' },
    { title: 'Company Details', icon: Building, component: CompanyDetails, color: 'company' },
    { title: 'Job Details', icon: Briefcase, component: JobDetails, color: 'job' },
    { title: 'Confirmation', icon: Send, component: Confirmation, color: 'confirmation' },
];

const StepIndicator: FC<StepIndicatorProps> = ({ step, index, currentStep, totalSteps }) => {
    const isComplete = index < currentStep;
    const isActive = index === currentStep;
    const stepColor = stepColors[step.color];

    return (
        <div className="flex items-center">
            <div
                className={cn(
                    'flex items-center transition-all duration-500 relative',
                    isActive && 'animate-stepExpand pl-0',
                    isActive && 'rounded-full pr-4 shadow-lg animate-pulseLight'
                )}
                style={
                    isActive
                        ? {
                              backgroundColor: stepColor.light,
                              borderWidth: '2px',
                              borderStyle: 'solid',
                              borderColor: stepColor.border,
                              borderLeftWidth: 0, // Remove left border
                              paddingLeft: '0', // Remove left padding
                              height: '44px', // Match height with the icon circle (40px + 2px border top/bottom)
                          }
                        : undefined
                }
            >
                <div
                    className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500',
                        isComplete && 'bg-emerald-100 text-emerald-600 animate-checkmark',
                        isActive && 'text-white animate-iconPop',
                        !isComplete && !isActive && 'bg-gray-100 text-gray-400',
                        // Add positioning classes
                        isActive && 'relative -ml-[2px]' // Offset by border width to align perfectly
                    )}
                    style={
                        isActive
                            ? {
                                  backgroundColor: stepColor.base,
                              }
                            : undefined
                    }
                >
                    <div className={cn('transition-transform duration-300', isActive && 'animate-iconSpin')}>
                        {isComplete ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                    </div>
                </div>

                {isActive && (
                    <div className="ml-3 overflow-hidden">
                        <div className="animate-slideIn">
                            <p className="text-sm text-muted-foreground">
                                Step {index + 1} of {totalSteps}
                            </p>
                            <p className="font-medium">{step.title}</p>
                        </div>
                    </div>
                )}
            </div>

            {index < totalSteps - 1 && (
                <div
                    className={cn('h-[2px] w-8 mx-2 transition-all duration-500')}
                    style={{
                        backgroundColor:
                            index < currentStep ? stepColors[steps[index + 1].color].border : 'rgb(229 231 235)', // gray-200
                    }}
                />
            )}
        </div>
    );
};

const MultiStepForm: FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const CurrentStepComponent = steps[currentStep].component;

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep((curr) => curr + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep((curr) => curr - 1);
        }
    };

    return (
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
            <section className="w-full bg-card text-card-foreground rounded-xl shadow-lg p-8 sm:p-10 lg:p-14 min-h-[800px] flex flex-col border">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-14">
                    {/* Step Title */}
                    <h1 className="text-2xl sm:text-3xl font-bold shrink-0">{steps[currentStep].title}</h1>

                    {/* Step Indicators */}
                    <nav className="w-full lg:w-auto" aria-label="Form Steps">
                        <div className="flex items-center justify-between">
                            {steps.map((step, index) => (
                                <StepIndicator
                                    key={index}
                                    step={step}
                                    index={index}
                                    currentStep={currentStep}
                                    totalSteps={steps.length}
                                />
                            ))}
                        </div>
                    </nav>
                </div>

                {/* Form Content */}
                <main className="flex-1 mb-10">
                    <CurrentStepComponent />
                </main>

                {/* Navigation Buttons */}
                <footer className="flex justify-between pt-8 border-t">
                    <Button variant="secondary" onClick={handlePrevious} disabled={currentStep === 0}>
                        Previous
                    </Button>
                    <Button onClick={handleNext} disabled={currentStep === steps.length - 1}>
                        {currentStep === steps.length - 2 ? 'Finish' : 'Next'}
                    </Button>
                </footer>
            </section>
        </div>
    );
};

export default MultiStepForm;

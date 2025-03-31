import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
    BanknoteIcon,
    Briefcase,
    Calendar as CalendarIcon,
    Check, // Add this import
    HelpCircle,
    LucideIcon,
    MapPin,
} from 'lucide-react';
import { FC, useState } from 'react';

import LocationImage from '@/assets/multi-step-form/location.png';
import PaymentImage from '@/assets/multi-step-form/payment.png';
import ScheduleImage from '@/assets/multi-step-form/schedule.png';

import FormIllustration from '@/components/ui/form-illustration';

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
        base: 'rgb(var(--color-amber-500))', // Orange/Amber
        light: 'rgb(var(--color-amber-50))',
        border: 'rgb(var(--color-amber-200))',
    },
    compensation: {
        // Updated name
        base: 'rgb(var(--color-rose-500))', // Soft Red (Rose)
        light: 'rgb(var(--color-rose-50))',
        border: 'rgb(var(--color-rose-200))',
    },
};

interface Step {
    title: string;
    icon: LucideIcon;
    component: FC;
    color: 'personal' | 'company' | 'job' | 'compensation'; // Updated type
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Form Fields */}
        <div className="space-y-6">
            <p className="text-muted-foreground pb-3.5">
                Preencha os detalhes básicos do trabalho que você está oferecendo.
            </p>

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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    label="Área de trabalho"
                    tooltip="A categoria que melhor se adequa às tarefas dos colaboradores"
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
                                <strong>Personalizado</strong> - Especifique dias e horários
                            </p>
                            <p>
                                <strong>Recorrente semanalmente</strong> - Horário semanal fixo
                            </p>
                            <p>
                                <strong>Full-time</strong> - 35h+ por semana
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

            <div className="col-span-full">
                <FormField label="Descrição do trabalho" tooltip="Mencione todas as tarefas e requisitos necessários">
                    <Textarea
                        placeholder="Descreva as responsabilidades e requisitos do trabalho..."
                        className="min-h-[120px] max-h-[200px] resize-y"
                        style={{ resize: 'vertical' }}
                    />
                </FormField>
            </div>
        </div>

        <FormIllustration
            imageUrl="https://img.freepik.com/free-vector/man-search-hiring-job-online-from-laptop_1150-52728.jpg"
            altText="Job Search Illustration"
            tip="Uma boa descrição aumenta suas chances de encontrar os melhores candidatos"
        />
    </div>
);

const CompanyDetails: FC = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Form Fields */}
        <div className="space-y-6">
            <p className="text-muted-foreground pb-3.5">
                Defina onde o trabalho será realizado e as restrições geográficas.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Tipologia do Trabalho" tooltip="Selecione se o trabalho é presencial ou remoto">
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecionar" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="select">Selecionar</SelectItem>
                            <SelectItem value="local">Local</SelectItem>
                            <SelectItem value="remoto">Remoto</SelectItem>
                        </SelectContent>
                    </Select>
                </FormField>

                <FormField label="Distrito" tooltip="Selecione o distrito onde o trabalho será realizado">
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecionar distrito" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="aveiro">Aveiro</SelectItem>
                            <SelectItem value="beja">Beja</SelectItem>
                            <SelectItem value="braga">Braga</SelectItem>
                            <SelectItem value="braganca">Bragança</SelectItem>
                            <SelectItem value="castelo-branco">Castelo Branco</SelectItem>
                            <SelectItem value="coimbra">Coimbra</SelectItem>
                            <SelectItem value="evora">Évora</SelectItem>
                            <SelectItem value="faro">Faro</SelectItem>
                            <SelectItem value="guarda">Guarda</SelectItem>
                            <SelectItem value="leiria">Leiria</SelectItem>
                            <SelectItem value="lisboa">Lisboa</SelectItem>
                            <SelectItem value="portalegre">Portalegre</SelectItem>
                            <SelectItem value="porto">Porto</SelectItem>
                            <SelectItem value="santarem">Santarém</SelectItem>
                            <SelectItem value="setubal">Setúbal</SelectItem>
                            <SelectItem value="viana-do-castelo">Viana do Castelo</SelectItem>
                            <SelectItem value="vila-real">Vila Real</SelectItem>
                            <SelectItem value="viseu">Viseu</SelectItem>
                        </SelectContent>
                    </Select>
                </FormField>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <FormField label="Morada do Trabalho" tooltip="Endereço onde o trabalho será realizado">
                    <Input placeholder="Ex: Rua do Comércio, 123" />
                </FormField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    label="Raio de Geolocalização"
                    tooltip="O quão perto o colaborador precisa estar da localização especificada para realizar clock-in/clock-out"
                >
                    <Input
                        type="number"
                        placeholder="Ex: 100"
                        min="0"
                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </FormField>
            </div>
        </div>

        <FormIllustration
            imageUrl={LocationImage}
            altText="Location Planning Illustration"
            tip="Defina um raio adequado considerando a área do local de trabalho"
        />
    </div>
);

const JobDetails: FC = () => {
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left side - Form Fields */}
            <div className="space-y-6">
                <p className="text-muted-foreground pb-3.5">
                    Defina o horário exatamente como deseja que seja apresentado aos candidatos.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="Data de Início" tooltip="Data em que o trabalho começa">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        'w-full justify-start text-left font-normal dark:bg-input/30',
                                        !startDate && 'text-muted-foreground'
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {startDate ? (
                                        format(startDate, 'PPP', { locale: ptBR })
                                    ) : (
                                        <span>Selecionar data</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={startDate}
                                    onSelect={setStartDate}
                                    initialFocus
                                    locale={ptBR}
                                />
                            </PopoverContent>
                        </Popover>
                    </FormField>

                    <FormField label="Data de Fim" tooltip="Data em que o trabalho termina">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        'w-full justify-start text-left font-normal dark:bg-input/30',
                                        !endDate && 'text-muted-foreground'
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {endDate ? format(endDate, 'PPP', { locale: ptBR }) : <span>Selecionar data</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={endDate}
                                    onSelect={setEndDate}
                                    initialFocus
                                    locale={ptBR}
                                    disabled={(date) => (startDate ? date < startDate : false)}
                                />
                            </PopoverContent>
                        </Popover>
                    </FormField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        label="Número de Vagas"
                        tooltip="Quantidade de colaboradores necessários para esta posição. Este número será visível para os candidatos e ajudará a definir suas expectativas."
                    >
                        <Input
                            type="number"
                            placeholder="Ex: 2"
                            min="1"
                            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    </FormField>
                </div>
            </div>

            <FormIllustration
                imageUrl={ScheduleImage}
                altText="Schedule Planning Illustration"
                tip="Datas claras e número de vagas preciso ajudam a atrair os candidatos certos"
            />
        </div>
    );
};

const Compensation: FC = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Form Fields */}
        <div className="space-y-6">
            <p className="text-muted-foreground pb-3.5">
                Defina os detalhes de pagamento e benefícios oferecidos para esta posição.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Frequência de Pagamento">
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecionar" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="select">Selecionar</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="per-shift">Per Shift</SelectItem>
                            <SelectItem value="agreement">Agreement</SelectItem>
                        </SelectContent>
                    </Select>
                </FormField>

                <FormField label="Valor (€)">
                    <Input
                        type="number"
                        placeholder="Ex: 1000"
                        min="0"
                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </FormField>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <FormField
                    label="Benefícios"
                    tooltip="Aqui pode mencionar quaisquer benefícios extra que o colaborador possa receber"
                >
                    <Textarea
                        placeholder="Ex: Seguro de saúde, subsídio de alimentação..."
                        className="min-h-[120px] max-h-[200px] resize-y"
                        style={{ resize: 'vertical' }}
                    />
                </FormField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Método de pagamento" tooltip="Especifique aqui como pagará ao colaborador">
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecionar" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="unilinkr">Via Unilinkr (Automated Green Receipts)</SelectItem>
                            <SelectItem value="green-receipts">Green Receipts</SelectItem>
                            <SelectItem value="isolated-acts">Isolated Acts</SelectItem>
                            <SelectItem value="employment-contract">Employment Contract</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </FormField>

                <FormField label="Tipo de Candidatos">
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecionar" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="select">Select</SelectItem>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="teams-only">Teams only</SelectItem>
                        </SelectContent>
                    </Select>
                </FormField>
            </div>
        </div>

        <FormIllustration
            imageUrl={PaymentImage}
            altText="Compensation and Benefits Illustration"
            tip="Seja transparente sobre a remuneração e benefícios oferecidos"
        />
    </div>
);

const steps: Step[] = [
    { title: 'Informações Básicas', icon: Briefcase, component: PersonalInfo, color: 'personal' },
    { title: 'Localização', icon: MapPin, component: CompanyDetails, color: 'company' },
    { title: 'Horário & Vagas', icon: CalendarIcon, component: JobDetails, color: 'job' },
    { title: 'Remuneração', icon: BanknoteIcon, component: Compensation, color: 'compensation' }, // Updated name
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
                    isActive && 'rounded-full pr-6 shadow-lg animate-pulseLight' // increased right padding from pr-4 to pr-6
                )}
                style={
                    isActive
                        ? {
                              backgroundColor: stepColor.light,
                              borderWidth: '2px',
                              borderStyle: 'solid',
                              borderColor: stepColor.border,
                              borderLeftWidth: 0,
                              paddingLeft: '0',
                              height: '48px', // increased from 44px to 48px
                          }
                        : undefined
                }
            >
                <div
                    className={cn(
                        'w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500', // increased from w-10 h-10 to w-11 h-11
                        isComplete && 'bg-emerald-100 text-emerald-600 animate-checkmark',
                        isActive && 'text-white animate-iconPop',
                        !isComplete && !isActive && 'bg-gray-100 text-gray-400',
                        isActive && 'relative -ml-[2px]'
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
                        {isComplete ? <Check size={22} /> : <step.icon size={22} />}{' '}
                    </div>
                </div>

                {isActive && (
                    <div className="ml-4 overflow-hidden">
                        <div className="animate-slideIn">
                            <p className="text-sm text-muted-foreground">
                                Step {index + 1} / {totalSteps}
                            </p>
                            <p className="font-medium">{step.title}</p>
                        </div>
                    </div>
                )}
            </div>

            {index < totalSteps - 1 && (
                <div
                    className={cn('h-[2px] w-8 mx-3 transition-all duration-500')}
                    style={{
                        backgroundColor:
                            index < currentStep ? stepColors[steps[index + 1].color].border : 'rgb(229 231 235)',
                    }}
                />
            )}
        </div>
    );
};

const MultiStepForm: FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
    const [isAnimating, setIsAnimating] = useState(false);
    const [displayedStep, setDisplayedStep] = useState(currentStep);
    const [displayedTitle, setDisplayedTitle] = useState(steps[currentStep].title);
    const CurrentStepComponent = steps[displayedStep].component;

    const handleNext = () => {
        if (currentStep < steps.length - 1 && !isAnimating) {
            setDirection('forward');
            setIsAnimating(true);

            setTimeout(() => {
                setDisplayedStep(currentStep + 1);
                setDisplayedTitle(steps[currentStep + 1].title);
                setCurrentStep(currentStep + 1);
                setIsAnimating(false);
            }, 200);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0 && !isAnimating) {
            setDirection('backward');
            setIsAnimating(true);

            setTimeout(() => {
                setDisplayedStep(currentStep - 1);
                setDisplayedTitle(steps[currentStep - 1].title);
                setCurrentStep(currentStep - 1);
                setIsAnimating(false);
            }, 200);
        }
    };

    return (
        <section className="w-full bg-background text-card-foreground rounded-xl shadow-lg p-6 sm:p-8 lg:p-14 min-h-[750px] flex flex-col border relative z-10 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-14">
                <div className="relative h-[2.25rem] sm:h-[2.5rem]">
                    <h1
                        key={displayedTitle}
                        className={cn(
                            'text-2xl sm:text-3xl font-bold shrink-0  w-full',
                            isAnimating ? 'animate-fade-out-up' : 'animate-fade-in-up'
                        )}
                    >
                        {displayedTitle}
                    </h1>
                </div>

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

            {/* Form Content with Animation */}
            <main className="flex-1 relative">
                <div
                    key={displayedStep}
                    className={cn(
                        'absolute w-full transition-all duration-200',
                        isAnimating
                            ? direction === 'forward'
                                ? 'animate-fade-out-left'
                                : 'animate-fade-out-right'
                            : direction === 'forward'
                            ? 'animate-fade-in-right'
                            : 'animate-fade-in-left'
                    )}
                >
                    <CurrentStepComponent />
                </div>
            </main>

            {/* Navigation Buttons */}
            <footer className="flex justify-between pt-8 border-t">
                <Button variant="secondary" onClick={handlePrevious} disabled={currentStep === 0 || isAnimating}>
                    Previous
                </Button>
                <Button onClick={handleNext} disabled={currentStep === steps.length - 1 || isAnimating}>
                    {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
            </footer>
        </section>
    );
};

export default MultiStepForm;

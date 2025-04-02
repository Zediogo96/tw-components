import SummaryView from '@/components/multi-step-form/steps/summary-view';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, RotateCcw, Send } from 'lucide-react';
import { FC, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { defaultJobFormData, steps } from './constants';
import { StepIndicator } from './step-indicator';
import { JobFormData } from './types';

const MultiStepForm: FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
    const [isAnimating, setIsAnimating] = useState(false);
    const [displayedStep, setDisplayedStep] = useState(currentStep);
    const [displayedTitle, setDisplayedTitle] = useState(steps[currentStep].title);
    const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
    const [showingSummary, setShowingSummary] = useState(false);

    const methods = useForm<JobFormData>({
        defaultValues: defaultJobFormData,
        mode: 'onChange',
    });

    const handleReset = () => {
        methods.reset(defaultJobFormData);
        setDirection('backward');
        setIsAnimating(true);
        setTimeout(() => {
            setDisplayedStep(0);
            setDisplayedTitle(steps[0].title);
            setCurrentStep(0);
            setIsAnimating(false);
        }, 200);
        setIsResetDialogOpen(false);
    };

    const CurrentStepComponent = steps[displayedStep].component;

    const handleNext = async () => {
        const isValid = await methods.trigger();

        if (!isValid) {
            // Show error message or handle invalid form
            return;
        }

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

    const navigateToStep = async (stepIndex: number) => {
        // Don't do anything if we're already animating
        if (isAnimating) return;

        // Validate all fields up to the target step
        const fieldsToValidate = steps.slice(0, stepIndex).flatMap((step) => {
            // You'll need to define which fields belong to each step
            switch (step.color) {
                case 'personal':
                    return ['jobTitle', 'workArea', 'specialization', 'scheduleType'];
                case 'company':
                    return ['workType', 'district', 'workAddress'];
                case 'job':
                    return ['startDate', 'endDate', 'numberOfPositions'];
                case 'compensation':
                    return ['paymentFrequency', 'paymentMethod'];
                default:
                    return [];
            }
        });

        const isValid = await methods.trigger(fieldsToValidate as (keyof JobFormData)[]);

        if (!isValid) {
            // Show error message or handle invalid form
            return;
        }

        // Determine animation direction
        const newDirection = stepIndex > currentStep ? 'forward' : 'backward';
        setDirection(newDirection);
        setIsAnimating(true);

        setTimeout(() => {
            setDisplayedStep(stepIndex);
            setDisplayedTitle(steps[stepIndex].title);
            setCurrentStep(stepIndex);
            setIsAnimating(false);
        }, 200);
    };

    const onSubmit = (data: JobFormData) => {
        console.log('Form submitted:', data);
        // Handle form submission
    };

    const renderFooterButtons = () => {
        if (currentStep === steps.length - 1) {
            if (showingSummary) {
                return (
                    <>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowingSummary(false)}
                            disabled={isAnimating}
                            className="gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Voltar para edição</span>
                        </Button>
                        <Button type="submit" disabled={isAnimating} className="gap-2">
                            <span>Confirmar e Publicar</span>
                            <Send className="w-4 h-4" />
                        </Button>
                    </>
                );
            }
            return (
                <Button type="button" onClick={() => setShowingSummary(true)} disabled={isAnimating} className="gap-2">
                    <span>Rever e Publicar</span>
                    <ArrowRight className="w-4 h-4" />
                </Button>
            );
        }

        return (
            <Button type="button" onClick={handleNext} disabled={isAnimating} className="gap-2">
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
            </Button>
        );
    };

    // Update the title logic
    const getDisplayTitle = () => {
        if (currentStep === steps.length - 1 && showingSummary) {
            return 'Revisão da Vaga';
        }
        return steps[currentStep].title;
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="w-full min-h-[100dvh] md:min-h-0 flex items-center justify-center py-4 px-4 md:py-8 md:px-6"
            >
                <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Resetar formulário?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Esta ação não pode ser desfeita. Todos os dados preenchidos serão perdidos e você
                                voltará para o primeiro passo.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={handleReset}>Continuar</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <section className="w-full md:w-auto max-w-[95vw] md:max-w-7xl bg-background text-card-foreground rounded-xl p-3 sm:p-4 lg:p-14 flex flex-col border relative z-10 backdrop-blur-sm shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]">
                    <div className="flex flex-col-reverse lg:flex-row justify-between items-start gap-8 mb-4 md:mb-14">
                        <div className="relative h-[2.25rem] sm:h-[2.5rem]">
                            <h1
                                key={displayedTitle}
                                className={cn(
                                    'text-3xl md:text-4xl font-bold shrink-0 w-full',
                                    isAnimating ? 'animate-fade-out-up' : 'animate-fade-in-up'
                                )}
                            >
                                {getDisplayTitle()}
                            </h1>
                        </div>

                        {/* Only show step indicator if not in summary view */}
                        {!(currentStep === steps.length - 1 && showingSummary) && (
                            <nav className="w-full lg:w-auto" aria-label="Form Steps">
                                <div className="flex items-center justify-between">
                                    {steps.map((step, index) => (
                                        <StepIndicator
                                            key={index}
                                            step={step}
                                            index={index}
                                            currentStep={currentStep}
                                            totalSteps={steps.length}
                                            onStepClick={navigateToStep}
                                        />
                                    ))}
                                </div>
                            </nav>
                        )}
                    </div>

                    <main className="flex-1 md:pd-4">
                        <div
                            key={displayedStep}
                            className={cn(
                                'w-full transition-all duration-200',
                                isAnimating
                                    ? direction === 'forward'
                                        ? 'animate-fade-out-left'
                                        : 'animate-fade-out-right'
                                    : direction === 'forward'
                                    ? 'animate-fade-in-right'
                                    : 'animate-fade-in-left'
                            )}
                        >
                            {currentStep === steps.length - 1 && showingSummary ? (
                                <SummaryView />
                            ) : (
                                <CurrentStepComponent />
                            )}
                        </div>
                    </main>

                    <footer className="flex flex-row items-center justify-between gap-4 md:gap-0 pt-8 border-t mt-8">
                        <div className="flex justify-start md:w-auto">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={handlePrevious}
                                disabled={currentStep === 0 || isAnimating || showingSummary}
                                className="gap-2"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                <span>Previous</span>
                            </Button>
                        </div>

                        <div className="flex items-center justify-end gap-2 sm:gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsResetDialogOpen(true)}
                                disabled={isAnimating}
                                className="gap-2"
                                aria-label="Reset Form"
                            >
                                <RotateCcw className="w-4 h-4" />
                                <span className="hidden sm:inline">Reset Form</span>
                            </Button>

                            {renderFooterButtons()}
                        </div>
                    </footer>
                </section>
            </form>
        </FormProvider>
    );
};

export default MultiStepForm;

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FC, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { defaultJobFormData, steps } from './constants';
import { StepIndicator } from './step-indicator';
import { JobFormData } from './types';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';

const MultiStepForm: FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
    const [isAnimating, setIsAnimating] = useState(false);
    const [displayedStep, setDisplayedStep] = useState(currentStep);
    const [displayedTitle, setDisplayedTitle] = useState(steps[currentStep].title);

    const methods = useForm<JobFormData>({
        defaultValues: defaultJobFormData,
        mode: 'onChange', // This will validate the form on every change
    });

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

    const onSubmit = (data: JobFormData) => {
        console.log('Form submitted:', data);
        // Handle form submission
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
                <section className="w-full bg-background text-card-foreground rounded-xl p-6 sm:p-8 lg:p-14 min-h-[750px] flex flex-col border relative z-10 backdrop-blur-sm shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]">
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
                    <footer className="flex items-center justify-between pt-8 border-t">
                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={handlePrevious}
                                disabled={currentStep === 0 || isAnimating}
                                className="gap-2"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Previous
                            </Button>
                        </div>

                        <div className="flex items-center gap-4">
                            {currentStep < steps.length - 1 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => methods.reset()}
                                    disabled={isAnimating}
                                >
                                    Clear Form
                                </Button>
                            )}

                            {currentStep === steps.length - 1 ? (
                                <Button type="submit" disabled={isAnimating} className="gap-2">
                                    Submit Form
                                    <Send className="w-4 h-4" />
                                </Button>
                            ) : (
                                <Button type="button" onClick={handleNext} disabled={isAnimating} className="gap-2">
                                    Next
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                    </footer>
                </section>
            </form>
        </FormProvider>
    );
};

export default MultiStepForm;

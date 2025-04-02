import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { FC } from 'react';
import { stepColors, steps } from './constants';
import { Step } from './types';

interface StepIndicatorProps {
    step: Step;
    index: number;
    currentStep: number;
    totalSteps: number;
    onStepClick: (index: number) => void;
}

export const StepIndicator: FC<StepIndicatorProps> = ({ step, index, currentStep, totalSteps, onStepClick }) => {
    const isComplete = index < currentStep;
    const isActive = index === currentStep;
    const stepColor = stepColors[step.color];

    const handleClick = () => {
        // Only allow clicking on completed steps or the next available step
        if (index <= currentStep + 1 && !isActive) {
            onStepClick(index);
        }
    };

    return (
        <div className="flex items-center flex-col mt-5 md:flex-row">
            <div
                onClick={handleClick}
                className={cn(
                    'flex items-center transition-all duration-500 relative',
                    'w-full md:w-auto',
                    isActive && 'animate-stepExpand pl-0',
                    isActive && 'rounded-full pr-2 md:pr-8 shadow-lg animate-pulseLight',
                    // Add cursor styles based on clickability
                    index <= currentStep + 1 && !isActive ? 'cursor-pointer' : 'cursor-default',
                    // Optional: Add hover effect for clickable steps
                    index <= currentStep + 1 && !isActive && 'hover:opacity-80'
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
                              height: '48px', // Base height for mobile
                          }
                        : undefined
                }
            >
                <div
                    className={cn(
                        'w-10 h-10 md:w-[52px] md:h-[52px] rounded-full flex items-center justify-center',
                        'transition-all duration-300 ease-out',
                        'group cursor-pointer',
                        'hover:shadow-md',
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
                    {/* Icon container */}
                    <div className={cn('relative', 'transition-all duration-200', 'group-hover:animate-micro-bounce')}>
                        <div
                            className={cn(
                                'transition-all duration-300',
                                'group-hover:scale-110 group-hover:rotate-[12deg]',
                                isActive && 'animate-iconSpin'
                            )}
                        >
                            {isComplete ? (
                                <Check
                                    size={20} // Smaller for mobile
                                    className={cn(
                                        'transition-all duration-300 md:h-6 md:w-6',
                                        'group-hover:text-emerald-400',
                                        'group-hover:animate-micro-wiggle'
                                    )}
                                />
                            ) : (
                                <step.icon
                                    size={20} // Smaller for mobile
                                    className={cn(
                                        'transition-all duration-300 md:h-6 md:w-6',
                                        'group-hover:text-primary/90',
                                        'group-hover:animate-micro-wiggle'
                                    )}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {isActive && (
                    <div className="ml-2 md:ml-5 overflow-hidden relative">
                        <div className="animate-slideIn">
                            <p className="text-xs md:text-sm text-muted-foreground">
                                Step {index + 1} / {totalSteps}
                            </p>
                            <p className="text-sm md:text-base font-medium">{step.title}</p>
                        </div>
                    </div>
                )}
            </div>

            {index < totalSteps - 1 && (
                <div
                    className={cn(
                        'h-[2px] w-4 md:w-8 mx-2 md:mx-4',
                        'transition-all duration-500 hidden md:block',
                        'group-hover:bg-primary/20'
                    )}
                    style={{
                        backgroundColor:
                            index < currentStep ? stepColors[steps[index + 1].color].border : 'rgb(229 231 235)',
                    }}
                />
            )}
        </div>
    );
};

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
}

export const StepIndicator: FC<StepIndicatorProps> = ({ step, index, currentStep, totalSteps }) => {
    const isComplete = index < currentStep;
    const isActive = index === currentStep;
    const stepColor = stepColors[step.color];

    return (
        <div className="flex items-center">
            <div
                className={cn(
                    'flex items-center transition-all duration-500 relative',
                    isActive && 'animate-stepExpand pl-0',
                    isActive && 'rounded-full pr-8 shadow-lg animate-pulseLight'
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
                              height: '56px', // Increased from 48px
                          }
                        : undefined
                }
            >
                <div
                    className={cn(
                        'w-[52px] h-[52px] rounded-full flex items-center justify-center', // Increased from w-11 h-11 (44px)
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
                    {/* Background spotlight effect */}
                    <div
                        className={cn(
                            'absolute inset-0 rounded-full opacity-0',
                            'bg-white/10',
                            'transition-opacity duration-300',
                            'group-hover:opacity-100',
                            'group-hover:animate-spotlight-pulse'
                        )}
                    />

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
                                    size={24} // Increased from 22
                                    className={cn(
                                        'transition-all duration-300',
                                        'group-hover:text-emerald-400',
                                        'group-hover:animate-micro-wiggle'
                                    )}
                                />
                            ) : (
                                <step.icon
                                    size={24} // Increased from 22
                                    className={cn(
                                        'transition-all duration-300',
                                        'group-hover:text-primary/90',
                                        'group-hover:animate-micro-wiggle'
                                    )}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {isActive && (
                    <div className="ml-5 overflow-hidden relative">
                        {' '}
                        {/* Increased from ml-4 */}
                        {/* Gradient border container */}
                        <div className="relative">
                            {/* Content container */}
                            <div className="relative  rounded-lg p-2.5">
                                {/* Increased from p-2 */}
                                <div className="animate-slideIn">
                                    <p className="text-sm text-muted-foreground">
                                        Step {index + 1} / {totalSteps}
                                    </p>
                                    <p className="font-medium">{step.title}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {index < totalSteps - 1 && (
                <div
                    className={cn(
                        'h-[2px] w-8 mx-4', // Increased from mx-3
                        'transition-all duration-500',
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

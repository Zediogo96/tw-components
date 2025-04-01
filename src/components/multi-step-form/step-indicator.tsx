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

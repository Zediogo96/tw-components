import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';
import { HelpCircle } from 'lucide-react';
import { FC, ReactNode } from 'react';

interface FormFieldProps {
    label: string;
    tooltip?: ReactNode;
    children: ReactNode;
    required?: boolean;
    error?: string;
}

export const FormField: FC<FormFieldProps> = ({ label, tooltip, children, required, error }) => (
    <div className="space-y-2">
        <div className="flex items-center gap-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
            </label>
            {tooltip && (
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <div className="cursor-help">
                            <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                        <div className="space-y-2 text-sm">{tooltip}</div>
                    </HoverCardContent>
                </HoverCard>
            )}
        </div>
        <div className={cn('transition-all duration-300', error && 'animate-shake')}>{children}</div>
        {error && <p className="text-sm text-destructive animate-fade-in-up">{error}</p>}
    </div>
);

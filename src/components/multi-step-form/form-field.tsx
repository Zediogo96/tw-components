import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { HelpCircle } from 'lucide-react';
import { FC, ReactNode } from 'react';

interface FormFieldProps {
    label: string;
    tooltip?: ReactNode;
    tooltipContent?: ReactNode;
    children: ReactNode;
}

export const FormField: FC<FormFieldProps> = ({ label, tooltip, tooltipContent, children }) => (
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

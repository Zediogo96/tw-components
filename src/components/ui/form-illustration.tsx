import { cn } from '@/lib/utils';
import { LightbulbIcon } from 'lucide-react';
import { FC } from 'react';

interface FormIllustrationProps {
    imageUrl: string;
    altText: string;
    tip: string;
    className?: string;
}

const FormIllustration: FC<FormIllustrationProps> = ({ imageUrl, altText, tip, className }) => {
    return (
        <div className="relative hidden lg:block">
            <div className="sticky top-8 space-y-4">
                <div
                    className={cn(
                        'relative rounded-2xl overflow-hidden h-[300px] shadow-[0_2px_8px_rgb(0,0,0,0.06)] backdrop-blur-sm',
                        className
                    )}
                >
                    <img src={imageUrl} alt={altText} className="w-full h-full object-contain bg-background/30" />
                </div>

                {/* Tip Message */}
                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <LightbulbIcon className="h-4 w-4 text-primary" color="orange" />
                        <p>{tip}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormIllustration;

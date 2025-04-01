import ScheduleImage from '@/assets/multi-step-form/schedule.png';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import FormIllustration from '@/components/ui/form-illustration';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { FC, useState } from 'react';
import { FormField } from '../form-field';

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

export default JobDetails;

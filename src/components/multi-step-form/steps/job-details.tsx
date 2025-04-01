import ScheduleImage from '@/assets/multi-step-form/schedule.png';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import FormIllustration from '@/components/ui/form-illustration';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format, isBefore, isEqual, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormField } from '../form-field';
import { JobFormData } from '../types';

const JobDetails: FC = () => {
    const {
        control,
        watch,
        formState: { errors },
    } = useFormContext<JobFormData>();

    const startDate = watch('startDate');
    const today = startOfDay(new Date());

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left side - Form Fields */}
            <div className="space-y-6">
                <p className="text-muted-foreground pb-3.5">
                    Defina o horário exatamente como deseja que seja apresentado aos candidatos.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        required
                        label="Data de Início"
                        tooltip="Data em que o trabalho começa"
                        error={errors.startDate?.message}
                    >
                        <Controller
                            name="startDate"
                            control={control}
                            rules={{
                                required: 'Data de início é obrigatória',
                                validate: {
                                    notPast: (date) =>
                                        (isBefore(today, date) || isEqual(today, date)) ||
                                        'Data de início deve ser hoje ou uma data futura'
                                }
                            }}
                            render={({ field }) => (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                'w-full justify-start text-left font-normal dark:bg-input/30',
                                                !field.value && 'text-muted-foreground'
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {field.value ? (
                                                format(field.value, 'PPP', { locale: ptBR })
                                            ) : (
                                                <span>Selecionar data</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            initialFocus
                                            locale={ptBR}
                                            disabled={(date) => isBefore(date, today)}
                                        />
                                    </PopoverContent>
                                </Popover>
                            )}
                        />
                    </FormField>

                    <FormField
                        required
                        label="Data de Fim"
                        tooltip="Data em que o trabalho termina"
                        error={errors.endDate?.message}
                    >
                        <Controller
                            name="endDate"
                            control={control}
                            rules={{
                                required: 'Data de fim é obrigatória',
                                validate: {
                                    afterStart: (date) =>
                                        !startDate || isBefore(startDate, date) ||
                                        'Data de fim deve ser posterior à data de início'
                                }
                            }}
                            render={({ field }) => (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                'w-full justify-start text-left font-normal dark:bg-input/30',
                                                !field.value && 'text-muted-foreground'
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {field.value ? (
                                                format(field.value, 'PPP', { locale: ptBR })
                                            ) : (
                                                <span>Selecionar data</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            initialFocus
                                            locale={ptBR}
                                            disabled={(date) => startDate ? isBefore(date, startDate) : false}
                                        />
                                    </PopoverContent>
                                </Popover>
                            )}
                        />
                    </FormField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        required
                        label="Número de Vagas"
                        tooltip="Quantidade de colaboradores necessários para esta posição. Este número será visível para os candidatos e ajudará a definir suas expectativas."
                        error={errors.numberOfPositions?.message}
                    >
                        <Controller
                            name="numberOfPositions"
                            control={control}
                            defaultValue={1}
                            rules={{
                                required: 'Número de vagas é obrigatório',
                                min: {
                                    value: 1,
                                    message: 'Deve haver pelo menos 1 vaga'
                                },
                                max: {
                                    value: 999,
                                    message: 'Número máximo de vagas é 999'
                                }
                            }}
                            render={({ field }) => (
                                <Input
                                    type="number"
                                    placeholder="Ex: 2"
                                    min="1"
                                    max="999"
                                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                />
                            )}
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

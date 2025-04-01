import PaymentImage from '@/assets/multi-step-form/payment.png';
import FormIllustration from '@/components/ui/form-illustration';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormField } from '../form-field';
import { JobFormData } from '../types';

const Compensation: FC = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext<JobFormData>();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left side - Form Fields */}
            <div className="space-y-6">
                <p className="text-muted-foreground pb-3.5">
                    Defina os detalhes de pagamento e benefícios oferecidos para esta posição.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        required
                        label="Frequência de Pagamento"
                        tooltip="Como o pagamento será realizado"
                        error={errors.paymentFrequency?.message}
                    >
                        <Controller
                            name="paymentFrequency"
                            control={control}
                            rules={{ required: 'Frequência de pagamento é obrigatória' }}
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecionar frequência" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="monthly">Mensal</SelectItem>
                                        <SelectItem value="hourly">Por Hora</SelectItem>
                                        <SelectItem value="per-shift">Por Turno</SelectItem>
                                        <SelectItem value="agreement">A Combinar</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </FormField>

                    <FormField
                        required
                        label="Salário"
                        tooltip="Valor da remuneração"
                        error={errors.salary?.message}
                    >
                        <Controller
                            name="salary"
                            control={control}
                            rules={{
                                required: 'Salário é obrigatório',
                                min: {
                                    value: 0,
                                    message: 'Salário deve ser maior que 0'
                                },
                                max: {
                                    value: 999999,
                                    message: 'Valor máximo excedido'
                                }
                            }}
                            render={({ field }) => (
                                <Input
                                    type="number"
                                    placeholder="Ex: 1200"
                                    min="0"
                                    max="999999"
                                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                />
                            )}
                        />
                    </FormField>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <FormField
                        required
                        label="Benefícios"
                        tooltip="Liste os benefícios oferecidos"
                        error={errors.benefits?.message}
                    >
                        <Controller
                            name="benefits"
                            control={control}
                            rules={{
                                required: 'Benefícios são obrigatórios',
                                minLength: {
                                    value: 10,
                                    message: 'Descreva os benefícios com pelo menos 10 caracteres'
                                }
                            }}
                            render={({ field }) => (
                                <Textarea
                                    placeholder="Ex: Vale refeição, Vale transporte, Plano de saúde..."
                                    className="min-h-[100px] resize-none"
                                    {...field}
                                />
                            )}
                        />
                    </FormField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        required
                        label="Método de Pagamento"
                        tooltip="Como o pagamento será processado"
                        error={errors.paymentMethod?.message}
                    >
                        <Controller
                            name="paymentMethod"
                            control={control}
                            rules={{ required: 'Método de pagamento é obrigatório' }}
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecionar método" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="unilinkr">Unilinkr</SelectItem>
                                        <SelectItem value="green-receipts">Recibos Verdes</SelectItem>
                                        <SelectItem value="isolated-acts">Atos Isolados</SelectItem>
                                        <SelectItem value="employment-contract">Contrato de Trabalho</SelectItem>
                                        <SelectItem value="other">Outro</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </FormField>

                    <FormField
                        required
                        label="Tipo de Candidato"
                        tooltip="Quem pode se candidatar a esta vaga"
                        error={errors.candidateType?.message}
                    >
                        <Controller
                            name="candidateType"
                            control={control}
                            rules={{ required: 'Tipo de candidato é obrigatório' }}
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecionar tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="public">Público</SelectItem>
                                        <SelectItem value="teams-only">Apenas Equipas</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </FormField>
                </div>
            </div>

            <FormIllustration
                imageUrl={PaymentImage}
                altText="Payment Details Illustration"
                tip="Seja transparente sobre a remuneração e benefícios para atrair os melhores candidatos"
            />
        </div>
    );
};

export default Compensation;

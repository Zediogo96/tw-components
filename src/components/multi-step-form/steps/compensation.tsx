import PaymentImage from '@/assets/multi-step-form/payment.png';
import FormIllustration from '@/components/ui/form-illustration';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FC } from 'react';
import { FormField } from '../form-field';

const Compensation: FC = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Form Fields */}
        <div className="space-y-6">
            <p className="text-muted-foreground pb-3.5">
                Defina os detalhes de pagamento e benefícios oferecidos para esta posição.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Frequência de Pagamento">
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecionar" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="select">Selecionar</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="per-shift">Per Shift</SelectItem>
                            <SelectItem value="agreement">Agreement</SelectItem>
                        </SelectContent>
                    </Select>
                </FormField>

                <FormField label="Valor (€)">
                    <Input
                        type="number"
                        placeholder="Ex: 1000"
                        min="0"
                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </FormField>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <FormField
                    label="Benefícios"
                    tooltip="Aqui pode mencionar quaisquer benefícios extra que o colaborador possa receber"
                >
                    <Textarea
                        placeholder="Ex: Seguro de saúde, subsídio de alimentação..."
                        className="min-h-[120px] max-h-[200px] resize-y"
                        style={{ resize: 'vertical' }}
                    />
                </FormField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Método de pagamento" tooltip="Especifique aqui como pagará ao colaborador">
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecionar" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="unilinkr">Via Unilinkr (Automated Green Receipts)</SelectItem>
                            <SelectItem value="green-receipts">Green Receipts</SelectItem>
                            <SelectItem value="isolated-acts">Isolated Acts</SelectItem>
                            <SelectItem value="employment-contract">Employment Contract</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </FormField>

                <FormField label="Tipo de Candidatos">
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecionar" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="select">Select</SelectItem>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="teams-only">Teams only</SelectItem>
                        </SelectContent>
                    </Select>
                </FormField>
            </div>
        </div>

        <FormIllustration
            imageUrl={PaymentImage}
            altText="Compensation and Benefits Illustration"
            tip="Seja transparente sobre a remuneração e benefícios oferecidos"
        />
    </div>
);

export default Compensation;

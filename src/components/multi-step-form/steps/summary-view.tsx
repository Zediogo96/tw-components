import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { JobFormData } from '../types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
    Briefcase,
    MapPin,
    Calendar,
    BanknoteIcon,
    Building2,
    Clock,
    Users,
    Wallet,
    Receipt,
    Gift
} from 'lucide-react';
import { steps } from '../constants';

const SummaryView: FC = () => {
    const { watch } = useFormContext<JobFormData>();
    const formData = watch();

    const formatDate = (date: Date | undefined) => {
        if (!date) return 'Não definido';
        return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    };

    const formatCurrency = (value: number | undefined) => {
        if (!value) return '—';
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    const stepColors = {
        personal: 'text-blue-500',
        company: 'text-purple-500',
        job: 'text-orange-500',
        compensation: 'text-green-500',
    };

    return (
        <Tabs defaultValue="summary" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="summary">Detalhes da Vaga</TabsTrigger>
                <TabsTrigger value="preview">Visualização</TabsTrigger>
            </TabsList>

            <TabsContent value="summary">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Basic Info Section */}
                        <div className="rounded-lg border p-4 space-y-4">
                            <div className="flex items-center gap-2">
                                <Briefcase className={stepColors.personal} />
                                <h3 className="font-semibold">Informações Básicas</h3>
                            </div>
                            <div className="grid gap-3 text-sm">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Cargo</span>
                                    <span className="text-muted-foreground">{formData.jobTitle || '—'}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Área</span>
                                    <span className="text-muted-foreground">{formData.workArea || '—'}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Especialização</span>
                                    <span className="text-muted-foreground capitalize">{formData.specialization || '—'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Location Section */}
                        <div className="rounded-lg border p-4 space-y-4">
                            <div className="flex items-center gap-2">
                                <MapPin className={stepColors.company} />
                                <h3 className="font-semibold">Localização</h3>
                            </div>
                            <div className="grid gap-3 text-sm">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Tipo</span>
                                    <span className="text-muted-foreground capitalize">{formData.workType === 'local' ? 'Presencial' : 'Remoto'}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Endereço</span>
                                    <span className="text-muted-foreground text-right">{formData.workAddress || '—'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Schedule Section */}
                        <div className="rounded-lg border p-4 space-y-4">
                            <div className="flex items-center gap-2">
                                <Calendar className={stepColors.job} />
                                <h3 className="font-semibold">Horário & Vagas</h3>
                            </div>
                            <div className="grid gap-3 text-sm">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Início</span>
                                    <span className="text-muted-foreground">{formatDate(formData.startDate)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Término</span>
                                    <span className="text-muted-foreground">{formatDate(formData.endDate)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Vagas</span>
                                    <span className="text-muted-foreground">{formData.numberOfPositions}</span>
                                </div>
                            </div>
                        </div>

                        {/* Compensation Section */}
                        <div className="rounded-lg border p-4 space-y-4">
                            <div className="flex items-center gap-2">
                                <BanknoteIcon className={stepColors.compensation} />
                                <h3 className="font-semibold">Remuneração</h3>
                            </div>
                            <div className="grid gap-3 text-sm">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Frequência</span>
                                    <span className="text-muted-foreground capitalize">{formData.paymentFrequency || '—'}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Salário</span>
                                    <span className="text-muted-foreground">{formatCurrency(formData.salary)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Método</span>
                                    <span className="text-muted-foreground capitalize">{formData.paymentMethod || '—'}</span>
                                </div>
                                {formData.benefits && (
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">Benefícios</span>
                                        <span className="text-muted-foreground text-right">{formData.benefits}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="preview">
                <div className="flex items-center justify-center p-8">
                    <p className="text-muted-foreground">Visualização em desenvolvimento...</p>
                </div>
            </TabsContent>
        </Tabs>
    );
};

export default SummaryView;

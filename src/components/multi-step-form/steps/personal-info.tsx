import FormIllustration from '@/components/ui/form-illustration';
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FC } from 'react';
import { FormField } from '../form-field';

const PersonalInfo: FC = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Form Fields */}
        <div className="space-y-6">
            <p className="text-muted-foreground pb-3.5">
                Preencha os detalhes básicos do trabalho que você está oferecendo.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    label="Grau de especialização"
                    tooltipContent={
                        <div className="space-y-2">
                            <p>
                                <strong>Especializado</strong> - a formação do candidato importa
                            </p>
                            <p>
                                <strong>Não especializado</strong> - a formação do colaborador não importa
                            </p>
                        </div>
                    }
                >
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecionar" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="select">Selecionar</SelectItem>
                            <SelectItem value="specialized">Especializado</SelectItem>
                            <SelectItem value="non-specialized">Não Especializado</SelectItem>
                        </SelectContent>
                    </Select>
                </FormField>
                <FormField label="Titulo do Trabalho" tooltip="Título do trabalho visível para os candidatos">
                    <Input placeholder="Ex: Desenvolvedor Full Stack" />
                </FormField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    label="Área de trabalho"
                    tooltip="A categoria que melhor se adequa às tarefas dos colaboradores"
                >
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecionar área" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="comercial">Comercial</SelectItem>
                            <SelectItem value="empregado-mesa">Empregado de Mesa</SelectItem>
                            <SelectItem value="tecnico-saude">Tecnico de Saude</SelectItem>
                            <SelectItem value="explicacao">Explicação</SelectItem>
                            <SelectItem value="programacao">Programação</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="hospedeiro-evento">Hospedeiro em Evento</SelectItem>
                            <SelectItem value="motorista-driver">Motorista Driver</SelectItem>
                            <SelectItem value="operador-logistico">Operador Logístico</SelectItem>
                            <SelectItem value="promotor-vendas">Promotor de Vendas</SelectItem>
                            <SelectItem value="secretario">Secretário</SelectItem>
                            <SelectItem value="consultor">Consultor</SelectItem>
                            <SelectItem value="assistente">Assistente</SelectItem>
                            <SelectItem value="atendimento-publico">Atendimento ao Público</SelectItem>
                            <SelectItem value="restaurantes">Restaurantes</SelectItem>
                            <SelectItem value="balcao">Balcão</SelectItem>
                            <SelectItem value="fotografia-video">Fotografia e Vídeo</SelectItem>
                            <SelectItem value="ativacao-marca">Ativaçao de Marca</SelectItem>
                            <SelectItem value="administrativo">Administrativo</SelectItem>
                            <SelectItem value="personal-fitness">Personal Fitness</SelectItem>
                            <SelectItem value="catering">Catering</SelectItem>
                            <SelectItem value="hotelaria">Hotelaria</SelectItem>
                            <SelectItem value="retalho-alimentar">Retalho Alimentar</SelectItem>
                            <SelectItem value="retalho-moda">Retalho Moda</SelectItem>
                        </SelectContent>
                    </Select>
                </FormField>
                <FormField
                    label="Tipo de horário"
                    tooltipContent={
                        <div className="space-y-2">
                            <p>
                                <strong>Personalizado</strong> - Especifique dias e horários
                            </p>
                            <p>
                                <strong>Recorrente semanalmente</strong> - Horário semanal fixo
                            </p>
                            <p>
                                <strong>Full-time</strong> - 35h+ por semana
                            </p>
                        </div>
                    }
                >
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="full-time">Full time</SelectItem>
                            <SelectItem value="semanal">Semanal</SelectItem>
                            <SelectItem value="personalizado">Personalizado</SelectItem>
                        </SelectContent>
                    </Select>
                </FormField>
            </div>

            <div className="col-span-full">
                <FormField label="Descrição do trabalho" tooltip="Mencione todas as tarefas e requisitos necessários">
                    <Textarea
                        placeholder="Descreva as responsabilidades e requisitos do trabalho..."
                        className="min-h-[120px] max-h-[200px] resize-y"
                        style={{ resize: 'vertical' }}
                    />
                </FormField>
            </div>
        </div>

        <FormIllustration
            imageUrl="https://img.freepik.com/free-vector/man-search-hiring-job-online-from-laptop_1150-52728.jpg"
            altText="Job Search Illustration"
            tip="Uma boa descrição aumenta suas chances de encontrar os melhores candidatos"
        />
    </div>
);

export default PersonalInfo;

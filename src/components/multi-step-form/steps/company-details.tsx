import LocationImage from '@/assets/multi-step-form/location.png';
import FormIllustration from '@/components/ui/form-illustration';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FC } from 'react';
import { FormField } from '../form-field';

const CompanyDetails: FC = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Form Fields */}
        <div className="space-y-6">
            <p className="text-muted-foreground pb-3.5">
                Defina onde o trabalho será realizado e as restrições geográficas.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Tipologia do Trabalho" tooltip="Selecione se o trabalho é presencial ou remoto">
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecionar" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="select">Selecionar</SelectItem>
                            <SelectItem value="local">Local</SelectItem>
                            <SelectItem value="remoto">Remoto</SelectItem>
                        </SelectContent>
                    </Select>
                </FormField>

                <FormField label="Distrito" tooltip="Selecione o distrito onde o trabalho será realizado">
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecionar distrito" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="aveiro">Aveiro</SelectItem>
                            <SelectItem value="beja">Beja</SelectItem>
                            <SelectItem value="braga">Braga</SelectItem>
                            <SelectItem value="braganca">Bragança</SelectItem>
                            <SelectItem value="castelo-branco">Castelo Branco</SelectItem>
                            <SelectItem value="coimbra">Coimbra</SelectItem>
                            <SelectItem value="evora">Évora</SelectItem>
                            <SelectItem value="faro">Faro</SelectItem>
                            <SelectItem value="guarda">Guarda</SelectItem>
                            <SelectItem value="leiria">Leiria</SelectItem>
                            <SelectItem value="lisboa">Lisboa</SelectItem>
                            <SelectItem value="portalegre">Portalegre</SelectItem>
                            <SelectItem value="porto">Porto</SelectItem>
                            <SelectItem value="santarem">Santarém</SelectItem>
                            <SelectItem value="setubal">Setúbal</SelectItem>
                            <SelectItem value="viana-do-castelo">Viana do Castelo</SelectItem>
                            <SelectItem value="vila-real">Vila Real</SelectItem>
                            <SelectItem value="viseu">Viseu</SelectItem>
                        </SelectContent>
                    </Select>
                </FormField>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <FormField label="Morada do Trabalho" tooltip="Endereço onde o trabalho será realizado">
                    <Input placeholder="Ex: Rua do Comércio, 123" />
                </FormField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    label="Raio de Geolocalização"
                    tooltip="O quão perto o colaborador precisa estar da localização especificada para realizar clock-in/clock-out"
                >
                    <Input
                        type="number"
                        placeholder="Ex: 100"
                        min="0"
                        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </FormField>
            </div>
        </div>

        <FormIllustration
            imageUrl={LocationImage}
            altText="Location Planning Illustration"
            tip="Defina um raio adequado considerando a área do local de trabalho"
        />
    </div>
);

export default CompanyDetails;

import Evento from "@/core/Evento";
import Entrada from "./entrada";
import { useState } from "react";
import Botao from "@/components/eventos/botao";
import { stringParaEntradaDeData } from "@/utils/converter";
interface FormularioProps {
    evento: Evento
    eventoMudou?: (evento: Evento) => void
    cancelado?: () => void

}
export default function Formulario(props: FormularioProps) {
    const id = props.evento?.id
    const [nome, setNome] = useState(props.evento?.nome)
    const [data, setData] = useState(props.evento?.data)
    const [descricao, setDescricao] = useState(props.evento?.descricao)
    const [status, setStatus] = useState(props.evento?.status)
    return (<div>
        {id ? (<Entrada texto="id" valor={id} somenteLeitura ></Entrada>) : false}
        <Entrada texto="Nome" valor={nome} onChange={setNome}></Entrada>
        <Entrada texto="Data" tipo="date" valor={stringParaEntradaDeData(data)}
            onChange={setData}></Entrada>
        <Entrada texto="Descricao" valor={descricao} onChange={setDescricao}></Entrada>
        <Entrada texto="Status" valor={status} onChange={setStatus}></Entrada>
        <div className="flex justify-end mt-5" >
            <Botao className="mr-3" cor="bg-gradient-to-r from-blue-500 to-blue-700"
                onClick={() => props.eventoMudou?.(new Evento(
                    id, nome, data, descricao, status))}>
                {id ? 'Alterar' : 'Salvar'}
            </Botao>
            <Botao cor="bg-gradient-to-r from-gray-500 to-gray-700"
                onClick={props.cancelado}> Cancelar
            </Botao>
        </div>
    </div>
    )
}

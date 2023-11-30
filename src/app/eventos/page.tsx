'use client';
import Botao from "@/components/eventos/botao";
import Layout from "@/components/eventos/layout";
import Tabela from "@/components/eventos/tabela";
import Evento from "@/core/Evento";
import Formulario from "./formulario";
import { useEffect, useState } from "react";
import { atualizarEvento, cadastrarEvento, excluirEvento, fetchEventos } from "@/service/service";
export default function Eventos() {

    const [evento, setEvento] = useState<Evento>(Evento.vazio())

    const [eventos, setEventos] = useState<Evento[]>([]);

    const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')

    useEffect(() => {
        if (visivel === 'tabela') {
            const loadEventos = async () => {
                try {
                    const dados = await fetchEventos();
                    setEventos(dados);
                } catch (error) {
                    console.error("Erro ao buscar eventos:", error);
                }
            }
            loadEventos();
        }
    }, [visivel]);

    async function salvarEvento(evento: Evento) {
        try {
            const novoEvento = await cadastrarEvento(evento);
            setVisivel("tabela");
        } catch (error) {
            console.error("Erro ao salvar evento:", error);
        }
    }



    function salvarOuAlterarEvento(evento: Evento) {
        if (evento.id) {
            alterarEvento(evento)
        } else {
            salvarEvento(evento)
        }
    }

    function eventoSelecionado(evento: Evento) {
        setEvento(evento)
        setVisivel('form')
    }

    async function alterarEvento(evento: Evento) {
        try {
            const eventoAtualizado = await atualizarEvento(evento);
            setVisivel("tabela");
        } catch (error) {
            console.error("Erro ao atualizar evento:", error);
        }
    }

    async function eventoExcluido(evento: Evento) {
        const confirmacao =
            window.confirm("Tem certeza de que deseja excluir este evento?");
        if (confirmacao) {
            try {
                if (evento.id !== null) {
                    await excluirEvento(evento.id);
                } else {
                    console.error("eventoId é null!");
                }
                setEventos(prevEventos => prevEventos.filter(ev => ev.id !== evento.id));
            } catch (error) {
                console.error("Erro ao excluir evento:", error);
            }
        }
    }
    function novoEvento(evento: Evento) {
        setEvento(Evento.vazio())
        setVisivel("form")
    }

    return (
        <div className={`
 flex justify-center items-center h-screen
 bg-gradient-to-bl from-indigo-900 via-indigo-300 to-indigo-900
 text-white`}>
            <Layout titulo="Cadastro de eventos">
                {visivel === 'tabela' ? (<> <div className="flex justify-end">
                    <Botao className="mb-4" cor="bg-gradient-to-r from-green-500 to-green-700"
                        onClick={() => novoEvento(evento)}>
                        Novo evento
                    </Botao>
                </div>
                    <Tabela eventos={eventos}
                        eventoSelecionado={eventoSelecionado}
                        eventoExcluido={eventoExcluido}></Tabela> </>)
                    : (<Formulario evento={evento}
                        eventoMudou={salvarOuAlterarEvento}
                        cancelado={() => setVisivel('tabela')}></Formulario>
                    )
                }
            </Layout>
        </div>
    )
}

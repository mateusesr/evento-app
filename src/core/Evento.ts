import { stringParaEntradaDeData } from "@/utils/converter";

export default class Evento {
    id: number | null;
    nome: string;
    data: string;
    descricao: string;
    status: string;
    constructor(id: number | null, nome: string, data: string,
        descricao: string, status: string) {
        this.id = id;
        this.nome = nome;
        this.data = data;
        this.descricao = descricao;
        this.status = status;
    }
    static vazio(): Evento {
        return new Evento(null, "", stringParaEntradaDeData(""), "", "");
       }
    static geraEventosMock() {
        return [new Evento(1, "UPF em Dança",
            "10/11/2024",
            "Evento de dança",
            "PREVISTO",
        ),
        new Evento(2, "UPF na feitech 2",
            "10/11/2024",
            "Evento de tecnologia",
            "PREVISTO",
        ), new Evento(3, "UPF na feitech 3",
            "10/11/2024",
            "Evento de tecnologia",
            "PREVISTO",
        )
        ]
    }
}   

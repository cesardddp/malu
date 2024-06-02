import data from "./data.json";
import { ref } from "vue";
import type { Família } from "./tipos";

const famílias = ref<Família[]>(data);

famílias.value.sort((a, b) => a.Família.localeCompare(b.Família));

const famíliaMap = new Map<string, Família>(
    famílias.value.map((família) => [família.Família, família])
);

function getFamilia(nomeFamília: Família['Família']): Família {
    return famíliaMap.get(nomeFamília) as Família;
}

export {
    famíliaMap,
    famílias,
    getFamilia
}
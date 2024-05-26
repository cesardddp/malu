<script setup lang="ts">
import Card from "primevue/card";
import Carrossel from "./components/carrossel.vue";
import { Famílias } from "./tipos";

const famílias: Famílias[] = [
  {
    família: "ALTINGIACEAE",
    Hábito: "Arbustos ou árvores",
    Folhas:
      "Simples, alternas, com estípulas unidas à base do pecíolo, margem inteira ou serreada, frequentemente lobadas e palminérveas ",
    Inflorescência: "Glomérulo ",
    Flores:
      "Unissexuadas, pouco vistosas, actinomorfas, aclamídeas ou flores pistiladas monoclamídeas, sépalas escamiformes, estames 4-numerosos, gineceu incompletamente gamocarpelar, ovário semi-ínfero, estiletes livres entre si. ",
    Fruto: " Cápsula ",
    Espécie: " Liquidambar styraciflua L. [exótica] ",
    Localização: ` 22°23'39.9"S 47°32'43.7"W `,
    exemplares: [
      {
        arquivo: "Liquidambar_styraciflua3.jpg",
        nome: "Liquidambar_styraciflua3",
        info: "Info info info dessa planta",
      },
    ],
  },
];
</script>

<template>
  <main
    class="container p-5 m-1 border bg-cover max-h-screen w-auto bg-[url('/images/21_agustus_8.jpg')]"
  >
    <article class="bg-white rounded border-lime-600 border" v-for="família in famílias">
      <Card>
        <template #title>{{ família.família }}</template>
        <template #content>
          <p class="m-0">
            {{ família.Folhas }}
            {{ família.Inflorescência }}
            {{ família.Flores }}
            {{ família.Fruto }}
            {{ família.Espécie }}
            {{ família.Localização }}
          </p>
        </template>
      </Card>
      <Carrossel class="" :exemplares="família.exemplares" />
    </article>
  </main>
</template>

<style scoped></style>

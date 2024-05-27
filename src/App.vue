<script setup lang="ts">
import Carrossel from "./components/carrossel.vue";
import { Família } from "./tipos";
import data from "./data.json";
import { computed, ref } from "vue";
import Button from "primevue/button";

const famílias: Família[] = data;
const famíliaSelecionada = ref<Família>();
const bgImgs = computed(() =>
  Object.fromEntries(
    famílias.map((f) => [
      f.família,
      `bg-[url('/images/${f.exemplares[0].arquivo}')]`,
    ])
  )
);
function select(f: any) {
  famíliaSelecionada.value = famílias.find(
    (fa) => fa.família === f.target.textContent
  );
}
</script>

<template>
  <main
    class="container p-5 border bg-cover max-h-screen w-auto h-svh bg-[url('/images/21_agustus_8.jpg')]"
  >
    <nav
      class="p-1 bg-white flex justify-center mx-auto h-svh items-center gap-3"
      v-if="!famíliaSelecionada"
    >
      <ul >
        <li
          v-for="(_família, i) in famílias"
          :key="i"
          @click="(e) => select(e)"
        >
          <section
            class="border bg-cover rounded p-5 m-5" :class="bgImgs[_família.família]"
          >
            {{ _família.família }}
          </section>
        </li>
        
      </ul>
    </nav>
    <p class="p-1 bg-white ">
      <Button
        v-if="famíliaSelecionada"
        size="small"
        icon="pi pi-arrow-left"
        @click="famíliaSelecionada = undefined"
        label="Voltar"
      />
    </p>
    <Carrossel
      :key="famíliaSelecionada.família"
      v-if="famíliaSelecionada"
      :família="famíliaSelecionada"
      class="bg-white rounded"
    />
  </main>
</template>

<style scoped></style>

<template>
  <article>
    <Card class="p-2">
      <template #header>
        <h1 class="text-2xl text-center mb-2">
          <strong>
            {{ família.família }}
          </strong>
        </h1>
        <div class="grid grid-cols-3 mb-0">
          <div class="col-span-1 flex flex-col justify-content-end">
            <Button
              v-for="i in 7"
              @click="active = i - 1"
              v-bind="btnProps(i - 1)"
            >
              {{ btnProps(i - 1).label }}
              <span
                v-if="detalhesMaterialIcons[detalhesFamilia[i - 1]]"
                class="material-symbols-outlined"
              >
                {{ detalhesMaterialIcons[detalhesFamilia[i - 1]] }}
              </span>
            </Button>
          </div>
          <TabView
            :pt="{
              navContent: 'hidden',
            }"
            class="col-span-2 border border-black-100 rounded bg-transparent"
            scrollable
            v-model:activeIndex="active"
          >
            <TabPanel v-for="i in 7">
              <template #header></template>
              <span v-if="detalhesFamilia[i - 1] !== 'Localização'">
                {{ família[detalhesFamilia[i - 1]] }}
              </span>
              <span v-else>
                <a
                class="text-blue-600 underline"
                :href="(família[detalhesFamilia[i - 1]] as any).link">
                  {{ (família[detalhesFamilia[i - 1]] as any).label }}
                </a>
              </span>
            </TabPanel>
          </TabView>
        </div>
      </template>
      <template #content>
        <Carousel
          :value="família.exemplares"
          :numVisible="3"
          :numScroll="3"
          :responsiveOptions="responsiveOptions"
        >
          <template #item="slotProps">
            <div class="border-1 surface-border border-round mx-auto">
              <div class="mb-3">
                <div class="relative mx-auto">
                  <img
                    :key="slotProps.data.arquivo"
                    :src="'/images/' + slotProps.data.arquivo"
                    :alt="slotProps.data.nome"
                    class="w-full border-round border rounded"
                  />
                  <Tag
                    :value="slotProps.data.tag"
                    class="absolute bg-white"
                    style="left: 5px; top: 5px"
                  />
                </div>
              </div>
              <!-- <div class="mb-3 font-medium">{{ slotProps.data.nome }}</div> -->
              <div class="flex justify-content-between align-items-center">
                <div class="mt-0 font-semibold text-xs">
                  {{ slotProps.data.info }}
                </div>
              </div>
            </div>
          </template>
        </Carousel>
      </template>
    </Card>
  </article>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Carousel from "primevue/carousel";
import Tag from "primevue/tag";
import { Família as Família } from "../tipos";
import Card from "primevue/card";
import TabPanel from "primevue/tabpanel";
import TabView from "primevue/tabview";
import Button, { ButtonProps } from "primevue/button";

defineProps<{ família: Família }>();
const active = ref(0);

const detalhesFamilia: Record<number, keyof Família> = {
  0: "Hábito",
  1: "Folhas",
  2: "Inflorescência",
  3: "Flores",
  4: "Fruto",
  5: "Espécie",
  6: "Localização",
};
const detalhesMaterialIcons: Record<keyof Família, string> = {
  família: "",
  exemplares: "",
  Hábito: "photo_prints",
  Folhas: "temp_preferences_eco",
  Inflorescência: "spa",
  Flores: "local_florist",
  Fruto: "nutrition",
  Espécie: "account_tree",
  Localização: "location_on",
};
const btnProps = (index: keyof typeof detalhesFamilia) => ({
  size: "small" as ButtonProps["size"],
  rounded: true,
  label: detalhesFamilia[index],
  class: [
    "py-0",
    "border-none",
    "m-0",
    active.value === index ? "text-green-600" : "",
  ],
  pt: {
    root: " z-20 py-0 border-none m-0 relative items-center inline-flex text-center align-bottom justify-center leading-[normal] text-sm  px-3 rounded-full text-primary-inverse bg-primary border border-primary focus:outline-none focus:outline-offset-0 focus:ring hover:bg-primary-hover hover:border-primary-hover focus:ring-primary transition duration-200 ease-in-out cursor-pointer overflow-hidden select-none",
  },
});

onMounted(() => {});

const responsiveOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);
</script>

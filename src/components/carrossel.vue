<template>
  <article>
    <Card class="p-2">
      <template #header>
        <!-- <h1 class="text-2xl text-center mb-2">
          <strong>
            {{ _família?.família }}
          </strong>
        </h1> -->
        <div class="flex mb-0 gap-2 h-full">
          <div class="w-2/6 flex flex-col justify-content-end ">
            <Button
              v-for="(_, k) in família"
              class="shadow"
              size="small"
              @click="active = Object.keys(família).indexOf(String(k))"
              :severity="active === Object.keys(família).indexOf(String(k))? 'success':''"
            >
              {{ k }}
              <span
                v-if="detalhesMaterialIcons[k as keyof typeof detalhesMaterialIcons]"
                class="material-symbols-outlined"
              >
                {{ detalhesMaterialIcons[k as keyof typeof detalhesMaterialIcons] }}
              </span>
              <!-- {{ {detalhesMaterialIcons} }} -->
              <!-- {{ {detalhe} }} -->
            </Button>
          </div>

          <TabView
            :pt="{
              navContent: 'hidden',
            }"
            class="w-full border border-black-100 rounded bg-transparent"
            scrollable
            v-model:activeIndex="active"
          >
            <TabPanel v-for="(v, k) in família">
              <template #header></template>
              <!-- {{ {k} }}
              {{ {v} }} -->
              <span v-if="k !== 'Localização'">
                <ScrollPanel
                  style="max-height: 10rem"
                  :pt="{
                    wrapper: {
                      style: { 'border-right': '10px solid green' },
                    },
                    bary: 'hover:bg-primary-400 bg-primary-300 opacity-100',
                  }"
                >
                  <p>
                    {{ v }}
                  </p>
                </ScrollPanel>
              </span>
              <span v-else>
                <a class="text-blue-600 underline" :href="(v as any).link">
                  {{ (v as any).label }}
                </a>
              </span>
            </TabPanel>
          </TabView>
        </div>
      </template>
      <template #content>
           <!--
        <Carousel
          :value="exemplares"
          :numVisible="3"
          :numScroll="3"
          :responsiveOptions="responsiveOptions"
        > 
        <template #item="slotProps">
        -->
            <div class="border-1 surface-border border-round mx-auto">
              <div class="mb-3">
                <div class="relative mx-auto">
                  <img
                    :key=" exemplares[0].arquivo"
                    :src=" exemplares[0].link? exemplares[0].link:'/images/' +  exemplares[0].arquivo"
                    :alt=" exemplares[0].nome"
                    class="w-full border-round border rounded"
                  />
                  <!-- <Tag
                    :value="slotProps.data.tag"
                    class="absolute bg-white"
                    style="left: 5px; top: 5px"
                  /> -->
                </div>
              </div>
              <div class="mb-3 font-medium">{{ exemplares[0].nome }}</div>
              <div class="flex justify-content-between align-items-center">
                <div class="mt-0 font-semibold text-xs">
                  {{ exemplares[0].info }}
                </div>
              </div>
            </div>
          <!-- </template>
        </Carousel> 
      -->
    </template>
    </Card>
  </article>
</template>

<script setup lang="ts">
import { ref, onMounted,  computed } from "vue";
// import Tag from "primevue/tag";
import { Família as Família } from "../tipos";
import Card from "primevue/card";
import TabPanel from "primevue/tabpanel";
import TabView from "primevue/tabview";
import Button from "primevue/button";
import ScrollPanel from "primevue/scrollpanel";

const props = defineProps<{ _família: Família }>();
const exemplares = computed(() => props._família.exemplares);
const família = computed(() => {
  const f: unknown = {
    // Hábito: props._família["Hábito"],
    // Folhas: props._família["Folhas"],
    // Inflorescência: props._família["Inflorescência"],
    // Flores: props._família["Flores"],
    // Fruto: props._família["Fruto"],
    // Espécie: props._família["Espécie"],
    // Localização: props._família["Localização"],
    ...props._família,
  };
  delete (f as any).família;
  delete (f as any).exemplares;

  return {
    ...(f as Omit<Família, "família" | "exemplares">),
  };
});
const active = ref(0);
// onErrorCaptured(({ message }) => {
//   console.log(message);
//   debugger
//   return true;
// });
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

onMounted(() => {});

// const responsiveOptions = ref([
//   {
//     breakpoint: "1400px",
//     numVisible: 2,
//     numScroll: 1,
//   },
//   {
//     breakpoint: "1199px",
//     numVisible: 3,
//     numScroll: 1,
//   },
//   {
//     breakpoint: "767px",
//     numVisible: 2,
//     numScroll: 1,
//   },
//   {
//     breakpoint: "575px",
//     numVisible: 1,
//     numScroll: 1,
//   },
// ]);
</script>

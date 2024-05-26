<template>
  <div class="card">
    <Carousel
      :value="exemplares"
      :numVisible="3"
      :numScroll="3"
      :responsiveOptions="responsiveOptions"
    >
      <template #item="slotProps">
        <div class="border-1 surface-border border-round m-2 p-3">
          <div class="mb-3">
            <div class="relative mx-auto">
              <img
                :src="'/images/' + slotProps.data.arquivo"
                :alt="slotProps.data.nome"
                class="w-full border-round"
              />
              <Tag
                :value="slotProps.data.info"
                class="absolute"
                style="left: 5px; top: 5px"
              />
            </div>
          </div>
          <div class="mb-3 font-medium">{{ slotProps.data.nome }}</div>
          <div class="flex justify-content-between align-items-center">
            <div class="mt-0 font-semibold text-xl">
              {{ slotProps.data.info }}
            </div>
            <span>
              <Button icon="pi pi-info" severity="secondary" outlined />
              <Button icon="pi pi-sun" class="ml-2" />
            </span>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Carousel from "primevue/carousel";
import Tag from "primevue/tag";
import { Exemplar } from "../tipos";

const props = defineProps<{ exemplares: Exemplar[] }>();

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

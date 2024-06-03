<template>
	<article>
		<Card class="p-2">
			<template #header>
				<h1 class="text-xl text-center mb-2 mt-1 align-bottom">
					<strong>{{ nome }}</strong>
				</h1>
				<h2 class="text-center mb-3 align-bottom" v-if="localização">
					<a class="text-blue-600 underline" :href="localização.link">
						{{ localização.label }}
					</a>
				</h2>
				<div class="flex mb-0 gap-2 h-full">
					<div
						class="w-2/6 flex flex-col justify-content-end opacity-100"
					>
						<Button
							v-for="(v, k) in família"
							class="shadow"
							size="small"
							@click="
								active = Object.keys(família).indexOf(String(k))
							"
							:severity="
								active ===
								Object.keys(família).indexOf(String(k))
									? 'success'
									: ''
							"
						>
							{{ k }}
							<a
								class="text-blue-600 underline"
								:href="(v as any).link"
							>
								{{ (v as any).label }}
							</a>
							<span
								v-if="detalhesMaterialIcons[k as keyof typeof detalhesMaterialIcons]"
								class="material-symbols-outlined"
							>
								{{
									detalhesMaterialIcons[
										k as keyof typeof detalhesMaterialIcons
									]
								}}
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
											style: {
												'border-right':
													'10px solid green',
											},
										},
										bary: 'hover:bg-primary-400 bg-primary-300 opacity-100',
									}"
								>
									<p>
										{{ v }}
									</p>
								</ScrollPanel>
							</span>
							<!-- <span v-else>
                <a class="text-blue-600 underline" :href="(v as any).link">
                  {{ (v as any).label }}
                </a>
              </span> -->
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
				<div
					class="border-1 surface-border border-round mx-auto"
					v-if="exemplares"
				>
					<div class="mb-3 font-medium">{{ exemplares.nome }}</div>
					<div class="mb-3">
						<div class="relative mx-auto">
							<picture>
							<img
								:key="exemplares.arquivo"
								:src="
									exemplares.link
										? exemplares.link
										: '/images/' + exemplares.arquivo
								"
								
								:alt="exemplares.nome"
								class="w-full border-round border rounded"
							/>
							<img
								:key="exemplares.arquivo"
								:src="
									exemplares.link
										? exemplares.link
										: '/images/' + exemplares.arquivo
								"
								
								:alt="exemplares.nome"
								class="w-full border-round border rounded"
							/>
						</picture>
							<!-- <Tag
                    :value="slotProps.data.tag"
                    class="absolute bg-white"
                    style="left: 5px; top: 5px"
                  /> -->
						</div>
					</div>
					<div
						class="flex justify-content-between align-items-center"
					>
						<div class="mt-0 font-semibold text-xs">
							{{ exemplares.info }}
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
import { computed, ref } from "vue";
// import Tag from "primevue/tag";
import Button from "primevue/button";
import Card from "primevue/card";
import ScrollPanel from "primevue/scrollpanel";
import TabPanel from "primevue/tabpanel";
import TabView from "primevue/tabview";
import { famíliaMap } from "../store";
import { Família } from "../tipos";

const props = defineProps<{ nome: Família["Família"] }>();
const exemplares = computed(() => famíliaMap.get(props.nome)?.exemplares);
const localização = computed(() => famíliaMap.get(props.nome)?.Localização);
const família = computed(() => {
	const f: unknown = {
		// Hábito: props._familia["Hábito"],
		// Folhas: props._familia["Folhas"],
		// Inflorescência: props._familia["Inflorescência"],
		// Flores: props._familia["Flores"],
		// Fruto: props._familia["Fruto"],
		// Espécie: props._familia["Espécie"],
		// Localização: props._familia["Localização"],
		...famíliaMap.get(props.nome),
	};
	delete (f as any).Família;
	delete (f as any).link;
	delete (f as any).exemplares;
	delete (f as any).Localização;

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
	Família: "",
	Megastróbilos: "",
	Microstróbilos: "",
	https: "",
	link: "",
	Sementes: "",

	exemplares: "",
	Hábito: "photo_prints",
	Folhas: "temp_preferences_eco",
	Inflorescência: "spa",
	Flores: "local_florist",
	Fruto: "nutrition",
	Espécie: "account_tree",
	Localização: "location_on",
};

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

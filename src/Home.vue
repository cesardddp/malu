<script setup lang="ts">
import Button from "primevue/button";
import Card from "primevue/card";
import Image from "primevue/image";
import { ref, computed } from 'vue';
import { GoogleMap, InfoWindow, Marker } from "vue3-google-map";
import { famílias } from "./store";
import type { Família } from "./tipos";
import InputText from "primevue/inputtext";
import InputIcon from "primevue/inputicon";
import IconField from "primevue/iconfield";
import ProgressSpinner from "primevue/progressspinner";

// 22°23'48.3"S 47°32'48.9"W
// const center = { lat: 40.689247, lng: -74.044502 };
const center = {
	lat: -22.396105,
	lng: -47.545683,
};

const apiKey = import.meta.env.VITE_GM;

const nomeFamíliaSelecionada = ref<Família["Família"]>("");


const search = ref("");
const map = ref<InstanceType<typeof GoogleMap> | null>(null);
const mapaCarregado = computed(()=>map.value?.ready)
</script>

<template>
	<h1
		class="text-xs text-center text-dark flex justify-between items-center rounded"
	>
		<Image
			src="/images.png"
			alt="quadro-floral"
			:image-style="{ width: '40%', display: 'inline' }"
		/>

		<span class="w-50 my-auto">
			Guia de campo arbóreo campus UNESP Rio Claro
		</span>
	</h1>
	<IconField
		iconPosition="left"
		class="text-xl bg-white opacity-100 max-w-lg self-center"
	>
		<InputIcon>
			<i class="pi pi-search" />
		</InputIcon>
		<InputText v-model="search" placeholder="Buscar Família" />
	</IconField>

	<ProgressSpinner v-if="!mapaCarregado" />
	<section
	v-show="mapaCarregado"
		class="flex justify-content-center h-full  mt-5 border-green-400 border-2 rounded"
	>
		<GoogleMap
			:api-key="apiKey"
			style="width: 100%; min-height: 70%; max-height: 100%"
			:center="center"
			ref="map"
			:zoom="15.5"
		>
			<template
				v-for="{
					Espécie,
					Família,
					Hábito,
					Localização,
					Folhas,
					exemplares,
				} in famílias.filter((f) =>
					f.Família.toLowerCase().includes(search.toLowerCase())
				)"
				:key="Família"
			>
				<Marker
					:options="{
						position: {
							lng: Number(Localização.coordenadas.lng),
							lat: Number(Localização.coordenadas.lat),
						},
						label: Família,
						title: Família,

					}"
					
					@click="
						() => {
							console.log('click');
							nomeFamíliaSelecionada = Família;
						}
					"
				>
					<InfoWindow>
						<Card>
							<template #header>
								<div class="w-full flex justify-center">
									<Image
										image-class="aspect-square hover:aspect-auto mx-auto"
										class=" "
										:alt="Espécie"
										width="200"
										:src="
											exemplares.arquivo
												? '/images/' +
												  exemplares.arquivo
												: exemplares.link
										"
									/>
								</div>
							</template>
							<template #title>
								<h3 class="m-0 text-center">{{ Família }}</h3>
							</template>
							<template #subtitle>
								<h3 class="text-center">
									<a
										class="text-blue-600 underline"
										:href="Localização.link"
									>
										{{ Localização.label }}
									</a>
								</h3>
							</template>
							<template #content>
								<p class="m-0">
									<strong> Espécie: </strong>{{ Espécie }}
								</p>
								<p class="m-0">
									<strong> Folhas: </strong>{{ Folhas }}
								</p>
								<p class="m-0">
									<strong> Hábito: </strong>{{ Hábito }}
								</p>
							</template>
							<template #footer>
								<div class="flex justify-center gap-1 mt-1">
									<!-- <Button
										size="small"
										label="Fechar"
										@click=""
										severity="danger"
										outlined
									/> -->

									<router-link
										:to="{
											name: 'detalhes',
											params: { nome: Família },
										}"
									>
										<Button
											size="small"
											label="Ver mais"
											severity="success"
										/>
									</router-link>
								</div>
							</template>
						</Card>
					</InfoWindow>
				</Marker>
			</template>
		</GoogleMap>
	</section>
	

</template>

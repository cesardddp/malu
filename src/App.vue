<script setup lang="ts">
import Carrossel from "./components/carrossel.vue";
import { Família } from "./tipos";
import { computed, onErrorCaptured, ref, watch } from "vue";
import Button from "primevue/button";
import { useRoute, useRouter } from "vue-router";
import DataView from "primevue/dataview";
import Image from "primevue/image";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import data from "./data.json";
const route = useRoute();
const router = useRouter();

const famílias = ref<Família[]>(data);

watch(
	() => route.path,
	(v) => {
		if (v.split("/").length > 2) router.push("/");
	}
);

famílias.value.sort((a, b) => a.família.localeCompare(b.família));

const famíliaSelecionada = computed(() => {
	return famílias.value.find(
		(fa) => fa.família === route?.path.replace("/", "")
	);
});
const bgImgs = computed(() =>
	Object.fromEntries(
		famílias.value.map((f) => [
			f.família,
			`bg-[url('/images/${f.exemplares[0].arquivo}')]`,
		])
	)
);
onErrorCaptured(() => false);
const search = ref("");
</script>

<template>
	<main
		class="container p-5 border bg-cover max-h-screen w-auto h-svh bg-[url('/images/quadro-floral.avif')]"
	>
		<nav
			class="p-1 bg-white bg-opacity-80 mx-auto h-svh items-center gap-3"
			v-if="!famíliaSelecionada"
		>
			<IconField iconPosition="left" class="w-4/6 mx-auto mb-5">
				<InputIcon class="pi pi-search"> </InputIcon>

				<InputText v-model="search" placeholder="Search" />
			</IconField>
			<ul class="flex flex-wrap gap-3 justify-around">
				<li
					v-for="_família in famílias.filter((f) =>
						f.família.toLowerCase().includes(search.toLowerCase())
					)"
					:key="_família.família"
					@click="(e) => {
                        // console.log(((e.target as any))?.textContent);
                        // console.log(_família.família);

                        //  router.replace(((e.target as any))?.textContent)
                        router.push(((e.target as any))?.textContent);
                    }
                        "
					class="border bg-cover rounded p-1 flex justify-center flex-col shadow bg-opacity-80 bg-white"
				>
					<Image
						image-class="aspect-square hover:aspect-auto	  "
						class="mx-auto"
						:src="(_família as Família).exemplares[0].link ?? '/images/' + (_família as Família).exemplares[0].arquivo"
						alt="Image"
						width="100"
						preview
					/>
					<p :class="bgImgs[_família.família]">
						<Button severity="success" outlined size="small">
							{{ _família.família }}
						</Button>
					</p>
				</li>
			</ul>

			<div class="card" v-if="false">
				<DataView :value="famílias" :layout="'grid'" data-key="família">
					<template #header>
						<div class="flex justify-content-end">
							<!-- <DataViewLayoutOptions v-model="'grid'" /> -->
						</div>
					</template>

					<template #list="slotProps">
						<div class="grid grid-nogutter">
							<div
								v-for="(item, index) in slotProps.items"
								:key="index"
								class="col-12"
							>
								<div
									class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-3"
									:class="{
										'border-top-1 surface-border':
											index !== 0,
									}"
								>
									<div class="md:w-10rem relative">
										<img
											class="block xl:block mx-auto border-round w-full"
											:src="(item as Família).exemplares[0].link ?? (item as Família).exemplares[0].arquivo"
											:alt="item.name"
										/>
									</div>
									<div
										class="flex flex-column md:flex-row justify-content-between md:align-items-center flex-1 gap-4"
									>
										<div
											class="flex flex-row md:flex-column justify-content-between align-items-start gap-2"
										>
											<div>
												<span
													class="font-medium text-secondary text-sm"
													>{{ item.category }}</span
												>
												<div
													class="text-lg font-medium text-900 mt-2"
												>
													{{ item.name }}
												</div>
											</div>
											<div
												class="surface-100 p-1"
												style="border-radius: 30px"
											>
												<div
													class="surface-0 flex align-items-center gap-2 justify-content-center py-1 px-2"
													style="
														border-radius: 30px;
														box-shadow: 0px 1px 2px
																0px
																rgba(
																	0,
																	0,
																	0,
																	0.04
																),
															0px 1px 2px 0px
																rgba(
																	0,
																	0,
																	0,
																	0.06
																);
													"
												>
													<span
														class="text-900 font-medium text-sm"
														>{{ item.rating }}</span
													>
													<i
														class="pi pi-star-fill text-yellow-500"
													></i>
												</div>
											</div>
										</div>
										<div
											class="flex flex-column md:align-items-end gap-5"
										>
											<span
												class="text-xl font-semibold text-900"
												>${{ item.price }}</span
											>
											<div
												class="flex flex-row-reverse md:flex-row gap-2"
											>
												<Button
													icon="pi pi-heart"
													outlined
												></Button>
												<Button
													icon="pi pi-shopping-cart"
													label="Buy Now"
													:disabled="
														item.inventoryStatus ===
														'OUTOFSTOCK'
													"
													class="flex-auto md:flex-initial white-space-nowrap"
												></Button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</template>

					<template #grid="slotProps">
						<div class="grid grid-nogutter">
							<div
								v-for="(item, index) in slotProps.items"
								:key="index"
								class="col-12 sm:col-6 md:col-4 xl:col-6 p-2"
							>
								<div
									class="p-4 border-1 surface-border surface-card border-round flex flex-column"
								>
									<div
										class="surface-50 flex justify-content-center border-round p-3"
									>
										<div class="relative mx-auto">
											<Image
												:src="(item as Família).exemplares[0].link ?? (item as Família).exemplares[0].arquivo"
												src="/image.jpg"
												alt="Image"
												width="250"
												preview
											/>
										</div>
									</div>
									<div class="pt-4"></div>
								</div>
							</div>
						</div>
					</template>
				</DataView>
			</div>
		</nav>

		<div class="bg-white rounded">
			<section
				class="lg:max-lg:flex justify-between items-center gap-1 p-1"
				v-if="famíliaSelecionada"
			>
				<a
					v-if="famíliaSelecionada"
					size="small"
					class="underline text-blue-600 sm:w-full sm:flex-1"
					icon="pi pi-arrow-left"
					@click="router.push('/')"
					label="Voltar"
				>
					<- Voltar
				</a>
				<div class="align-middle col-span-1">
					<Button
						class="align-middle text-xs"
						size="small"
						severity="success"
						outlined
						v-if="
							famílias.findIndex(
								(f) => famíliaSelecionada?.família === f.família
							) > 0
						"
						@click="e => router.push(((e.target as any))?.textContent)"
						@focus="(e: any) => { e.target.blur() }"
						:label="
							famílias[
								famílias.findIndex(
									(f) =>
										famíliaSelecionada?.família ===
										f.família
								) - 1
							].família
						"
						icon="pi pi-arrow-left"
						icon-pos="left"
					>
					</Button>
				</div>

				<Button
					class="align-middle text-xs"
					severity="success"
					outlined
					@focus="(e: any) => { e.target.blur() }"
					size="small"
					v-show="
						famílias.findIndex(
							(f) => famíliaSelecionada?.família === f.família
						) <
						famílias.length - 1
					"
					@click="e => router.push(((e.target as any))?.textContent.replace(' ->', ''))"
					:label="
						famílias[
							famílias.findIndex(
								(f) => famíliaSelecionada?.família === f.família
							) + 1
						]?.família
					"
					icon="pi pi-arrow-right"
					icon-pos="right"
				>
				</Button>
			</section>
			<hr />
			<h1 class="text-2xl text-center mb-2 mt-5 align-bottom">
				<strong class="">
					{{ famíliaSelecionada?.família }}
				</strong>
			</h1>
			<Carrossel
				:key="famíliaSelecionada.família"
				v-if="famíliaSelecionada"
				:_família="famíliaSelecionada"
			/>
		</div>
	</main>
</template>

<style scoped></style>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { famílias } from "./store";
import { computed, ref } from "vue";
import Button from "primevue/button";

const route = useRoute();
const currentFamília = computed(() =>
	famílias.value.find((f) => f.Família === route?.params.nome)
);
const currentFamíliaIndex = computed(
	() => currentFamília.value && famílias.value.indexOf(currentFamília?.value)
);
function próximo() {
	if (
		(currentFamíliaIndex.value ?? famílias.value.length - 1) ===
		famílias.value.length - 1
	) {
		return famílias.value[0].Família;
	}

	return famílias.value[(currentFamíliaIndex.value ?? 0) + 1].Família;
}
function anterior() {
	if ((currentFamíliaIndex.value ?? 0) === 0) {
		return famílias.value[famílias.value.length - 1].Família;
	}
	return famílias.value[(currentFamíliaIndex.value ?? 0) - 1].Família;
}
const loading = ref(false);
const router = useRouter();
router.beforeEach(() => {
	loading.value = true;
});
router.afterEach(() => {
	loading.value = false;
});
</script>

<template>
	<div
		class="container p-5 border bg-cover max-h-screen w-auto h-svh bg-[url('/images/quadro-floral.avif')] 100vh"
	>
		<nav
			v-if="currentFamília"
			class="flex justify-between items-center gap-1 p-1"
		>
				<div class="align-middle col-span-1">
				<Button
					:loading
					class="align-middle text-xs"
					size="small"
					severity="success"
					outlined
					@focus="(e: any) => { e.target.blur() }"
					icon="pi pi-arrow-left"
					icon-pos="left"
					label="Anterior"
					v-if="(currentFamíliaIndex ?? 0) > 1"
					@click="
						$router.push({
							name: 'detalhes',
							params: { nome: anterior() },
						})
					"
				>
				</Button>
			</div>

			<Button
				size="small"
				icon="pi pi-map-marker"
				severity="warning"
				@click="$router.push('/')"
				label="Mapa"
			/>

			<Button
				:loading
				class="align-middle text-xs"
				severity="success"
				outlined
				@focus="(e: any) => { e.target.blur() }"
				size="small"
				icon="pi pi-arrow-right"
				icon-pos="right"
				label="Próximo"
				v-if="currentFamíliaIndex ?? 0 < famílias.length - 1"
				@click="
					$router.push({
						name: 'detalhes',
						params: { nome: próximo() },
					})
				"
			>
			</Button>
		</nav>
		<main
			class="rounded shadow bg-opacity-80 bg-white container flex flex-col border bg-cover max-h-screen w-auto h-svh"
		>
			<router-view v-slot="{ Component }">
				<keep-alive>
					<component :is="Component" />
				</keep-alive>
			</router-view>
		</main>
	</div>
</template>

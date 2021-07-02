<template>
	<div class="container">
		<div class="row d-flex align-items-center">
			<capacity-form />
			<capacity-intro />
		</div>
		<!--/.row-->
	</div>
</template>

<script>
import CapacityIntro from "./capacity/CapacityIntro.vue";
import CapacityForm from "./capacity/CapacityForm.vue";
export default {
	name: "Capacity",
	components: {
		CapacityIntro,
		CapacityForm,
	},
};
</script>

<style>
</style>
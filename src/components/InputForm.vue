<template>
	<div class="container">
		<div class="row">
			<div class="col-12 col-xl-5">
				<Form-Record />
			</div>
			<div class="col-12 col-xl-7">
				<FormIntro />
			</div>
		</div>
	</div>
</template>

<script>
import FormRecord from "./forms/FormRecord.vue";
import FormIntro from "./forms/FormIntro.vue";

export default {
	name: "InputForm",
	components: {
		FormRecord,
		FormIntro,
	},
};
</script>

<style>
</style>
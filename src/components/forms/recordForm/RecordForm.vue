<template>
	<div class="container">
		<div class="row">
			<div class="col-12 col-xl-5">
				<Form-Record />
			</div>
			<div class="col-12 col-xl-7" id="form-intro">
				<FormIntro />
			</div>
		</div>
	</div>
</template>

<script>
import FormRecord from "./components/FormRecord.vue";
import FormIntro from "./components/FormIntro.vue";

export default {
	name: "InputForm",
	components: {
		FormRecord,
		FormIntro,
	},
	computed: {
		currentForm: function () {
			return this.$store.state.data.currentForm;
		},
	},
};
</script>

<style scoped>
@media (max-width: 1200px) {
	#form-intro {
		padding-top: 50px;
	}
}
</style>
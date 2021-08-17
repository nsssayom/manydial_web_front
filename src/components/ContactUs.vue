<template>
	<div class="container">
		<div class="row d-flex justify-content-center text-center">
			<div class="col-md-8">
				<h3>Feedback Matters</h3>
				<p class="mb-5">
					As you know, we are in the beta phase and testing our market
					opportunity to develop some coolest voice broadcasting
					solutions. In this phase, we value feedback
					<b>more than our girlfriends</b>.
				</p>
			</div>
		</div>

		<div class="row">
			<div class="col-lg-6">
				<img src="@/assets/img/contact.jpg" alt="" class="img-fluid" />
			</div>
			<div class="col-lg-6">
				<contact-form />
			</div>
		</div>
	</div>
</template>

<script>
import ContactForm from "./forms/ContactForm.vue";
export default {
	name: "ContactUs",
	components: {
		ContactForm,
	},
};
</script>

<style>
</style>
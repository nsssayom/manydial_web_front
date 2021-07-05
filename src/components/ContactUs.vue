<template>
	<div class="container">
		<div class="row d-flex justify-content-center text-center">
			<div class="col-md-8">
				<h3>যোগাযোগ করুন</h3>
				<p class="mb-5">
					মেনিডায়াল নিয়ে কোনো জিজ্ঞাসা আছে? কিংবা কাস্টোমাইজড কোনো কল
					ব্রডকাস্টিং সহায়তা দরকার? এখনই পাঠিয়ে দিন আপনার
					রিকোয়ের্মেন্ট, দ্রুততম সময়ে আমরা যোগাযোগ করবো।
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
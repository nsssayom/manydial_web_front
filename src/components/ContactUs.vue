<template>
	<div class="container">
		<div class="row d-flex justify-content-center text-center">
			<div class="col-md-8">
				<h3>যোগাযোগ করুন</h3>
				<p class="mb-5">
					অংশ অংশভাক আঁইশ ইঁচড়েপাকা ঈক্ষণ ঈদৃক অংশভাগী জওয়ান অংশাঙ্কিত
					ইউক্যালিপটাস অংশাবতার হালহদিশ পিতৃতর্পণ টকানো ঈক্ষিত জগজ্জন
					তকতনামা আঁকুবাঁকু পঁইছা জগঝপ্প পঁহুছা দ্রাবিড়ী আঁকুড়ি ঈদৃক
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
<template>
	<Navbar balance="100"></Navbar>
	<section id="home">
		<input-form />
	</section>

	<section id="features">
		<services />
	</section>

	<section id="capacity">
		<capacity />
	</section>

	<section id="pricing" class="bg-light">
		<pricing />
	</section>

	<section id="faq">
		<faq />
	</section>

	<section id="contact-us">
		<contact-us />
	</section>

	<Footer />
	<copyright />
</template>

<script>
import Navbar from "./components/Navbar.vue";
import InputForm from "./components/InputForm.vue";
import Services from "./components/Services.vue";
import Capacity from "./components/Capacity.vue";
import Pricing from "./components/Pricing.vue";
import Faq from "./components/Faq.vue";
import ContactUs from "./components/ContactUs.vue";
import Footer from "./components/Footer.vue";
import Copyright from "./components/Copyright.vue";

export default {
	name: "App",
	components: {
		Navbar,
		InputForm,
		Services,
		Capacity,
		Pricing,
		Faq,
		ContactUs,
		Footer,
		Copyright,
	},
	mounted() {},
};
</script>

<style scoped>
#home {
	/* padding-top: 0px !important; */
}

@media (max-width: 1200px) {
	section {
		padding-top: 0px;
	}
}
</style>

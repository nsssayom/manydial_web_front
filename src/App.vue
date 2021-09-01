<template>
	<Navbar></Navbar>

	<section id="home">
		<input-form v-show="currentForm === 'record'" />
		<twilio-form v-if="currentForm === 'verify'" />
	</section>

	<section id="features">
		<services />
	</section>

	<!-- <section id="capacity">
		<capacity />
	</section> -->

	<section id="pricing">
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
import InputForm from "./components/forms/recordForm/RecordForm.vue";
import Services from "./components/Services.vue";
/* import Capacity from "./components/Capacity.vue"; */
import Pricing from "./components/Pricing.vue";
import Faq from "./components/Faq.vue";
import ContactUs from "./components/ContactUs.vue";
import Footer from "./components/Footer.vue";
import Copyright from "./components/Copyright.vue";
import TwilioForm from "./components/forms/idForm/TwilioForm.vue";

export default {
	name: "App",
	components: {
		Navbar,
		InputForm,
		TwilioForm,
		Services,
		/* Capacity, */
		Pricing,
		Faq,
		ContactUs,
		Footer,
		Copyright,
	},
	mounted() {},
	computed: {
		currentForm: function () {
			return this.$store.state.data.currentForm;
		},
	},
	created() {
		const user = localStorage.getItem("user");
		if (user) {
			this.$store
				.dispatch("auth/tokenAuth", user.token)
				.then(() => console.log("Login Authenticated"))
				.catch((err) => console.log("Login Failed", err));
		}
	},
};
</script>

<style scoped>
@media (max-width: 1200px) {
	#home {
		padding-top: 20px;
	}
}

#features {
	background-color: #1f202215;
}
</style>

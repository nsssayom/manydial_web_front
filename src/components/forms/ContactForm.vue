<template>
	<input
		type="text"
		class="mdl-border mdl-shadow form-control p-3 bg-body rounded"
		id="contact-name"
		placeholder="নাম"
		required
	/>
	<input
		type="email"
		class="mdl-border mdl-shadow form-control p-3 bg-body rounded mt-3"
		id="contact-email"
		placeholder="ইমেইল"
		required
	/>
	<input
		type="text"
		class="mdl-border mdl-shadow form-control p-3 bg-body rounded mt-3"
		id="contact-company-name"
		placeholder="প্রতিষ্ঠানের নাম (ঐচ্ছ্বিক)"
	/>
	<input
		type="tel"
		class="mdl-border mdl-shadow form-control p-3 bg-body rounded mt-3"
		id="contact-mobile"
		placeholder="ফোন নম্বর"
		pattern="[0]{1}[1]{1}[0-9]{9}"
		required
	/>

	<textarea
		class="mdl-border mdl-shadow form-control mt-3"
		id="recipient-numbers"
		rows="4"
		placeholder="আপনার বার্তা লিখুন"
	></textarea>

	<div class="row ms-1 me-auto col-12">
		<button type="button" class="btn btn-primary shadow p-3 rounded mt-3">
			পাঠান
		</button>
	</div>
</template>

<script>
export default {
	name: "ContactForm",
};
</script>

<style>
</style>
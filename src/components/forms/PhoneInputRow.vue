<template>
	<div class="row">
		<div class="col-8 me-auto">
			<!-- <OTPForm /> -->
			<input
				type="tel"
				class="form-control shadow p-3 bg-body rounded"
				id="mobile"
				placeholder="আপনার ফোন নম্বর"
				pattern="[0]{1}[1]{1}[0-9]{9}"
				maxlength="11"
				required
				v-model="phoneNumber"
			/>
		</div>
		<div class="col-4">
			<button
				class="form-control btn btn-block shadow py-3 py-xs-0 my-xs-0"
				:class="{
					'btn-outline-primary': isPhoneNumberValid,
					'btn-outline-info': !isPhoneNumberValid,
				}"
				type="button"
				id="btn-get-otp"
				:disabled="!isPhoneNumberValid"
				@click="onPhoneNumberInput"
			>
				ওটিপি পাঠান
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "PhoneInputRow",
	data() {
		return {
			phoneNumber: "",
		};
	},
	computed: {
		isPhoneNumberValid: function () {
			var patt = new RegExp("^[0][1][3456789][0-9]{8}$");
			return patt.test(this.phoneNumber);
		},
	},
	methods: {
		onPhoneNumberInput() {
			this.emitter.emit("phone-number-input", this.phoneNumber);
		},
	},
	watch: {},
};
</script>

<style scoped>
@media (max-width: 1400px) {
	.btn {
		padding-left: 0px;
		padding-right: 0px;
	}
}
</style>
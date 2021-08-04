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
			>
				<div v-show="!otpSubmitted">ওটিপি পাঠান</div>
				<font-awesome-icon
					v-show="otpSubmitted"
					icon="spinner"
					class="fa-spin"
				/>
			</button>
		</div>
	</div>
</template>

<script>
import firebase from "firebase/app";

export default {
	name: "PhoneInputRow",
	data() {
		return {
			phoneNumber: "",
			otpSubmitted: false,
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
			// TODO: Using debug phone number. Change on production
			const phoneNumber = "+88" + this.phoneNumber;
			//const phoneNumber = "+8801717018376";
			const appVerifier = window.recaptchaVerifier;

			//console.log(phoneNumber);
			// Firebase sendOtp(phonenumber, appVerifier)
			// Dispatching sendOtp action
			this.$store
				.dispatch("auth/sendOtp", { phoneNumber, appVerifier })
				.then((response) => {
					//console.log("Sent OTP", response);
					this.firebaseConfirmationResult = response;
				})
				.catch((err) => {
					console.log("OTP Sent error", err);
					window.grecaptcha.reset(window.recaptchaWidgetId);
				})
				.finally(() => {
					this.otpSubmitted = false;
				});
		},
	},
	watch: {},
	mounted() {
		window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
			"btn-get-otp",
			{
				size: "invisible",
				callback: () => {
					// reCAPTCHA solved, allow signInWithPhoneNumber.
					this.otpSubmitted = true;
					this.onPhoneNumberInput();
				},
			}
		);

		window.recaptchaVerifier.render().then((widgetId) => {
			window.recaptchaWidgetId = widgetId;
		});
	},
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
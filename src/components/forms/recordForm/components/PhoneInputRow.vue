<template>
	<div class="row">
		<div class="col-8 ms-auto">
			<!-- <OTPForm /> -->

			<!-- pattern="[0]{1}[1]{1}[0-9]{9}"
				maxlength="11" -->
			<input
				type="tel"
				class="mdl-border mdl-shadow form-control p-3 bg-body rounded"
				id="mobile"
				placeholder="Sender's Number "
				required
				v-model="phoneNumber"
				@click="onSenderNumberClick"
			/>
		</div>
		<div class="col-4">
			<button
				class="form-control btn btn-block py-3 py-xs-0 my-xs-0"
				:class="{
					'btn-outline-success': isPhoneNumberValid,
					'btn-outline-primary': !isPhoneNumberValid,
				}"
				type="button"
				id="btn-get-otp"
				:disabled="!isPhoneNumberValid"
			>
				<div v-show="!otpSubmitted">Get OTP</div>
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
import {
	parsePhoneNumber,
	getCountryCallingCode,
	/* isValidPhoneNumber,
	getCountryCallingCode,
	isSupportedCountry,
	AsYouType, */
} from "libphonenumber-js/max";

export default {
	name: "PhoneInputRow",
	data() {
		return {
			phoneNumber: "",
			otpSubmitted: false,
			isPhoneNumberValid: false,
		};
	},
	computed: {
		country: function () {
			if (this.$store.state.auth.user.countryCode) {
				return this.$store.state.auth.user.countryCode;
			} else {
				return null;
			}
		},

		countryCode: function () {
			if (this.country) {
				return getCountryCallingCode(this.country);
			}
			return "";
		},
	},
	methods: {
		onPhoneNumberInput() {
			/*
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
				}); */
		},

		onSenderNumberClick() {
			if (!this.phoneNumber || this.phoneNumber === "") {
				this.phoneNumber = "+" + this.countryCode;
			}
		},
	},
	watch: {
		phoneNumber: function (newVal) {
			if (phoneNumber && phoneNumber === "") {
				phoneNumber = "+880";
			}
			try {
				var phoneNumber = parsePhoneNumber(newVal, this.country);
				this.isPhoneNumberValid = phoneNumber.isValid();
				console.log(phoneNumber, phoneNumber.isValid());
			} catch (error) {
				console.error("Can't process data");
				this.isPhoneNumberValid = false;
			}
		},
	},
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
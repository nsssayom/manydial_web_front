<template>
	<div class="row">
		<div class="col-8 ms-auto">
			<!-- <OTPForm /> -->

			<!-- pattern="[0]{1}[1]{1}[0-9]{9}"
				maxlength="11" -->
			<input
				type="tel"
				class="mdl-border mdl-shadow form-control p-3 bg-body rounded"
				:class="{
					'valid-sender': isPhoneNumberValid,
					'invalid-sender': !isPhoneNumberValid,
				}"
				id="mobile"
				placeholder="Sender's Number "
				required
				v-model="phoneNumber"
				@click="onSenderNumberClick"
			/>
		</div>
		<div class="col-4">
			<button
				class="
					form-control
					btn btn-block
					py-3 py-xs-0
					my-xs-0
					gradient-border
				"
				:class="{
					'disbaled-btn': !isPhoneNumberValid,
				}"
				type="button"
				id="btn-get-otp"
			>
				<div v-show="!otpSubmitted"><b>Get OTP</b></div>
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
			phoneNumberInternational: "",
			isPhoneNumberValid: false,
			otpSubmitted: false,
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
			const phoneNumber = this.phoneNumberInternational;
			const appVerifier = window.recaptchaVerifier;

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

		onSenderNumberClick() {
			if (!this.phoneNumber || this.phoneNumber === "") {
				this.phoneNumber = "+" + this.countryCode;
			}
		},
	},
	watch: {
		phoneNumber: function (newVal) {
			try {
				var phoneNumber = parsePhoneNumber(newVal, this.country);
				if (phoneNumber.isValid()) {
					this.phoneNumberInternational = phoneNumber.number;
					this.isPhoneNumberValid = true;
					console.log(
						this.phoneNumberInternational,
						phoneNumber.number,
						phoneNumber.country
					);
				} else {
					this.isPhoneNumberValid = false;
					this.phoneNumberInternational = null;
				}
			} catch (error) {
				this.phoneNumberInternational = null;
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
					if (this.isPhoneNumberValid) {
						this.otpSubmitted = true;
						this.onPhoneNumberInput();
					}
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
#btn-get-otp {
	border: 0px !important;
}

.invalid-sender:focus {
	box-shadow: 0 0 0 0.25rem rgb(239 83 80 / 50%) !important;
	border: 0px !important;
}

.valid-sender:focus {
	box-shadow: 0 0 0 0.25rem rgb(102 187 106 / 50%) !important;
	border: 0px !important;
}

.disbaled-btn {
	opacity: 65%;
	cursor: not-allowed;
}

.gradient-border {
	--border-width: 3px;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	border-radius: var(--border-width);
}
.gradient-border::after {
	position: absolute;
	content: "";
	z-index: -1;
	width: 100%;
	height: 100%;
	background: linear-gradient(
		60deg,
		#5e35b1,
		#3949ab,
		#1e88e5,
		#039be5,
		#00acc1
	);
	background-size: 300% 300%;
	background-position: 0 50%;
	border-radius: calc(2 * var(--border-width));
	animation: moveGradient 4s alternate infinite;
}
@keyframes moveGradient {
	50% {
		background-position: 100% 50%;
	}
}

@media (max-width: 1400px) {
	.btn {
		padding-left: 0px;
		padding-right: 0px;
	}
}
</style>
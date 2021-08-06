<template>
	<div class="container">
		<!-- The whole home row -->
		<div class="row">
			<div class="col-12 col-xl-5">
				<!-- Verified message starts-->
				<div
					class="row pt-3"
					v-show="verificationStatus === 'verified'"
				>
					<div class="col-12">
						<div class="alert alert-success" role="alert">
							আপনার নম্বরটি কল ব্রডকাস্টের জন্য ভেরিফাই করা হয়েছে
						</div>
					</div>
				</div>
				<!-- Verified message ends -->

				<!-- Call sent message starts -->
				<div class="row pt-3" v-show="verificationStatus === 'sent'">
					<div class="col-12">
						<div class="alert alert-info" role="alert">
							আপনার ফোনে কিছুক্ষণের মধ্যে একটি কল যাবে। কলটি রিসিভ
							করে <b> {{ verificationCode }} </b> কোডটি প্রবেশ
							করান
						</div>
					</div>
				</div>
				<!-- Call sent message ends -->

				<!-- Verification failed message starts -->
				<div
					class="row pt-3"
					v-show="verificationStatus === 'not-verified'"
				>
					<div class="col-12">
						<div class="alert alert-danger" role="alert">
							আপনার নম্বরটি ভেরিফাই করা যায়নি
						</div>
					</div>
				</div>
				<!-- Verification failed message ends -->

				<!-- Slot time display starts -->
				<div class="row pt-3" v-if="callEndTime">
					<div class="col-12">
						<div class="alert alert-info" role="alert">
							আপনার কলগুলো সম্পন্ন হবার সম্ভাব্য সময়
							<b> {{ callEndTime }} </b>
						</div>
					</div>
				</div>
				<!-- Slot time display ends -->
			</div>
			<div class="col-12 col-xl-7" id="form-intro">
				<!-- <form-intro /> -->
			</div>
		</div>
	</div>
</template>

<script>
/* import FormIntro from "../recordForm/components/FormIntro.vue"; */
export default {
	name: "TwilioForm",
	components: {
		/* FormIntro, */
	},

	computed: {
		verificationStatus: function () {
			return this.$store.state.auth.otpState.twilio_status;
		},

		verificationCode: function () {
			return this.$store.state.auth.otpState.twilio_verification_code;
		},

		callEndTime: function () {
			const options = {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
				hour: "numeric",
				minute: "numeric",
			};
			if (this.$store.state.data.slots) {
				//return this.$store.state.data.slots;
				return new Date(
					this.$store.state.data.slots.slice(-1)[0].end_time
				).toLocaleString("bn-BD", options);
			} else {
				return null;
			}
		},
	},

	mounted() {
		if (this.verificationStatus === "not-verified") {
			console.log("verification", this.verificationStatus);
			this.$store.dispatch("auth/verifyTwilio");
		}
		this.$store.dispatch("data/getSlots");

		window.scrollTo(0, 0);
	},
};
</script>

<style>
</style>
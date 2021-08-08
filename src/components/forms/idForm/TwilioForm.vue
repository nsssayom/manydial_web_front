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

				<!-- Price display starts -->
				<div class="row pt-3" v-if="callEndTime">
					<div class="col-12">
						<div class="alert alert-info" role="alert">
							<div class="d-flex justify-content-between">
								<span> কলের সংখ্যা: </span>
								<span>
									<b>
										{{
											recipientCount.toLocaleString(
												"bn-BD"
											)
										}}
										টি
									</b>
								</span>
							</div>

							<div class="d-flex justify-content-between">
								<span> কল রেট প্ল্যান: </span>
								<span>
									<b> {{ callTier }}</b>
								</span>
							</div>

							<div class="d-flex justify-content-between">
								<span> অডিও ডিউরেশন (১ মিনিট পালস): </span>
								<span>
									<b>
										{{
											audioDuration.toLocaleString(
												"bn-BD"
											)
										}}
										মিনিট
									</b>
								</span>
							</div>

							<div class="d-flex justify-content-between">
								<span> মোট সময়: </span>
								<span>
									<b>
										{{
											totalCallMinutes.toLocaleString(
												"bn-BD"
											)
										}}
										মিনিট
									</b>
								</span>
							</div>

							<div class="d-flex justify-content-between">
								<span> কল রেট (প্রতি মিনিট) : </span>
								<span>
									<b>
										{{ callRate.toLocaleString("bn-BD") }} ৳
									</b>
								</span>
							</div>
							<hr />

							<div class="d-flex justify-content-between">
								<span> মোট মূল্য : </span>
								<span>
									<b>
										{{ totalCost.toLocaleString("bn-BD") }}
										৳
									</b>
								</span>
							</div>
						</div>
					</div>
				</div>
				<!-- Price display ends -->

				<!-- Low balance warning starts-->
				<div class="row pt-3" v-show="lowBalance">
					<div class="col-12">
						<div class="alert alert-danger" role="alert">
							আপনার বর্তমান ব্যালান্স কলের মোট মূল্য-কে অতিক্রম
							করে। পূর্ববর্তী পাতায় গিয়ে প্রাপকের সংখ্যা কমিয়ে নিন
							অথবা, অতিরিক্ত ব্যালান্সের জন্য আমাদের সাথে
							<a href="#contact-us">যোগাযোগ করুন </a>।
						</div>
					</div>
				</div>
				<!-- Low balance warning ends -->

				<!-- Order placed starts-->
				<div class="row pt-3" v-show="orderId">
					<div class="col-12">
						<div class="alert alert-success" role="alert">
							আপনার অর্ডার আইডি
							<a href="#">{{ orderId }} </a>।
						</div>
					</div>
				</div>
				<!-- Order placed ends -->

				<div class="d-flex justify-content-between">
					<button
						type="button"
						class="btn btn-primary"
						@click="onPrevBtn"
					>
						পূর্ববর্তী
					</button>

					<button
						type="button"
						class="btn btn-primary"
						:disabled="!formClear"
						@click="onNextBtn"
					>
						কল করুন
					</button>
				</div>
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

		slotAllocated: function () {
			if (this.$store.state.data.slots) {
				return true;
			}
			return false;
		},

		formClear: function () {
			if (
				this.verificationStatus === "verified" &&
				this.slotAllocated &&
				!this.lowBalance
			) {
				return true;
			}
			return false;
		},

		recipientCount: function () {
			return this.$store.state.data.recipients.length;
		},

		audioDuration: function () {
			return Math.ceil(this.$store.state.data.audio.audioDuration / 60);
		},

		totalCallMinutes: function () {
			return this.recipientCount * this.audioDuration;
		},

		callRate: function () {
			const callRateScheme = this.$store.state.data.callRateScheme;
			var newArray = callRateScheme.filter((scheme) => {
				return (
					scheme.start <= this.recipientCount &&
					scheme.end >= this.recipientCount
				);
			});
			return newArray[0].rate;
		},

		callTier: function () {
			const callRateScheme = this.$store.state.data.callRateScheme;
			var newArray = callRateScheme.filter((scheme) => {
				return (
					scheme.start <= this.recipientCount &&
					scheme.end >= this.recipientCount
				);
			});
			return newArray[0].name;
		},

		totalCost: function () {
			return this.totalCallMinutes * this.callRate;
		},

		lowBalance: function () {
			if (this.totalCost > this.$store.state.auth.user.dbUser.balance) {
				return true;
			}
			return false;
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
		orderId() {
			if (this.$store.state.data.order) {
				return this.$store.state.data.order.id;
			}
			return null;
		},
	},

	methods: {
		onPrevBtn() {
			this.$store.dispatch("data/setCurrentForm", "record");
		},

		onNextBtn() {
			// this.$store.dispatch("data/setCurrentForm", "invoice");
			this.$store.dispatch("data/placeOrder");
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
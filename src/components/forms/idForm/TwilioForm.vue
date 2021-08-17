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
							Your number has been verified.
						</div>
					</div>
				</div>
				<!-- Verified message ends -->

				<!-- Call sent message starts -->
				<div class="row pt-3" v-show="verificationStatus === 'sent'">
					<div class="col-12">
						<div class="alert alert-info" role="alert">
							You will get a call shortly. Please recieve the call
							and enter
							<b> {{ verificationCode }} </b> when asked.
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
							Your number could not be verified. Please try again.
						</div>
					</div>
				</div>
				<!-- Verification failed message ends -->

				<!-- Slot time display starts -->
				<div class="row pt-3" v-if="callEndTime">
					<div class="col-12">
						<div class="alert alert-info" role="alert">
							Your calls will be completed within
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
								<span> Number of Calls: </span>
								<span>
									<b>
										{{
											recipientCount.toLocaleString(
												"en-US"
											)
										}}
									</b>
								</span>
							</div>

							<div class="d-flex justify-content-between">
								<span> Call Rate Package: </span>
								<span>
									<b> {{ callTier }}</b>
								</span>
							</div>

							<div class="d-flex justify-content-between">
								<span> Audio Duration (1 min pulse): </span>
								<span>
									<b>
										{{
											audioDuration.toLocaleString(
												"en-US"
											)
										}}
										mins
									</b>
								</span>
							</div>

							<div class="d-flex justify-content-between">
								<span> Total Time: </span>
								<span>
									<b>
										{{
											totalCallMinutes.toLocaleString(
												"en-US"
											)
										}}
										mins
									</b>
								</span>
							</div>

							<div class="d-flex justify-content-between">
								<span> Call Rate (per min) : </span>
								<span>
									$
									<b>
										{{ callRate.toLocaleString("en-US") }}
									</b>
								</span>
							</div>
							<hr />

							<div class="d-flex justify-content-between">
								<span> Total Cost : </span>
								<span>
									$
									<b>
										{{ totalCost.toLocaleString("en-US") }}
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
							Not enough credit to complete your call.
							<a href="#contact-us">Contact us. </a>।
						</div>
					</div>
				</div>
				<!-- Low balance warning ends -->

				<!-- Order placed starts-->
				<div class="row pt-3" v-show="orderId">
					<div class="col-12">
						<div class="alert alert-success" role="alert">
							Your order has been placed and is being processed.
							Your can check the status of your order
							<a href="#">{{ orderId }} </a>।
						</div>
					</div>
				</div>
				<!-- Order placed ends -->

				<div class="d-flex justify-content-between" v-if="!orderId">
					<button
						type="button"
						class="btn btn-primary"
						@click="onPrevBtn"
					>
						Previous
					</button>

					<button
						v-if="!orderId"
						type="button"
						class="btn btn-primary"
						:disabled="!formClear"
						@click="onNextBtn"
					>
						Place Order
					</button>
				</div>

				<div class="d-flex flex-row-reverse" v-if="orderId">
					<button
						type="button"
						class="btn btn-primary"
						:disabled="!formClear"
						@click="onNewCall"
					>
						Place Another Order
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
				).toLocaleString("en-US", options);
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

		onNewCall() {
			location.reload();
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
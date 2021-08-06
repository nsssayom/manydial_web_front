<template>
	<!-- Mobile number input strats -->
	<phone-input-row v-show="otpStatus === 'prompt'" />
	<!-- Mobile number input ends -->
	<OTPForm
		v-show="otpStatus === 'sent_success' || otpStatus === 'verify_failed'"
	/>

	<!-- OTP verify success  starts-->
	<div class="row pt-3" v-show="otpStatus === 'verify_success'">
		<div class="col-12">
			<div class="col-2 py-1 text-center"></div>

			<svg xmlns="http://www.w3.org/2000/svg" style="display: none">
				<symbol
					id="check-circle-fill"
					fill="currentColor"
					viewBox="0 0 16 16"
				>
					<path
						d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
					/>
				</symbol>
			</svg>

			<div
				class="
					alert alert-success
					d-flex
					align-items-center
					shadow
					rounded
				"
				role="alert"
			>
				<svg
					class="bi flex-shrink-0 me-2"
					width="24"
					height="24"
					role="img"
					aria-label="Success:"
				>
					<use xlink:href="#check-circle-fill" />
				</svg>
				<div>
					<b>{{
						phoneNumber ? phoneNumber /*.substring(3)*/ : null
					}}</b>
					<!-- নম্বরটি ভেরিভাই করা হয়েছে -->
				</div>
			</div>
		</div>
	</div>
	<!-- OTP verify success  ends -->

	<!-- OTP Sending failed errror starts-->
	<div class="row pt-3" v-show="otpStatus === 'sent_failed'">
		<div class="col-12">
			<div class="alert alert-danger" role="alert">
				আপনার নম্বরটি ভেরিভাই করা যায় নি। অনুগ্রহপূর্বক
				<a href="javascript:window.location.reload(true)"
					>আবার চেষ্টা করুন</a
				>
			</div>
		</div>
	</div>
	<!-- OTP Sending failed errror ends -->

	<!-- Voice input starts -->
	<div class="row pt-3">
		<div class="col-8">
			<div class="card shadow bg-body rounded">
				<div class="card-body" ref="visualizer-card">
					<div
						class="row"
						@click="toogleRecord"
						:disabled="recordState !== 'record_wait'"
					>
						<div class="col-2 py-1 text-center">
							<font-awesome-icon
								:icon="['fas', 'microphone']"
								:style="{ color: recordIconColor }"
							/>
						</div>

						<div class="col-6">
							<AudioVisualizer :numLine="10" :widthCan="100" />
						</div>

						<div class="col-4 py-1 ms-auto">
							<p class="text-end text-primary unselectable">
								{{ recordingTime }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="col-4">
			<!-- Record button starts -->
			<div class="btn-group">
				<button
					type="button"
					class="
						btn btn-outline-primary
						shadow
						py-3 py-xs-0
						my-xs-0
						dropdown-toggle
					"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					আপলোড
				</button>
				<ul class="dropdown-menu">
					<li>
						<a class="dropdown-item" href="#" @click="audioUpload"
							><font-awesome-icon
								:icon="['fas', 'upload']"
								:style="{ color: '0288D1' }"
							/><span> ফাইল আপলোড </span></a
						>
					</li>
				</ul>
			</div>
		</div>
		<!-- Record button ends -->
	</div>
	<!-- Voice input ends -->

	<!-- Mic permission warning starts -->
	<div class="row pt-3" v-show="micPermissionState === 'denied'">
		<div class="col-12">
			<div class="alert alert-danger" role="alert">
				Microphone permission is not available. Please
				<a
					href="https://support.google.com/chrome/answer/3296214?hl=en"
					target="_blank"
					>reset</a
				>
				your browser settings.
			</div>
		</div>
	</div>
	<!-- Mic permission warning ends -->

	<!-- Audio player interface starts-->
	<div class="row pt-3" v-show="audioSource !== null">
		<div class="col-8">
			<audio
				controls
				:src="audioSource"
				class="shadow p-3 bg-body rounded"
				controlsList="nodownload"
			></audio>
		</div>

		<div class="col-4">
			<!-- Record button starts -->
			<div class="btn-group">
				<button
					type="button"
					class="
						btn btn-outline-success
						shadow
						py-3 py-xs-0
						my-xs-0
						dropdown-toggle
					"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					ডাউনলোড
				</button>
				<ul class="dropdown-menu">
					<li>
						<a
							class="dropdown-item"
							:href="audioSource"
							download="voice.webm"
						>
							<font-awesome-icon
								:icon="['fas', 'download']"
								:style="{ color: '388E3C' }"
							/>
							<span> ডাউনলোড করুন </span>
						</a>
					</li>
					<li>
						<hr class="dropdown-divider" />
					</li>
					<li>
						<a class="dropdown-item" href="#" @click="hidePlayer"
							><font-awesome-icon
								:icon="['fas', 'times-circle']"
								:style="{ color: 'D32F2F' }"
							/><span> বাতিল করুন </span></a
						>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<!-- Audio player ends -->

	<!-- Time input number row starts -->
	<date-time-input-row />
	<!-- Time input number row ends -->

	<!-- Recipient number row starts-->
	<recipient-number-row />
	<!-- Recipient number row finished -->

	<div class="row pt-1 ps-3 me-auto col-lg-4">
		<button
			type="button"
			class="btn btn-primary"
			:disabled="!formClear"
			@click="submitRecordForm"
		>
			পরবর্তী
		</button>
	</div>
</template>

<script>
import AudioVisualizer from "./AudioVisualizer.vue";
import OTPForm from "./OTPForm.vue";
import PhoneInputRow from "./PhoneInputRow.vue";
import RecipientNumberRow from "./RecipientNumberRow.vue";
import DateTimeInputRow from "./DateTimeInputRow.vue";

export default {
	components: {
		AudioVisualizer,
		PhoneInputRow,
		OTPForm,
		RecipientNumberRow,
		DateTimeInputRow,
	},
	name: "FormRecord",
	data() {
		return {
			micPermissionState: "",
		};
	},
	computed: {
		recordIconColor: function () {
			if (this.recordState === "record_wait") {
				return "FFA000";
			} else if (this.recordState === "record_start") {
				return "FF0000";
			}
			return "#407BFF";
		},

		formClear: function () {
			console.log("REC", this.recipientValid);
			if (
				this.recordState === "record_success" &&
				this.otpStatus === "verify_success" &&
				this.dateSelected &&
				this.recipientValid
			) {
				return true;
			}
			return false;
		},

		otpStatus: function () {
			return this.$store.state.auth.otpState.otpStatus;
		},

		recipientValid: function () {
			if (this.$store.state.data.recipients) {
				return true;
			}
			return false;
		},

		dateSelected: function () {
			return this.$store.state.data.preferredDate;
		},

		recordState: function () {
			return this.$store.state.data.audio.recordState;
		},

		audioSource: function () {
			return this.$store.state.data.audio.audioUrl;
		},

		phoneNumber: function () {
			if (this.$store.state.auth.user.dbUser) {
				return this.$store.state.auth.user.dbUser.phone_number;
			}
			return null;
		},

		recordingTime: function () {
			//console.log(this.$store.getters["data/recordingTime"]);
			return this.$store.getters["data/recordingTime"];
		},
	},
	methods: {
		toogleRecord() {
			if (
				this.recordState === "prompt" ||
				this.recordState === "record_success" ||
				this.recordState === "record_failed"
			) {
				this.$store.dispatch("data/setRecordState", "record_wait");
			} else {
				this.$store.dispatch("data/setRecordState", "record_stop");
			}
		},
		audioUpload() {
			var input = document.createElement("input");
			input.type = "file";
			input.accept = "audio/mp3, audio/wav, audio/webm";

			input.onchange = (e) => {
				var file = URL.createObjectURL(e.target.files[0]);

				this.$store.dispatch("data/setRecordState", "record_success");
				file ? this.$store.dispatch("data/setAudioUrl", file) : null;
			};
			input.click();
		},
		getMicPermission() {
			navigator.permissions
				.query({ name: "microphone" })
				.then((permissionStatus) => {
					//console.log(permissionStatus.state);
					this.micPermissionState = permissionStatus.state;
					permissionStatus.onchange = function () {
						console.log(
							"mic permission status has changed to ",
							permissionStatus.state
						);
						this.micPermissionState = permissionStatus.state;
					}.bind(this);
				});
		},
		hidePlayer() {
			this.$store.dispatch("data/setRecordState", "prompt");
		},
		submitRecordForm() {
			this.$store.dispatch("data/setCurrentForm", "verify");
		},
	},
	mounted() {
		this.getMicPermission();
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
.left-icon {
	float: left;
}

.btn-group {
	width: 100%;
}

#recipient-numbers {
	resize: none;
}
.card-body {
	padding-top: 12px !important;
}
.card {
	height: 58px;
}

audio {
	width: 100%;
}

audio::-webkit-media-controls-play-button,
audio::-webkit-media-controls-panel {
	background-color: #ffffff;
	color: #407bff;
}
</style>

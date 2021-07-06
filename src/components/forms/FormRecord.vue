<template>
	<!-- Mobile number input strats -->
	<phone-input-row v-show="!OTPSent" />
	<!-- Mobile number input ends -->
	<OTPForm v-show="OTPSent" />

	<!-- Voice input starts -->
	<div class="row pt-3">
		<div class="col-8">
			<div class="card shadow bg-body rounded">
				<div class="card-body" ref="visualizer-card">
					<div class="row" @click="toogleRecord">
						<div class="col-2 py-1 text-center">
							<font-awesome-icon
								:icon="['fas', 'microphone']"
								:style="{ color: recordIconColor }"
							/>
						</div>

						<!-- <div class="col-1 py-1 me-auto">
							<font-awesome-icon
								@click="tooglePlay"
								:icon="['fas', 'play']"
								:style="{ color: '#388E3C' }"
							/>
						</div> -->

						<div class="col-6">
							<AudioVisualizer :numLine="10" :widthCan="100" />
						</div>

						<div class="col-4 py-1 ms-auto">
							<p class="text-end text-primary unselectable">
								0:00
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
						<a class="dropdown-item" href="#"
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

	<!-- Recipient number row starts-->
	<recipient-number-row />
	<!-- Recipient number row finished -->

	<div class="row pt-1 ps-3 me-auto col-lg-4">
		<button type="button" class="btn btn-primary" :disabled="!formClear">
			পরবর্তী
		</button>
	</div>
</template>

<script>
import AudioVisualizer from "./AudioVisualizer.vue";
import OTPForm from "./OTPForm.vue";
import PhoneInputRow from "./PhoneInputRow.vue";
import RecipientNumberRow from "./RecipientNumberRow.vue";

export default {
	components: {
		AudioVisualizer,
		PhoneInputRow,
		OTPForm,
		RecipientNumberRow,
	},
	name: "FormRecord",
	data() {
		return {
			isRecordingPrep: false,
			isRecording: false,
			audioSource: null,
			micPermissionState: "",
			OTPSent: false,
			OTPSuccess: null,
			OTPFailed: null,
		};
	},
	computed: {
		recordIconColor: function () {
			if (this.isRecording) {
				return "FF0000";
			} else if (this.isRecordingPrep && !this.isRecording) {
				return "FFA000";
			}
			return "#407BFF";
		},

		formClear: function () {
			return this.OTPSuccess && this.audioSource ? true : false;
		},
	},
	methods: {
		toogleRecord() {
			this.isRecordingPrep = !this.isRecordingPrep;

			if (this.micPermissionState !== "denied") {
				this.emitter.emit("record-toogle", this.isRecordingPrep);
			}

			if (this.isRecordingPrep) {
				this.hidePlayer();
				this.getMicPermission();
			}
		},
		hidePlayer() {
			this.audioSource = null;
		},
		getMicPermission() {
			navigator.permissions
				.query({ name: "microphone" })
				.then((permissionStatus) => {
					console.log(permissionStatus.state);
					this.micPermissionState = permissionStatus.state;
					permissionStatus.onchange = function () {
						console.log(
							"geolocation permission status has changed to ",
							permissionStatus.state
						);
						this.micPermissionState = permissionStatus.state;
					}.bind(this);
				});
		},
	},
	mounted() {
		this.getMicPermission();
		this.emitter.on("audio-record-start", (audioDeviceState) => {
			console.log("Audio Record Started. ", audioDeviceState);
			this.isRecording = true;
		});

		this.emitter.on("audio-record-success", (audioURL) => {
			console.log("Audio Record Complete. URL:", `value: ${audioURL}`);
			this.audioSource = audioURL;
			this.isRecordingPrep = false;
			this.isRecording = false;
		});

		this.emitter.on("phone-number-input", (phoneNumber) => {
			console.log("Sending OTP to", phoneNumber);
			this.OTPSent = true;
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

<template>
	<!-- Mobile number input strats -->
	<div class="row">
		<div class="col-8 me-auto">
			<input
				type="tel"
				class="form-control shadow p-3 bg-body rounded"
				id="mobile"
				placeholder="আপনার ফোন নম্বর"
				pattern="[0]{1}[1]{1}[0-9]{9}"
				required
			/>
		</div>
		<div class="col-4">
			<button
				class="
					form-control
					btn btn-outline-primary
					shadow
					py-3 py-xs-0
					my-xs-0
				"
				type="button"
				id="btn-get-otp"
			>
				ওটিপি পাঠান
			</button>
		</div>
	</div>
	<!-- Mobile number input ends -->

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
								00:00
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

	<!-- Audio player interface -->

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
						btn btn-outline-primary
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

	<div class="row pt-3">
		<div class="col-8">
			<textarea
				class="form-control"
				id="recipient-numbers"
				rows="2"
				placeholder="প্রাপকদের নম্বর লিখুন বা, আপলোড করুন"
			></textarea>
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
					ইনপুট
				</button>
				<ul class="dropdown-menu">
					<li>
						<a class="dropdown-item" href="#"
							><font-awesome-icon
								:icon="['fas', 'keyboard']"
								:style="{ color: '616161' }"
							/><span> নম্বর লিখুন</span></a
						>
					</li>
					<li>
						<a class="dropdown-item" href="#"
							><font-awesome-icon
								:icon="['fas', 'download']"
								:style="{ color: '388E3C' }"
							/><span> ডাউনলোড করুন </span></a
						>
					</li>
					<li>
						<hr class="dropdown-divider" />
					</li>
					<li>
						<a class="dropdown-item" href="#"
							><font-awesome-icon
								:icon="['fas', 'upload']"
								:style="{ color: '0288D1' }"
							/><span> নম্বর আপলোড করুন</span></a
						>
					</li>
				</ul>
			</div>
		</div>
	</div>

	<div class="row pt-1">
		<div class="col-8">
			<p id="disclaimer-text">
				* অংশ অংশভাক আঁইশ ইঁচড়েপাকা ঈক্ষণ ঈদৃক অংশভাগী জওয়ান অংশাঙ্কিত
				ইউক্যালিপটাস অংশাবতার হালহদিশ পিতৃতর্পণ টকানো ঈক্ষিত জগজ্জন
				তকতনামা আঁকুবাঁকু
			</p>
		</div>
	</div>

	<div class="row pt-1 ps-3 me-auto col-lg-4">
		<button type="button" class="btn btn-primary">পরবর্তী</button>
	</div>
</template>

<script>
import AudioVisualizer from "./AudioVisualizer.vue";

export default {
	components: {
		AudioVisualizer,
	},
	name: "FormRecord",
	data() {
		return {
			isRecordingPrep: false,
			isRecording: false,
			audioSource: null,
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
	},
	methods: {
		toogleRecord() {
			this.isRecordingPrep = !this.isRecordingPrep;
			this.emitter.emit("record-toogle", this.isRecordingPrep);
			if (this.isRecordingPrep) {
				this.hidePlayer();
			}
		},
		hidePlayer() {
			this.audioSource = null;
		},
	},
	mounted() {
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
	},
};
</script>

<style scoped>
@media (max-width: 530px) {
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

#disclaimer-text {
	font-size: 0.5em; /* 14px/16=0.875em */
	line-height: normal;
	text-align: justify;
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
	/* 	-webkit-transition: all 0.5s linear;
	-moz-transition: all 0.5s linear;
	-o-transition: all 0.5s linear;
	transition: all 0.5s linear;
	-moz-box-shadow: 2px 2px 4px 0px #006773;
	-webkit-box-shadow: 2px 2px 4px 0px #006773;
	box-shadow: 2px 2px 4px 0px #ffffff;
	-moz-border-radius: 7px 7px 7px 7px;
	-webkit-border-radius: 7px 7px 7px 7px;
	border-radius: 7px 7px 7px 7px; */
}

audio::-webkit-media-controls-play-button,
audio::-webkit-media-controls-panel {
	background-color: #ffffff;
	color: #407bff;
}
</style>

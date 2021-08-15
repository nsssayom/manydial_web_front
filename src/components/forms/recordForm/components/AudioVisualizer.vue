<template>
	<div v-if="ready">
		<av-media
			type="frequ"
			:media="getMedia"
			line-color="#407BFF"
			:canv-width="canWidth"
			:canv-height="35"
			:frequ-line-cap="true"
			:frequ-lnum="lineNum"
			:line-width="5"
			:connect-destination="false"
		/>
	</div>
</template>

<script>
import { MediaRecorder, register } from "extendable-media-recorder";
import { connect } from "extendable-media-recorder-wav-encoder";

export default {
	name: "AudioVisualizer",
	data() {
		return {
			ready: false,
			mtype: null,
			media: null,
			mediaRecorder: null,
			audioUrl: null,
			//interval for clock
			interval: null,
		};
	},
	props: {
		numLine: {
			type: Number,
			required: true,
		},
		widthCan: {
			type: Number,
			required: true,
		},
	},
	computed: {
		getMedia: function () {
			return this.media;
		},
		lineNum: function () {
			return this.numLine;
		},
		canWidth: function () {
			return this.widthCan;
		},
		recordState: function () {
			return this.$store.state.data.audio.recordState;
		},
	},
	methods: {
		startRecord() {
			const constraints = {
				audio: true,
				video: false,
			};
			var device = navigator.mediaDevices.getUserMedia(constraints);

			device.then((media) => {
				this.media = media;
				this.mediaRecorder = new MediaRecorder(media, {
					mimeType: "audio/wav",
				});

				// Start audio record
				this.mediaRecorder.start();
				this.$store.dispatch("data/setRecordState", "record_start");

				if (this.recordState === "record_start") {
					this.interval = setInterval(this.incrementTime, 1000);
				}

				let audioChunks = [];
				this.mediaRecorder.ondataavailable = function (e) {
					//console.log("Pushing data");
					audioChunks.push(e.data);
				};

				this.mediaRecorder.onstop = function () {
					clearInterval(this.interval);

					const audioBlob = new Blob(audioChunks, {
						type: "audio/wav; codecs=0",
					});
					audioChunks = [];
					this.audioUrl = URL.createObjectURL(audioBlob);
					console.log("New Audio URL: ", this.audioUrl);
					this.$store.dispatch(
						"data/setRecordState",
						"record_success"
					);
					this.$store.dispatch("data/setAudioUrl", this.audioUrl);
				}.bind(this);

				// Time-out for 3 mins
				setTimeout(() => {
					if (this.recordState === "record_start") {
						this.stopRecord();
					}
				}, 180000);
			});
		},
		stopRecord() {
			this.mediaRecorder.stop();
			this.media.getTracks().forEach(function (track) {
				track.stop();
			});
		},
		incrementTime() {
			this.$store.dispatch("data/incrementAudioTime");
		},
	},
	watch: {
		recordState(newRecordState) {
			if (newRecordState === "record_wait") {
				this.startRecord();
			} else if (newRecordState === "record_stop") {
				this.stopRecord();
			}
		},
	},
	async mounted() {
		this.audioChunks = [];
		await register(await connect());
		//console.log(this.recordState);
		this.ready = true;
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
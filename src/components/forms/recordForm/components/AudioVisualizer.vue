<template>
	<div>
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
export default {
	name: "AudioVisualizer",
	data() {
		return {
			mtype: null,
			media: null,
			mediaRecorder: null,
			audioUrl: null,
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
				this.mediaRecorder = new MediaRecorder(media);

				let audioChunks = [];
				this.mediaRecorder.ondataavailable = function (e) {
					console.log("Pushing data");
					audioChunks.push(e.data);
				};

				this.mediaRecorder.onstop = function (e) {
					console.log(e);
					const audioBlob = new Blob(audioChunks, {
						type: "audio/webm; codecs=opus",
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

				// Start audio record
				this.mediaRecorder.start();
				this.$store.dispatch("data/setRecordState", "record_start");

				// Time-out for 3 mins
				setTimeout(() => {
					this.stopRecord();
				}, 180000);
			});
		},
		stopRecord() {
			this.mediaRecorder.stop();
			this.media.getTracks().forEach(function (track) {
				track.stop();
			});
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
	mounted() {
		this.audioChunks = [];
		console.log(this.recordState);
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
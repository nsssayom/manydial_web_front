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
		<!-- <av-media
      :media="media"
      type="frequ"
      line-color="407BFF"
      :canv-width="30"
      :canv-height="30"
      :frequ-line-cap="true"
      :frequ-lnum="3"
      :line-width="6"
      
    /> -->
		<!-- <h1>{{ isMicPermitted }}</h1> -->
	</div>
</template>

<script>
export default {
	name: "AudioVisualizer",
	data() {
		return {
			mtype: null,
			media: null,
			isMicPermitted: null,
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
	},
	methods: {
		checkMicPermission() {
			navigator.permissions
				.query({ name: "microphone" })
				.then((permissionStatus) => {
					console.log(permissionStatus.state);
					this.isMicPermitted = permissionStatus.state;
				});
		},

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
					this.emitter.emit("audio-record-success", this.audioUrl);
				}.bind(this);

				this.mediaRecorder.start();
				this.emitter.emit(
					"audio-record-start",
					this.mediaRecorder.state
				);

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
	mounted() {
		this.audioChunks = [];
		this.checkMicPermission();
		this.emitter.on("record-toogle", (value) => {
			console.log("record-toogle received!", `value: ${value}`);
			value ? this.startRecord() : this.stopRecord();
		});
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
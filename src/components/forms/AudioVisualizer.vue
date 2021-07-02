<template>
	<div>
		<av-media
			type="frequ"
			:media="media"
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
	},
	mounted() {
		this.checkMicPermission();
		const constraints = {
			audio: true,
			video: false,
		};
		navigator.mediaDevices.getUserMedia(constraints).then((media) => {
			this.media = media;
		});
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
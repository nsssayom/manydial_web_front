<template>
	<!-- v-if="verificationStatus === 'sent'" -->
	<div class="row align-items-center pt-3">
		<video
			oncontextmenu="return false;"
			id="video-player"
			autoplay="autoplay"
			loop
			preload="metadata"
		>
			<source
				src="@/assets/video/ManyDial_video_verify.mp4"
				type="video/mp4"
			/>
		</video>
	</div>
</template>

<script>
export default {
	name: "SenderIDVerificationVideo",
	computed: {
		verificationStatus: function () {
			return this.$store.state.auth.otpState.twilio_status;
		},
	},
};
</script>

<style scoped>
#intro-title {
	color: #0080ff;
	font-size: 36px;
	padding-bottom: 30px;
}

#intro-text {
	font-size: 16px;
}

.carousel-caption {
	color: #000;
	top: 50%;
}

.carousel-item.active {
	display: block;
}
.carousel {
	margin: 0 auto;
}
</style>
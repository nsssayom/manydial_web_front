<template>
	<div
		class="row align-items-center pt-3"
		v-if="verificationStatus === 'sent'"
	>
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

	<img
		src="@/assets/img/ID-Verification-Successful.gif"
		class="mx-auto d-block img-col"
		v-if="verificationStatus === 'verified'"
	/>

	<img
		src="@/assets/img/ID-Verification-Failed.gif"
		class="mx-auto d-block img-col"
		v-if="verificationStatus === 'not-verified' && twilioTried"
	/>
</template>

<script>
export default {
	name: "SenderIDVerificationVideo",
	computed: {
		verificationStatus: function () {
			return this.$store.state.auth.otpState.twilio_status;
		},

        twilioTried: function () {
			return this.$store.state.auth.otpState.twilio_tried;
		},
	},
};
</script>

<style scoped>
.img-col {
	width: 350px;
}

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
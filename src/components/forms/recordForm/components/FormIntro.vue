<template>
	<div class="row align-items-center">
		<div
			id="carouselExampleCaptions"
			class="carousel slide"
			data-bs-ride="carousel"
		>
			<div class="carousel-inner">
				<div class="carousel-item active">
					<div class="px-4">
						<h1
							class="display-5 fw-bold mx-auto col-lg-12"
							id="intro-title"
						>
							The only website in the world lets you initiate a
							free voice call broadcast in under 2 minutes.
						</h1>
						<div class="col-lg-12 mx-auto">
							<p class="lead mb-4" id="intro-text">
								Before starting this voice call broadcasting
								solution, we tried hundreds of websites for a
								codeless voice call broadcasting opportunity,
								but we couldn't. Every website requires you to
								sign up, fill up a lot of information & make you
								stuck in the never-ending approval process. We
								wanted to make it easy & we actually ended up
								making this bulk voice call broadcasting the
								easiest.
							</p>
						</div>
					</div>
				</div>
				<div class="carousel-item">
					<div class="px-4">
						<h1
							class="display-5 fw-bold mx-auto col-lg-12"
							id="intro-title"
						>
							Broadcast free promotional voice calls in 3 clicks.
							Cheapest rate with hundreds of calls at a time!
						</h1>
						<div class="col-lg-12 mx-auto">
							<p class="lead mb-4" id="intro-text">
								Who would not love to call their customers with
								a promotional offer? Everybody, right? Manydial
								is here to make the process super easy. Just
								upload your customers' mobile number, record
								promotional audio & initiate the call
								broadcasting- BOOM! Manydial is the Cheapest &
								easiest Voice Call providing solution in the
								world.
							</p>
						</div>
					</div>
				</div>
				<div class="carousel-item">
					<div class="px-4">
						<h1
							class="display-5 fw-bold mx-auto col-lg-12"
							id="intro-title"
						>
							Tired of using a rented mobile number? Use Manydial
							to broadcast free voice calls from your own number!
						</h1>
						<div class="col-lg-12 mx-auto">
							<p class="lead mb-4" id="intro-text">
								You would not find a single click-and-call
								website that lets you broadcast from your own
								number. You must develop this solution with your
								own resources. Lots of expenses, right? Forget
								Tough Job! Start using Manydial from today &
								broadcast voice calls from your own-damn-number!
							</p>
						</div>
					</div>
				</div>
			</div>
			<button
				class="carousel-control-prev"
				type="button"
				data-bs-target="#carouselExampleCaptions"
				data-bs-slide="prev"
			>
				<span
					class="carousel-control-prev-icon"
					aria-hidden="true"
				></span>
				<span class="visually-hidden">Previous</span>
			</button>
			<button
				class="carousel-control-next"
				type="button"
				data-bs-target="#carouselExampleCaptions"
				data-bs-slide="next"
			>
				<span
					class="carousel-control-next-icon"
					aria-hidden="true"
				></span>
				<span class="visually-hidden">Next</span>
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "FormIntro",
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

.carousel-item.active,
.carousel-item-next,
.carousel-item-prev {
	display: block;
}
.carousel {
	margin: 0 auto;
}
</style>
<template>
	<div class="container">
		<div class="row d-flex justify-content-center text-center">
			<div class="col-md-8">
				<h3>FAQ</h3>
				<p class="mb-5">
					These three fundamental questions have come to your mind,
					and we have left the answers here.
				</p>
			</div>
		</div>

		<div class="accordion" id="accordionFlushExample">
			<div class="accordion-item rounded mdl-border mdl-shadow">
				<h2 class="accordion-header" id="flush-headingOne">
					<button
						class="accordion-button"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#flush-collapseOne"
						aria-expanded="false"
						aria-controls="flush-collapseOne"
					>
						When will I be able to broadcast commercial voice calls
						from the Manydial website?
					</button>
				</h2>
				<div
					id="flush-collapseOne"
					class="accordion-collapse collapse show"
					aria-labelledby="flush-headingOne"
					data-bs-parent="#accordionFlushExample"
				>
					<div class="accordion-body">
						Too sooon! Manydial is now in a beta testing phase. At
						this phase, we will collect essential user feedback and
						find out what kind of services you guys want to use.
						Then we will launch a brand-new commercial website with
						more exciting voice call broadcasting features. But all
						of these will be codeless.
					</div>
				</div>
			</div>
			<div class="accordion-item mdl-border mdl-shadow rounded mt-3">
				<h2 class="accordion-header" id="flush-headingTwo">
					<button
						class="accordion-button collapsed"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#flush-collapseTwo"
						aria-expanded="false"
						aria-controls="flush-collapseTwo"
					>
						Why would somebody use Manydial?
					</button>
				</h2>
				<div
					id="flush-collapseTwo"
					class="accordion-collapse collapse"
					aria-labelledby="flush-headingTwo"
					data-bs-parent="#accordionFlushExample"
				>
					<div class="accordion-body">
						Good question! We know you can find hundreds of websites
						out there to broadcast voice calls, but we also know
						none of them are seamless. You can not initiate your
						first broadcast in under 20 minutes. This is the problem
						we are here to solve. Manydial is a click-and-call voice
						call broadcasting solution that doesn't require any
						coding knowledge.
					</div>
				</div>
			</div>
			<div class="accordion-item mdl-border mdl-shadow rounded mt-3">
				<h2 class="accordion-header" id="flush-headingThree">
					<button
						class="accordion-button collapsed"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#flush-collapseThree"
						aria-expanded="false"
						aria-controls="flush-collapseThree"
					>
						Can we make calls from all the countries in the world?
					</button>
				</h2>
				<div
					id="flush-collapseThree"
					class="accordion-collapse collapse"
					aria-labelledby="flush-headingThree"
					data-bs-parent="#accordionFlushExample"
				>
					<div class="accordion-body">
						The answer is initially, YES! You can make calls from
						all the countries. But you may find some regulatory
						issues with some of them. We would suggest you try our
						service with free credit. If everything works fine, then
						why not have us commercially?
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Faq",
};
</script>

<style>
</style>
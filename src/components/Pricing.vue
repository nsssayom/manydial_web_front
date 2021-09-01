<template>
	<div class="container text-center">
		<img
			src="@/assets/img/pricing.png"
			alt="pricing"
			class="img-fluid"
			id="pricimng-img"
		/>
	</div>

	<!-- <div class="container text-center">
		<div class="row d-flex justify-content-center">
			<div class="col-md-8">
				<h3>
					Pricing strats from
					<span class="text-success"> $0.016/min </span>
				</h3>
				<p class="mb-5">
					You can compare Manydial to your local operator. In terms of
					feature offering, we will win the game by 10-1 😀
				</p>
			</div>
		</div>

		<div class="row">
			<div class="col-xl-3 col-md-6 price-list">
				<div class="pricing-wrapper wrapper-silver">
					<div class="pricing-container text-center">
						<div class="pricing-header">
							<h3>Silver</h3>
							<p>Broadcast calls to 1-100 numbers</p>
						</div>
						<div class="pricing-body">
							<ul>
								<li>
									<span>
										<font-awesome-icon
											:icon="['fas', 'check']"
											:style="{ color: '#407BFF' }"
									/></span>
									Own Audio
								</li>
								<li>
									<span>
										<font-awesome-icon
											:icon="['fas', 'check']"
											:style="{ color: '#407BFF' }"
									/></span>
									Normal Approval Time
								</li>
								<li>
									<span>
										<font-awesome-icon
											:icon="['fas', 'check']"
											:style="{ color: '#407BFF' }"
									/></span>
									Delivery Report
								</li>
							</ul>
						</div>
						<div class="pricing-footer">
							<h3>$0.023/min</h3>
							
						</div>
					</div>
				</div>
			</div>

			<div class="col-xl-3 col-md-6 price-list">
				<div class="pricing-wrapper wrapper-gold">
					<div class="pricing-container">
						<div class="pricing-header text-center">
							<h3>Gold</h3>
							<p>Broadcast calls to 100-1000 numbers</p>
						</div>
						<div class="pricing-body">
							<ul>
								<li>
									<span>
										<font-awesome-icon
											:icon="['fas', 'check']"
											:style="{ color: '#407BFF' }"
									/></span>
									Own Audio
								</li>
								<li>
									<span>
										<font-awesome-icon
											:icon="['fas', 'check']"
											:style="{ color: '#407BFF' }"
									/></span>
									Fastest Approval Time
								</li>
								<li>
									<span>
										<font-awesome-icon
											:icon="['fas', 'check']"
											:style="{ color: '#407BFF' }"
									/></span>
									Delivery Report
								</li>
							</ul>
						</div>
						<div class="pricing-footer">
							<h3>$0.019/min</h3>
						</div>
					</div>
				</div>
			</div>

			<div class="col-xl-3 col-md-6 price-list">
				<div class="pricing-wrapper wrapper-platinum">
					<div class="pricing-container">
						<div class="pricing-header text-center">
							<h3>Platinum</h3>
							<p>Broadcast calls to 1000-10000 numbers</p>
						</div>
						<div class="pricing-body">
							<ul>
								<li>
									<span>
										<font-awesome-icon
											:icon="['fas', 'check']"
											:style="{ color: '#407BFF' }"
									/></span>
									Own Audio
								</li>
								<li>
									<span>
										<font-awesome-icon
											:icon="['fas', 'check']"
											:style="{ color: '#407BFF' }"
									/></span>
									Fastest Approval Time
								</li>
								<li>
									<span>
										<font-awesome-icon
											:icon="['fas', 'check']"
											:style="{ color: '#407BFF' }"
									/></span>
									Delivery Report
								</li>
							</ul>
						</div>
						<div class="pricing-footer">
							<h3>$0.016/min</h3>
						</div>
					</div>
				</div>
			</div>

			<div class="col-xl-3 col-md-6 price-list">
				<div class="pricing-wrapper wrapper-diamond">
					<div class="pricing-container">
						<div class="pricing-header text-center">
							<h3>Diamond</h3>
							<p>Broadcast calls to 10000+ numbers</p>
						</div>
						<div class="pricing-body">
							<ul>
								<li>
									<span>
										<font-awesome-icon
											:icon="['fas', 'check']"
											:style="{ color: '#407BFF' }"
									/></span>
									Own Audio
								</li>
								<li>
									<span>
										<font-awesome-icon
											:icon="['fas', 'check']"
											:style="{ color: '#407BFF' }"
									/></span>
									Fastest Approval Time
								</li>
								<li>
									<span>
										<font-awesome-icon
											:icon="['fas', 'check']"
											:style="{ color: '#407BFF' }"
									/></span>
									Delivery Report
								</li>
								<li>
									<span>
										<font-awesome-icon
											:icon="['fas', 'check']"
											:style="{ color: '#407BFF' }"
									/></span>
									Customized IVR
								</li>
							</ul>
						</div>
						<div class="pricing-footer">
							<a
								href="#contact-us"
								class="btn btn-primary full-width"
								>Contat Us for Price</a
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div> -->
</template>

<script>
export default {
	name: "Pricing",
};
</script>

<style scoped>
.pricing-container {
	min-height: 522px;
}
.pricing-body {
	min-height: 207px;
}
.price-list {
	padding-bottom: 30px;
}

.wrapper-silver {
	/* background: linear-gradient(#4285f4 30%, #4285f4 64%) no-repeat; */
	background-color: #86868642;
	transition: ease-in 0.3s;
}

.wrapper-gold {
	/* background: linear-gradient(#4285f4 30%, #4285f4 64%) no-repeat; */
	background-color: #86868642;
	transition: ease-in 0.3s;
}

.wrapper-platinum {
	/* background: linear-gradient(#4285f4 30%, #4285f4 64%) no-repeat; */
	background-color: #86868642;
	transition: ease-in 0.3s;
}

.wrapper-diamond {
	/* background: linear-gradient(#4285f4 30%, #4285f4 64%) no-repeat; */
	background-color: #86868642;
	transition: ease-in 0.3s;
}

.wrapper-silver:hover {
	/* background: linear-gradient(#4285f4 30%, #4285f4 64%) no-repeat; */
	background-color: #0b5dd74f;
	border: 2px;
}

.wrapper-gold:hover {
	/* background: linear-gradient(#4285f4 30%, #4285f4 64%) no-repeat; */
	background-color: #0b5dd77a;
	border: 2px;
}

.wrapper-platinum:hover {
	/* background: linear-gradient(#4285f4 30%, #4285f4 64%) no-repeat; */
	background-color: #0b5dd7c2;
	border: 2px;
}

.wrapper-diamond:hover {
	/* background: linear-gradient(#4285f4 30%, #4285f4 64%) no-repeat; */
	background-color: #0b5ed7;
	border: 2px;
}

.pricing-wrapper {
	padding: 4px;
	border-radius: 5px;
}

</style>
<template>
	<nav class="navbar navbar-expand-xl fixed-top mdl-shadow">
		<div class="container">
			<a class="navbar-brand" href="#">
				<img
					src="../assets/img/logo.svg"
					alt=""
					width="150"
					height="40"
					class="d-inline-block align-text-top"
				/>
			</a>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarText"
				aria-controls="navbarText"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon">
					<Menu></Menu>
				</span>
			</button>

			<div class="collapse navbar-collapse" id="navbarText">
				<ul class="navbar-nav ms-auto mb-2 mb-lg-0">
					<li class="nav-item active">
						<a class="nav-link" href="#">Call Now</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#features">Features</a>
					</li>
					<!-- <li class="nav-item">
						<a class="nav-link" href="#capacity">Capacity</a>
					</li> -->
					<li class="nav-item">
						<a class="nav-link" href="#pricing">Pricing</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#faq">FAQ</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#contact-us">Feedback</a>
					</li>
				</ul>

				<!-- TODO: Add a dropdown with balance, number and logout  -->
				<!-- <div
					v-show="phoneNumber !== null"
					class="btn btn-outline-primary disabled"
					id="balance-button"
				>
					{{ phoneNumber }}
				</div> -->

				<div
					v-show="balance !== null && otpStatus === 'verify_success'"
					class="btn btn-outline-primary disabled"
					id="balance-button"
				>
					{{ " Balance:  " + " $" + balance }}
				</div>
			</div>
		</div>
	</nav>
</template>

<script scoped>
import { Menu } from "mdue";

export default {
	name: "Navbar",
	components: {
		Menu,
	},
	computed: {
		balance: function () {
			if (this.$store.state.auth.user.dbUser) {
				return this.$store.state.auth.user.dbUser.balance;
			} else return 0;
		},
		phoneNumber: function () {
			return this.$store.state.auth.user.phoneNumber;
		},
		otpStatus: function () {
			return this.$store.state.auth.otpState.otpStatus;
		},
	},
};
</script>

<style scoped>
.card-body {
	padding-top: 12px !important;
}
.card {
	height: 58px;
}
</style>
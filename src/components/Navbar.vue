<template>
	<nav class="navbar navbar-expand-xl fixed-top mdl-shadow" id="navbar">
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

			<div
				class="collapse navbar-collapse flex-grow-1 text-right"
				id="navbarText"
			>
				<ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
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

					<li class="nav-item">
						<div class="nav-link">
							<img
								height="40"
								width="40"
								src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg"
							/>
						</div>
					</li>

					<li class="nav-item">
						<div
							v-show="
								balance !== null &&
								otpStatus === 'verify_success'
							"
							class="btn btn-outline-primary disabled"
							id="balance-button"
						>
							{{ " Balance:  " + " $" + balance }}
						</div>
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
	mounted() {
		var navLinks = document.getElementsByClassName("nav-link");
		for (var i = 0; i < navLinks.length; i++) {
			navLinks[i].addEventListener("click", function () {
				document.getElementById("navbarText").classList.remove("show");
			});
		}
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
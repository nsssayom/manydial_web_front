<template>
	<nav class="navbar navbar-expand-xl fixed-top">
		<div class="container">
			<a class="navbar-brand" href="#">
				<img
					src="../assets/img/ManyDIAL.svg"
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
				<ul class="navbar-nav me-auto mx-auto mb-2 mb-lg-0">
					<li class="nav-item active">
						<a class="nav-link" href="#">কল করুন</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#features">কীভাবে কল করব?</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#capacity">সক্ষমতা</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#pricing">মুল্য</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#faq">প্রশ্ন</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#contact-us">যোগাযোগ করুন</a>
					</li>
				</ul>

				<div
					v-show="balance !== null"
					class="btn btn-outline-dark disabled"
					id="balance-button"
				>
					{{ " ব্যালান্স:  " + " ৳" + balance }}
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
			return this.$store.state.auth.user.balance;
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
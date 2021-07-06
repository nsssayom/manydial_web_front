<template>
	<div class="row pt-3">
		<div class="col-8">
			<textarea
				class="form-control"
				id="recipient-numbers"
				rows="2"
				placeholder="প্রাপকদের নম্বর লিখুন বা, আপলোড করুন"
			></textarea>
		</div>

		<div class="col-4">
			<!-- Record button starts -->
			<div class="btn-group">
				<button
					type="button"
					class="
						btn btn-outline-primary
						shadow
						py-3 py-xs-0
						my-xs-0
						dropdown-toggle
					"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					ইনপুট
				</button>
				<ul class="dropdown-menu">
					<li>
						<a class="dropdown-item" href="#"
							><font-awesome-icon
								:icon="['fas', 'keyboard']"
								:style="{ color: '616161' }"
							/><span> নম্বর লিখুন</span></a
						>
					</li>
					<li>
						<a class="dropdown-item" href="#"
							><font-awesome-icon
								:icon="['fas', 'download']"
								:style="{ color: '388E3C' }"
							/><span> ডাউনলোড করুন </span></a
						>
					</li>
					<li>
						<hr class="dropdown-divider" />
					</li>
					<li>
						<a class="dropdown-item" href="#"
							><font-awesome-icon
								:icon="['fas', 'upload']"
								:style="{ color: '0288D1' }"
							/><span> নম্বর আপলোড করুন</span></a
						>
					</li>
				</ul>
			</div>
		</div>
	</div>

	<div class="row pt-1">
		<div class="col-8">
			<p id="disclaimer-text">
				* অংশ অংশভাক আঁইশ ইঁচড়েপাকা ঈক্ষণ ঈদৃক অংশভাগী জওয়ান অংশাঙ্কিত
				ইউক্যালিপটাস অংশাবতার হালহদিশ পিতৃতর্পণ টকানো ঈক্ষিত জগজ্জন
				তকতনামা আঁকুবাঁকু
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "RecipientNumberRow",
};
</script>

<style scoped>
@media (max-width: 1400px) {
	.btn {
		padding-left: 0px;
		padding-right: 0px;
	}
}

.btn-group {
	width: 100%;
}

#disclaimer-text {
	font-size: 0.5em; /* 14px/16=0.875em */
	line-height: normal;
	text-align: justify;
}
</style>
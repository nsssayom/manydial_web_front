<template>
	<div class="row pt-3">
		<div class="col-8">
			<textarea
				class="form-control"
				:class="{
					'invalid-recipients': !isNumbersValid,
					'valid-recipients': isNumbersValid,
				}"
				type="number"
				id="recipient-numbers"
				rows="4"
				placeholder="প্রাপকদের নম্বর লিখুন বা, আপলোড করুন 
01701112233 
01610203040"
				v-model="recipientNumber"
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
	data() {
		return {
			recipientNumber: "",
			tokenizedNumbers: [],
		};
	},
	watch: {
		recipientNumber(newString) {
			this.tokenizedNumbers = newString.split(/\r?\n/);
			if (this.isNumbersValid) {
				this.$store.state.data.recipients = this.tokenizedNumbers;
				console.log(
					"Number of Recipients",
					this.$store.state.data.recipients.length
				);
			} else {
				this.$store.state.data.recipients = null;
			}
		},
	},
	computed: {
		isNumbersValid() {
			if (this.recipientNumber.length === 0) {
				return false;
			}
			return this.tokenizedNumbers.every((number) => {
				return number.match("^(\\+88)?01[3-7]{1}[0-9]{8}$");
			});
		},
	},
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

.invalid-recipients:focus {
	box-shadow: 0 0 0 0.25rem rgb(239 83 80 / 50%) !important;
}

.valid-recipients:focus {
	box-shadow: 0 0 0 0.25rem rgb(102 187 106 / 50%) !important;
}
</style>